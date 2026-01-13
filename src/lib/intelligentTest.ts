export interface TestQuestion {
  question: s
  correctAnswer: nu
  category: string;
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  explanation?: string;
 


  id: string;
  specialty: string;
  answers: Record<string, number>;
  startedAt: number;
 

export interface TestResult {
  userId: str
  score: number;
  correctAnswers: nu
  categoryPerformance: Recor
  passed: boolean;
}
export async functio

    ? `Distribuir



- Distribuir dificultades: 40
- Incluir explicació

{
    {
      "options": ["opción
      "difficulty": "easy
      "explanation":
  ]


    const result = awa
 


      id: `q-${Date.now()}-${index}`,

      difficulty: q.difficulty,
      explanation: q.explanation
  } catch (error) {

}

  totalAnsw
): 'easy' | 'medium' | 'hard' {
    return currentDif


    return currentDifficulty === 'easy' ? 'medium' :



}
export function 
  
  const categoryPerformance: Record<strin

    const userAnswer = an

      correctAnswers++;

     
   
 

  });

  const
  return {
    userId,
    
    correctAnswers,
    categoryPerformance,
    p


  session: TestSession,
): TestQuestion | null {
    return null;

  const correctCount = Object.e
      const question = sess
    }

    correctCount,
    session.adaptiveDifficulty

   


export async function analyzeTestPerformance
    .map(([category, perf
    )


Respuestas correctas: ${re
Rendimiento por categoría: ${


3. Áreas de mejora específicas


    const analysis = await spark.llm(prompt, 'gpt-4o', false
  }

}
export function createTestSession(
  s

    id: `test-${Date.now()}
 

    startedAt: Date.now(),
  };

  session: TestSession,
  answer: number
  return {

      [questionId]: answer
    currentQuestionIndex: session.currentQue
}































































































































