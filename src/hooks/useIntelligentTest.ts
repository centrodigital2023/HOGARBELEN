import { useState, useCallback } from 'react';
import { useKV } from '@github/spark/hooks';
import {
  TestSession,
  TestResult,
  TestConfig,
  TestQuestion,
  generateIntelligentTest,
  createTestSession,
  submitAnswer,
  evaluateTestSession,
  getNextQuestion,
  analyzeTestPerformance
} from '@/lib/intelligentTest';

interface UseIntelligentTestReturn {
  session: TestSession | null;
  currentQuestion: TestQuestion | null;
  isGenerating: boolean;
  isAnalyzing: boolean;
  error: string | null;
  progress: number;
  startTest: (userId: string, specialty: string, config: TestConfig) => Promise<void>;
  answerQuestion: (answer: number) => void;
  completeTest: () => Promise<TestResult | null>;
  resetTest: () => void;
}

export function useIntelligentTest(): UseIntelligentTestReturn {
  const [session, setSession] = useState<TestSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useKV<TestResult[]>('test-results', []);

  const progress = session 
    ? Math.round((Object.keys(session.answers).length / session.questions.length) * 100)
    : 0;

  const startTest = useCallback(async (
    userId: string, 
    specialty: string, 
    config: TestConfig
  ) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const questions = await generateIntelligentTest(config);
      const newSession = createTestSession(userId, specialty, questions);
      setSession(newSession);
      setCurrentQuestion(questions[0] || null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al generar el test';
      setError(errorMessage);
      console.error('Error starting test:', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const answerQuestion = useCallback((answer: number) => {
    if (!session || !currentQuestion) {
      return;
    }

    const updatedSession = submitAnswer(session, currentQuestion.id, answer);
    setSession(updatedSession);

    const nextQ = getNextQuestion(updatedSession);
    setCurrentQuestion(nextQ);
  }, [session, currentQuestion]);

  const completeTest = useCallback(async (): Promise<TestResult | null> => {
    if (!session) {
      return null;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = evaluateTestSession(session);
      
      const analysis = await analyzeTestPerformance(result);
      
      const resultWithAnalysis = {
        ...result,
        analysis
      };

      setTestResults((current) => [...(current || []), resultWithAnalysis]);

      setSession(session);

      return resultWithAnalysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al evaluar el test';
      setError(errorMessage);
      console.error('Error completing test:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [session, setTestResults]);

  const resetTest = useCallback(() => {
    setSession(null);
    setCurrentQuestion(null);
    setError(null);
  }, []);

  return {
    session,
    currentQuestion,
    isGenerating,
    isAnalyzing,
    error,
    progress,
    startTest,
    answerQuestion,
    completeTest,
    resetTest
  };
}
