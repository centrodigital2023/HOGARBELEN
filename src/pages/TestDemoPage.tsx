import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IntelligentTestInterface from '@/components/IntelligentTestInterface';
import TestManagementDashboard from '@/components/TestManagementDashboard';
import { Brain, GraduationCap, ChartBar } from '@phosphor-icons/react';
import { TestConfig } from '@/lib/intelligentTest';

interface TestDemoPageProps {
  setPage: (page: string) => void;
}

export default function TestDemoPage({ setPage }: TestDemoPageProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'management'>('demo');
  const [showTest, setShowTest] = useState(false);
  const [testConfig, setTestConfig] = useState<TestConfig>({
    specialty: 'Enfermería Geriátrica',
    totalQuestions: 10,
    difficulty: 'adaptive',
    categories: ['Cuidados Básicos', 'Medicación', 'Emergencias', 'Nutrición']
  });
  const [userId, setUserId] = useState('demo-user-' + Date.now());

  const specialties = [
    'Enfermería Geriátrica',
    'Fisioterapia',
    'Psicología Clínica',
    'Trabajo Social',
    'Terapia Ocupacional',
    'Nutrición Clínica',
    'Medicina General',
    'Cuidado de Adulto Mayor'
  ];

  const handleStartDemo = () => {
    setShowTest(true);
  };

  const handleTestComplete = (result: any) => {
    console.log('Test completed:', result);
    setTimeout(() => {
      setShowTest(false);
    }, 5000);
  };

  const handleCancelTest = () => {
    setShowTest(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain size={48} className="text-primary" weight="duotone" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Test Inteligente
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistema de evaluación adaptativa con IA para profesionales de la salud
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="demo" className="flex items-center gap-2">
              <GraduationCap size={18} />
              Realizar Test
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <ChartBar size={18} />
              Gestión
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="mt-8">
            {!showTest ? (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain size={24} className="text-primary" />
                    Configurar Test de Evaluación
                  </CardTitle>
                  <CardDescription>
                    Personaliza los parámetros del test inteligente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="userId">ID de Usuario (Demo)</Label>
                    <Input
                      id="userId"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Ingresa un ID de usuario"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad</Label>
                    <Select
                      value={testConfig.specialty}
                      onValueChange={(value) =>
                        setTestConfig({ ...testConfig, specialty: value })
                      }
                    >
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Selecciona una especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="questionCount">Número de Preguntas</Label>
                    <Select
                      value={testConfig.totalQuestions.toString()}
                      onValueChange={(value) =>
                        setTestConfig({ ...testConfig, totalQuestions: parseInt(value) })
                      }
                    >
                      <SelectTrigger id="questionCount">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 preguntas (Rápido)</SelectItem>
                        <SelectItem value="10">10 preguntas (Estándar)</SelectItem>
                        <SelectItem value="15">15 preguntas (Completo)</SelectItem>
                        <SelectItem value="20">20 preguntas (Extenso)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h3 className="font-medium text-sm">Características del Test:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ Dificultad adaptativa según respuestas</li>
                      <li>✓ Preguntas generadas por IA</li>
                      <li>✓ Análisis detallado de resultados</li>
                      <li>✓ Evaluación por categorías</li>
                      <li>✓ Explicaciones de respuestas correctas</li>
                    </ul>
                  </div>

                  <Button onClick={handleStartDemo} size="lg" className="w-full">
                    <Brain className="mr-2" size={20} />
                    Iniciar Test Inteligente
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <IntelligentTestInterface
                userId={userId}
                specialty={testConfig.specialty}
                config={testConfig}
                onComplete={handleTestComplete}
                onCancel={handleCancelTest}
              />
            )}
          </TabsContent>

          <TabsContent value="management" className="mt-8">
            <TestManagementDashboard />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Brain size={20} className="text-primary" />
                Adaptativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                El test ajusta la dificultad según el desempeño del candidato en tiempo real.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" />
                Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Preguntas generadas por IA específicas para cada especialidad profesional.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ChartBar size={20} className="text-primary" />
                Analítico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Análisis detallado con recomendaciones para mejorar el desempeño.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
