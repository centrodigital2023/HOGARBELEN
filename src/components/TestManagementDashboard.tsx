import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, XCircle, Clock, MagnifyingGlass, ChartBar, Brain, TrendUp } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';

interface TestResult {
  sessionId: string;
  userId: string;
  specialty: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  categoryPerformance: Record<string, { correct: number; total: number }>;
  difficultyProgression: string[];
  passed: boolean;
  completedAt: number;
  analysis?: string;
}

export default function TestManagementDashboard() {
  const [testResults] = useKV<TestResult[]>('test-results', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [passFilter, setPassFilter] = useState<string>('all');
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);

  const specialties = Array.from(new Set((testResults || []).map(r => r.specialty)));

  const filteredResults = (testResults || []).filter(result => {
    const matchesSearch = result.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || result.specialty === specialtyFilter;
    const matchesPass = passFilter === 'all' || 
                       (passFilter === 'passed' && result.passed) ||
                       (passFilter === 'failed' && !result.passed);
    
    return matchesSearch && matchesSpecialty && matchesPass;
  });

  const stats = {
    total: (testResults || []).length,
    passed: (testResults || []).filter(r => r.passed).length,
    failed: (testResults || []).filter(r => !r.passed).length,
    avgScore: (testResults || []).length > 0 
      ? Math.round((testResults || []).reduce((sum, r) => sum + r.score, 0) / (testResults || []).length)
      : 0
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reprobados</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? Math.round((stats.failed / stats.total) * 100) : 0}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio</CardTitle>
            <ChartBar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgScore}</div>
            <p className="text-xs text-muted-foreground">Puntuación promedio</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Evaluaciones</CardTitle>
          <CardDescription>
            Visualiza y analiza los resultados de todos los tests inteligentes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuario o especialidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especialidades</SelectItem>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={passFilter} onValueChange={setPassFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="passed">Aprobados</SelectItem>
                <SelectItem value="failed">Reprobados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Puntuación</TableHead>
                  <TableHead>Resultado</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No se encontraron resultados
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResults.map((result) => (
                    <TableRow key={result.sessionId}>
                      <TableCell className="font-medium">{result.userId}</TableCell>
                      <TableCell>{result.specialty}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{result.score}</span>
                          <span className="text-xs text-muted-foreground">
                            ({result.correctAnswers}/{result.totalQuestions})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={result.passed ? "default" : "destructive"}>
                          {result.passed ? (
                            <><CheckCircle className="mr-1" size={14} /> Aprobado</>
                          ) : (
                            <><XCircle className="mr-1" size={14} /> Reprobado</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock size={14} className="text-muted-foreground" />
                          {formatDuration(result.timeSpent)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(result.completedAt)}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTest(result)}
                            >
                              Ver Detalles
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {result.passed ? (
                                  <CheckCircle size={24} className="text-green-600" weight="fill" />
                                ) : (
                                  <XCircle size={24} className="text-destructive" weight="fill" />
                                )}
                                Detalles del Test
                              </DialogTitle>
                              <DialogDescription>
                                {result.specialty} - {formatDate(result.completedAt)}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-muted p-4 rounded-lg">
                                  <p className="text-2xl font-bold text-primary">{result.score}</p>
                                  <p className="text-sm text-muted-foreground">Puntuación</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                  <p className="text-2xl font-bold text-primary">
                                    {result.correctAnswers}/{result.totalQuestions}
                                  </p>
                                  <p className="text-sm text-muted-foreground">Correctas</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                  <p className="text-2xl font-bold text-primary">
                                    {Math.round(result.timeSpent / 60)}
                                  </p>
                                  <p className="text-sm text-muted-foreground">Minutos</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                  <Badge variant={result.passed ? "default" : "destructive"}>
                                    {result.passed ? "APROBADO" : "REPROBADO"}
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-semibold flex items-center gap-2 mb-3">
                                  <ChartBar size={20} />
                                  Rendimiento por Categoría
                                </h3>
                                <div className="space-y-2">
                                  {Object.entries(result.categoryPerformance).map(([category, perf]) => {
                                    const percentage = Math.round((perf.correct / perf.total) * 100);
                                    return (
                                      <div key={category} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                        <span className="font-medium">{category}</span>
                                        <div className="flex items-center gap-3">
                                          <span className="text-sm text-muted-foreground">
                                            {perf.correct}/{perf.total}
                                          </span>
                                          <Badge variant={percentage >= 70 ? "default" : "secondary"}>
                                            {percentage}%
                                          </Badge>
                                        </div>
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
                                  El test se adaptó al nivel del candidato durante la evaluación.
                                </p>
                              </div>

                              {result.analysis && (
                                <div className="bg-muted p-6 rounded-lg space-y-3">
                                  <div className="flex items-center gap-2 mb-4">
                                    <TrendUp size={20} className="text-primary" />
                                    <h3 className="font-semibold">Análisis de Desempeño (IA)</h3>
                                  </div>
                                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line">
                                    {result.analysis}
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
