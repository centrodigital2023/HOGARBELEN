import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Clock, Brain, TrendUp, WarningCircle } from '@phosphor-icons/react';
import { useIntelligentTest } from '@/hooks/useIntelligentTest';
import { TestConfig } from '@/lib/intelligentTest';
import { motion, AnimatePresence } from 'framer-motion';

interface IntelligentTestInterfaceProps {
  userId: string;
  specialty: string;
  config: TestConfig;
  onComplete?: (result: any) => void;
  onCancel?: () => void;
}

export default function IntelligentTestInterface({
  userId,
  specialty,
  config,
  onComplete,
  onCancel
}: IntelligentTestInterfaceProps) {
  const {
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
  } = useIntelligentTest();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleStart = async () => {
    await startTest(userId, specialty, config);
    setTestStarted(true);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    answerQuestion(selectedAnswer);
    setSelectedAnswer(null);
    setShowExplanation(true);

    setTimeout(() => {
      setShowExplanation(false);
    }, 2000);
  };

  const handleComplete = async () => {
    const testResult = await completeTest();
    if (testResult) {
      setResult(testResult);
      if (onComplete) {
        onComplete(testResult);
      }
    }
  };

  const handleReset = () => {
    resetTest();
    setTestStarted(false);
    setSelectedAnswer(null);
    setResult(null);
    setShowExplanation(false);
  };

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <WarningCircle size={24} />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button onClick={handleReset} variant="outline">
            Reintentar
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="ghost">
              Cancelar
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  if (isGenerating) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain size={24} className="animate-pulse text-primary" />
            Generando Test Inteligente
          </CardTitle>
          <CardDescription>
            Estamos creando un test adaptativo personalizado para {specialty}...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!testStarted || !session) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain size={24} className="text-primary" />
            Test Inteligente de Competencias
          </CardTitle>
          <CardDescription>
            Evaluación adaptativa para {specialty}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">Características del test:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• {config.totalQuestions} preguntas generadas por IA</li>
              <li>• Dificultad adaptativa según tu desempeño</li>
              <li>• Evaluación de conocimientos prácticos y teóricos</li>
              <li>• Análisis detallado al finalizar</li>
            </ul>
          </div>
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              El test no tiene límite de tiempo. Tómate el tiempo necesario para responder cada pregunta.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button onClick={handleStart} size="lg" className="flex-1">
            <Brain className="mr-2" size={20} />
            Iniciar Test
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="outline" size="lg">
              Cancelar
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  if (result) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {result.passed ? (
              <CheckCircle size={28} className="text-green-600" weight="fill" />
            ) : (
              <XCircle size={28} className="text-destructive" weight="fill" />
            )}
            Test Completado
          </CardTitle>
          <CardDescription>
            Resultado de tu evaluación en {specialty}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{result.score}</p>
              <p className="text-sm text-muted-foreground">Puntuación</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{result.correctAnswers}/{result.totalQuestions}</p>
              <p className="text-sm text-muted-foreground">Correctas</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{Math.round(result.timeSpent / 60)}</p>
              <p className="text-sm text-muted-foreground">Minutos</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <Badge variant={result.passed ? "default" : "destructive"} className="text-sm">
                {result.passed ? "APROBADO" : "NO APROBADO"}
              </Badge>
            </div>
          </div>

          {result.analysis && (
            <div className="bg-muted p-6 rounded-lg space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <TrendUp size={20} className="text-primary" />
                <h3 className="font-semibold">Análisis de Desempeño</h3>
              </div>
              <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line">
                {result.analysis}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Brain size={20} />
              Rendimiento por Categoría
            </h3>
            <div className="space-y-3">
              {Object.entries(result.categoryPerformance).map(([category, perf]: [string, any]) => {
                const percentage = Math.round((perf.correct / perf.total) * 100);
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground">
                        {perf.correct}/{perf.total} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Progresión de dificultad:</strong>{' '}
              {result.difficultyProgression.join(' → ')}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              El test se adaptó a tu nivel de conocimiento durante la evaluación.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button onClick={handleReset} variant="outline">
            Realizar Nuevo Test
          </Button>
          {onCancel && (
            <Button onClick={onCancel}>
              Finalizar
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  if (!currentQuestion) {
    if (isAnalyzing) {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain size={24} className="animate-pulse text-primary" />
              Analizando Resultados
            </CardTitle>
            <CardDescription>
              Generando análisis detallado de tu desempeño...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Test Completado</CardTitle>
          <CardDescription>
            Has respondido todas las preguntas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Presiona "Finalizar Test" para ver tus resultados y análisis detallado.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={handleComplete} size="lg" className="w-full">
            Finalizar Test y Ver Resultados
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const questionNumber = session.currentQuestionIndex + 1;
  const totalQuestions = session.questions.length;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <div>
            <CardTitle className="text-lg">
              Pregunta {questionNumber} de {totalQuestions}
            </CardTitle>
            <CardDescription>{specialty}</CardDescription>
          </div>
          <Badge variant="outline">
            {currentQuestion.difficulty === 'easy' && '⚡ Fácil'}
            {currentQuestion.difficulty === 'medium' && '⚖️ Medio'}
            {currentQuestion.difficulty === 'hard' && '🔥 Difícil'}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-6 rounded-lg">
          <p className="text-base font-medium leading-relaxed">
            {currentQuestion.question}
          </p>
          {currentQuestion.category && (
            <Badge variant="secondary" className="mt-3">
              {currentQuestion.category}
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`min-w-[28px] h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <p className="flex-1 pt-0.5">{option}</p>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {showExplanation && currentQuestion.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Explicación:</strong> {currentQuestion.explanation}
            </p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button
          onClick={handleSubmitAnswer}
          disabled={selectedAnswer === null}
          size="lg"
          className="flex-1"
        >
          {questionNumber < totalQuestions ? 'Siguiente Pregunta' : 'Última Pregunta'}
        </Button>
        {onCancel && (
          <Button onClick={onCancel} variant="ghost" size="lg">
            Salir
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
