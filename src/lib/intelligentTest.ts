export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  explanation?: string;
}

export interface TestConfig {
  specialty: string;
  totalQuestions: number;
  difficulty: 'adaptive' | 'easy' | 'medium' | 'hard';
  categories?: string[];
}

export interface TestSession {
  id: string;
  userId: string;
  specialty: string;
  questions: TestQuestion[];
  answers: Record<string, number>;
  currentQuestionIndex: number;
  startedAt: number;
  completedAt?: number;
  score?: number;
  adaptiveDifficulty: 'easy' | 'medium' | 'hard';
}

export interface TestResult {
  sessionId: string;
  userId: string;
  specialty: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  categoryPerformance: Record<string, { correct: number; total: number }>;
  difficultyProgression: ('easy' | 'medium' | 'hard')[];
  passed: boolean;
  completedAt: number;
}

export async function generateIntelligentTest(config: TestConfig): Promise<TestQuestion[]> {
  const { specialty, totalQuestions, categories } = config;

  const categoriesPrompt = categories && categories.length > 0 
    ? `Distribuir las preguntas entre estas categorías: ${categories.join(', ')}`
    : 'Usar categorías relevantes para la especialidad';

  const prompt = spark.llmPrompt`Genera exactamente ${totalQuestions} preguntas de opción múltiple para evaluar competencias profesionales en ${specialty}.

Requisitos:
- Cada pregunta debe tener exactamente 4 opciones
- ${categoriesPrompt}
- Distribuir dificultades: 40% fácil, 40% medio, 20% difícil
- Las preguntas deben evaluar conocimiento práctico y teórico
- Incluir explicación breve de la respuesta correcta
- Evitar preguntas ambiguas o con múltiples respuestas válidas

IMPORTANTE: Devuelve SOLO un objeto JSON con esta estructura exacta:
{
  "questions": [
    {
      "question": "texto de la pregunta",
      "options": ["opción 1", "opción 2", "opción 3", "opción 4"],
      "correctAnswer": 0,
      "difficulty": "easy",
      "category": "categoría",
      "explanation": "explicación de por qué esta es la respuesta correcta"
    }
  ]
}

El índice correctAnswer debe ser 0, 1, 2, o 3 (índice del array de opciones).`;

  try {
    const result = await spark.llm(prompt, 'gpt-4o', true);
    const parsed = JSON.parse(result);
    
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error('Invalid response format from LLM');
    }

    return parsed.questions.map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty,
      category: q.category,
      explanation: q.explanation
    }));
  } catch (error) {
    console.error('Error generating intelligent test:', error);
    throw new Error('No se pudo generar el test inteligente. Por favor intenta de nuevo.');
  }
}

export function calculateAdaptiveDifficulty(
  correctAnswers: number,
  totalAnswered: number,
  currentDifficulty: 'easy' | 'medium' | 'hard'
): 'easy' | 'medium' | 'hard' {
  if (totalAnswered < 3) {
    return currentDifficulty;
  }

  const successRate = correctAnswers / totalAnswered;

  if (successRate >= 0.8 && currentDifficulty !== 'hard') {
    return currentDifficulty === 'easy' ? 'medium' : 'hard';
  }

  if (successRate <= 0.4 && currentDifficulty !== 'easy') {
    return currentDifficulty === 'hard' ? 'medium' : 'easy';
  }

  return currentDifficulty;
}

export function evaluateTestSession(session: TestSession): TestResult {
  const { questions, answers, startedAt, specialty, id, userId } = session;
  
  let correctAnswers = 0;
  const categoryPerformance: Record<string, { correct: number; total: number }> = {};
  const difficultyProgression: ('easy' | 'medium' | 'hard')[] = [];

  questions.forEach((question) => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) {
      correctAnswers++;
    }

    if (!categoryPerformance[question.category]) {
      categoryPerformance[question.category] = { correct: 0, total: 0 };
    }
    categoryPerformance[question.category].total++;
    if (isCorrect) {
      categoryPerformance[question.category].correct++;
    }

    difficultyProgression.push(question.difficulty);
  });

  const score = Math.round((correctAnswers / questions.length) * 100);
  const timeSpent = Math.round((Date.now() - startedAt) / 1000);
  const passed = score >= 70;

  return {
    sessionId: id,
    userId,
    specialty,
    score,
    totalQuestions: questions.length,
    correctAnswers,
    timeSpent,
    categoryPerformance,
    difficultyProgression,
    passed,
    completedAt: Date.now()
  };
}

export function getNextQuestion(
  session: TestSession,
  allQuestions: TestQuestion[]
): TestQuestion | null {
  if (session.currentQuestionIndex >= session.questions.length) {
    return null;
  }

  const answeredCount = Object.keys(session.answers).length;
  const correctCount = Object.entries(session.answers).filter(
    ([questionId, answer]) => {
      const question = session.questions.find(q => q.id === questionId);
      return question && question.correctAnswer === answer;
    }
  ).length;

  const newDifficulty = calculateAdaptiveDifficulty(
    correctCount,
    answeredCount,
    session.adaptiveDifficulty
  );

  if (newDifficulty !== session.adaptiveDifficulty) {
    session.adaptiveDifficulty = newDifficulty;
  }

  return session.questions[session.currentQuestionIndex];
}

export async function analyzeTestPerformance(result: TestResult): Promise<string> {
  const categoryBreakdown = Object.entries(result.categoryPerformance)
    .map(([category, perf]) => 
      `${category}: ${perf.correct}/${perf.total} (${Math.round((perf.correct / perf.total) * 100)}%)`
    )
    .join(', ');

  const prompt = spark.llmPrompt`Analiza el siguiente resultado de evaluación profesional en ${result.specialty}:

Puntuación: ${result.score}/100 (${result.passed ? 'APROBADO' : 'NO APROBADO'})
Respuestas correctas: ${result.correctAnswers}/${result.totalQuestions}
Tiempo empleado: ${Math.round(result.timeSpent / 60)} minutos
Rendimiento por categoría: ${categoryBreakdown}
Progresión de dificultad: ${result.difficultyProgression.join(' → ')}

Proporciona un análisis profesional de 2-3 párrafos que incluya:
1. Evaluación general del desempeño
2. Fortalezas identificadas
3. Áreas de mejora específicas
4. Recomendación sobre si la persona demostró competencia suficiente para ${result.specialty}

Mantén un tono profesional pero constructivo.`;

  try {
    const analysis = await spark.llm(prompt, 'gpt-4o', false);
    return analysis;
  } catch (error) {
    console.error('Error analyzing test performance:', error);
    return 'No se pudo generar el análisis detallado del desempeño.';
  }
}

export function createTestSession(
  userId: string,
  specialty: string,
  questions: TestQuestion[]
): TestSession {
  return {
    id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    specialty,
    questions,
    answers: {},
    currentQuestionIndex: 0,
    startedAt: Date.now(),
    adaptiveDifficulty: 'medium'
  };
}

export function submitAnswer(
  session: TestSession,
  questionId: string,
  answer: number
): TestSession {
  return {
    ...session,
    answers: {
      ...session.answers,
      [questionId]: answer
    },
    currentQuestionIndex: session.currentQuestionIndex + 1
  };
}
