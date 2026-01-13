export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface TestSession {
  id: string;
  userId: string;
  specialty: string;
  questions: TestQuestion[];
  answers: Record<string, number>;
  currentQuestionIndex: number;
  adaptiveDifficulty: 'easy' | 'medium' | 'hard';
  startedAt: number;
}

export interface TestResult {
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  categoryPerformance: Record<string, { correct: number; total: number }>;
  passed: boolean;
}

export interface TestConfig {
  specialty: string;
  totalQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'adaptive';
  categories: string[];
}

export async function generateTestQuestions(
  specialty: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  count: number = 10
): Promise<TestQuestion[]> {
  try {
    const result = await window.spark.llm(
      (window.spark.llmPrompt as any)`Genera ${count} preguntas de opción múltiple sobre ${specialty} para evaluar conocimientos profesionales.

Requisitos:
- Dificultad: ${difficulty}
- Distribuir dificultades: 40% fácil, 40% medio, 20% difícil
- Incluir explicación breve para cada respuesta correcta
- 4 opciones por pregunta
- Categorías variadas dentro de ${specialty}

Formato JSON (objeto con propiedad "questions"):
{
  "questions": [
    {
      "question": "texto de la pregunta",
      "options": ["opción 1", "opción 2", "opción 3", "opción 4"],
      "correctAnswer": 0,
      "category": "categoría específica",
      "difficulty": "easy",
      "explanation": "explicación de por qué es correcta"
    }
  ]
}`,
      'gpt-4o',
      true
    );
    
    const parsed = JSON.parse(result);
    
    return parsed.questions.map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      category: q.category,
      difficulty: q.difficulty,
      explanation: q.explanation
    }));
  } catch (error) {
    console.error('Error generating test questions:', error);
    return [];
  }
}

export function calculateAdaptiveDifficulty(
  correctAnswers: number,
  totalAnswered: number,
  currentDifficulty: 'easy' | 'medium' | 'hard'
): 'easy' | 'medium' | 'hard' {
  if (totalAnswered < 3) return currentDifficulty;
  
  const accuracy = correctAnswers / totalAnswered;
  
  if (accuracy >= 0.8 && currentDifficulty !== 'hard') {
    return currentDifficulty === 'easy' ? 'medium' : 'hard';
  }
  
  if (accuracy <= 0.4 && currentDifficulty !== 'easy') {
    return currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
  
  return currentDifficulty;
}

export function evaluateTest(
  userId: string,
  questions: TestQuestion[],
  answers: Record<string, number>
): TestResult {
  let correctAnswers = 0;
  const categoryPerformance: Record<string, { correct: number; total: number }> = {};
  
  questions.forEach(question => {
    const userAnswer = answers[question.id];
    
    if (!categoryPerformance[question.category]) {
      categoryPerformance[question.category] = { correct: 0, total: 0 };
    }
    
    categoryPerformance[question.category].total++;
    
    if (userAnswer === question.correctAnswer) {
      correctAnswers++;
      categoryPerformance[question.category].correct++;
    }
  });
  
  const score = (correctAnswers / questions.length) * 100;
  const passed = score >= 70;
  
  return {
    userId,
    score,
    totalQuestions: questions.length,
    correctAnswers,
    categoryPerformance,
    passed
  };
}

export function getNextQuestion(
  session: TestSession,
  previousCorrect?: boolean
): TestQuestion | null {
  if (session.currentQuestionIndex >= session.questions.length) {
    return null;
  }
  
  if (previousCorrect !== undefined && session.currentQuestionIndex > 0) {
    const correctCount = Object.entries(session.answers).filter(([qId, answer]) => {
      const question = session.questions.find(q => q.id === qId);
      return question && question.correctAnswer === answer;
    }).length;
    
    session.adaptiveDifficulty = calculateAdaptiveDifficulty(
      correctCount,
      session.currentQuestionIndex,
      session.adaptiveDifficulty
    );
  }
  
  return session.questions[session.currentQuestionIndex];
}

export async function analyzeTestPerformance(result: TestResult): Promise<string> {
  try {
    const categoryDetails = Object.entries(result.categoryPerformance)
      .map(([category, perf]) => 
        `${category}: ${perf.correct}/${perf.total} (${Math.round(perf.correct/perf.total*100)}%)`
      )
      .join('\n');
    
    const analysis = await window.spark.llm(
      (window.spark.llmPrompt as any)`Analiza este resultado de evaluación profesional y proporciona retroalimentación constructiva:

Puntuación: ${result.score.toFixed(1)}%
Respuestas correctas: ${result.correctAnswers}/${result.totalQuestions}
Resultado: ${result.passed ? 'Aprobado' : 'No aprobado'}

Rendimiento por categoría:
${categoryDetails}

Proporciona:
1. Fortalezas identificadas
2. Áreas que necesitan mejora
3. Áreas de mejora específicas
4. Recomendaciones de estudio`,
      'gpt-4o',
      false
    );
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing test performance:', error);
    return 'No se pudo generar el análisis del desempeño.';
  }
}

export function createTestSession(
  userId: string,
  specialty: string,
  questions: TestQuestion[]
): TestSession {
  return {
    id: `test-${Date.now()}-${userId}`,
    userId,
    specialty,
    questions,
    answers: {},
    currentQuestionIndex: 0,
    adaptiveDifficulty: 'medium',
    startedAt: Date.now(),
  };
}

export function recordAnswer(
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

export function submitAnswer(
  session: TestSession,
  questionId: string,
  answer: number
): TestSession {
  return recordAnswer(session, questionId, answer);
}

export async function generateIntelligentTest(config: TestConfig): Promise<TestQuestion[]> {
  const difficulty = config.difficulty === 'adaptive' ? 'medium' : config.difficulty;
  return generateTestQuestions(config.specialty, difficulty, config.totalQuestions);
}

export function evaluateTestSession(session: TestSession): TestResult {
  return evaluateTest(session.userId, session.questions, session.answers);
}
