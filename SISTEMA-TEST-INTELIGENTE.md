# Sistema de Test Inteligente

## Descripción General

Sistema de evaluación adaptativa con IA integrado en la plataforma Hogar Belén. Genera tests personalizados para evaluar competencias profesionales en el sector de salud y cuidado de adultos mayores.

## Características Principales

### ✨ Generación Inteligente
- Preguntas generadas por IA (GPT-4o) específicas para cada especialidad
- Distribución automática de dificultad: 40% fácil, 40% medio, 20% difícil
- Cobertura de múltiples categorías de conocimiento
- Explicaciones detalladas para cada respuesta correcta

### 🎯 Adaptación en Tiempo Real
- El test ajusta la dificultad según el desempeño del candidato
- Algoritmo que evalúa el progreso cada 3 preguntas
- Transición suave entre niveles de dificultad
- Optimización del tiempo de evaluación

### 📊 Análisis Detallado
- Análisis de desempeño generado por IA
- Desglose por categorías de conocimiento
- Seguimiento de progresión de dificultad
- Recomendaciones personalizadas para mejora

### 🔒 Gestión Segura
- Almacenamiento persistente de resultados con KV
- Dashboard administrativo para revisar evaluaciones
- Filtros avanzados (especialidad, estado, búsqueda)
- Exportación de métricas y estadísticas

## Estructura del Sistema

### Archivos Principales

```
src/
├── lib/
│   └── intelligentTest.ts          # Lógica core del sistema
├── hooks/
│   └── useIntelligentTest.ts       # Hook React para gestión de tests
├── components/
│   ├── IntelligentTestInterface.tsx   # Interfaz de realización de test
│   └── TestManagementDashboard.tsx    # Dashboard administrativo
└── pages/
    └── TestDemoPage.tsx            # Página demo completa
```

### Tipos de Datos

#### TestQuestion
```typescript
{
  id: string;
  question: string;
  options: string[];           // Exactamente 4 opciones
  correctAnswer: number;       // Índice 0-3
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  explanation?: string;
}
```

#### TestSession
```typescript
{
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
```

#### TestResult
```typescript
{
  sessionId: string;
  userId: string;
  specialty: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;            // En segundos
  categoryPerformance: Record<string, { correct: number; total: number }>;
  difficultyProgression: ('easy' | 'medium' | 'hard')[];
  passed: boolean;               // score >= 70
  completedAt: number;
  analysis?: string;             // Generado por IA
}
```

## API y Funciones Principales

### generateIntelligentTest(config: TestConfig): Promise<TestQuestion[]>
Genera un test completo usando IA basado en la configuración proporcionada.

**Parámetros:**
- `specialty`: Especialidad profesional (ej: "Enfermería Geriátrica")
- `totalQuestions`: Número de preguntas (recomendado: 10-20)
- `difficulty`: Modo de dificultad ('adaptive' recomendado)
- `categories`: Array opcional de categorías específicas

**Retorna:** Array de preguntas generadas

### calculateAdaptiveDifficulty(correctAnswers, totalAnswered, currentDifficulty)
Calcula el siguiente nivel de dificultad basado en el desempeño.

**Lógica:**
- ≥80% correctas: Incrementa dificultad
- ≤40% correctas: Reduce dificultad
- Entre 40-80%: Mantiene dificultad actual

### evaluateTestSession(session: TestSession): TestResult
Evalúa una sesión completa y genera el resultado final.

### analyzeTestPerformance(result: TestResult): Promise<string>
Genera análisis detallado del desempeño usando IA.

## Hook useIntelligentTest

### Uso Básico

```typescript
import { useIntelligentTest } from '@/hooks/useIntelligentTest';

function MyTestComponent() {
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

  // Iniciar test
  await startTest('user-123', 'Enfermería', {
    specialty: 'Enfermería Geriátrica',
    totalQuestions: 10,
    difficulty: 'adaptive'
  });

  // Responder pregunta
  answerQuestion(selectedAnswerIndex);

  // Completar y obtener resultado
  const result = await completeTest();
}
```

### Estados del Hook

- `session`: Sesión actual del test (null si no iniciado)
- `currentQuestion`: Pregunta actual a mostrar
- `isGenerating`: true durante generación de preguntas
- `isAnalyzing`: true durante análisis final
- `error`: Mensaje de error si ocurre alguno
- `progress`: Porcentaje de progreso (0-100)

## Componentes UI

### IntelligentTestInterface

Interfaz completa para realizar un test con:
- Pantalla de inicio con información
- Visualización de preguntas con opciones
- Indicador de progreso
- Badges de dificultad
- Pantalla de resultados con análisis

**Props:**
```typescript
{
  userId: string;
  specialty: string;
  config: TestConfig;
  onComplete?: (result: TestResult) => void;
  onCancel?: () => void;
}
```

### TestManagementDashboard

Dashboard administrativo con:
- Estadísticas generales (total, aprobados, reprobados, promedio)
- Tabla de resultados con filtros
- Búsqueda por usuario/especialidad
- Vista detallada de cada evaluación
- Análisis por categorías

**Características:**
- Filtrado en tiempo real
- Modal de detalles con análisis completo
- Visualización de progresión de dificultad
- Indicadores de rendimiento por categoría

### TestDemoPage

Página completa de demostración que incluye:
- Configurador de test
- Interfaz de realización
- Dashboard de gestión
- Tabs para navegación

## Integración en la Aplicación

### Agregar Ruta

En `App.tsx`:
```typescript
import TestDemoPage from './pages/TestDemoPage';

// En renderPage():
case 'test-inteligente': return <TestDemoPage setPage={setCurrentPage} />;
```

### Navegar al Test

```typescript
setPage('test-inteligente');
```

## Almacenamiento de Datos

### KV Store Keys

- `test-results`: Array de todos los resultados de tests
  - Persistente entre sesiones
  - Accesible desde cualquier componente
  - Actualizado automáticamente por el hook

### Estructura de Persistencia

```typescript
// Guardar resultados
const [testResults, setTestResults] = useKV<TestResult[]>('test-results', []);

// Agregar nuevo resultado
setTestResults((current) => [...current, newResult]);
```

## Configuración de Especialidades

### Especialidades Pre-configuradas

1. Enfermería Geriátrica
2. Fisioterapia
3. Psicología Clínica
4. Trabajo Social
5. Terapia Ocupacional
6. Nutrición Clínica
7. Medicina General
8. Cuidado de Adulto Mayor

### Agregar Nueva Especialidad

Simplemente incluir en el array de `specialties` en `TestDemoPage.tsx`.

## Criterios de Evaluación

### Puntuación
- Cada pregunta correcta: 100 / totalQuestions puntos
- Puntuación mínima para aprobar: 70

### Análisis por IA
El análisis incluye:
- Evaluación general del desempeño
- Fortalezas identificadas
- Áreas de mejora específicas
- Recomendación sobre competencia demostrada

## Mejores Prácticas

### Configuración Recomendada

```typescript
{
  specialty: 'Especialidad específica',
  totalQuestions: 10-15,  // Balance entre exhaustividad y tiempo
  difficulty: 'adaptive',  // Siempre usar adaptativo
  categories: ['Cat1', 'Cat2', 'Cat3', 'Cat4']  // 3-5 categorías
}
```

### UX Considerations

1. **Feedback Inmediato**: Mostrar explicaciones brevemente después de responder
2. **Sin Límite de Tiempo**: Permite pensamiento reflexivo
3. **Progreso Visual**: Barra de progreso clara y badges de dificultad
4. **Confirmación Visual**: Estados de carga para generación y análisis
5. **Mobile-First**: Diseño responsive para todos los dispositivos

### Seguridad

- Resultados almacenados localmente en KV (no expuestos públicamente)
- Los análisis de IA no incluyen información sensible
- Dashboard administrativo puede protegerse con autenticación
- IDs de usuario pueden ser anónimos o hasheados

## Personalización y Extensión

### Modificar Algoritmo Adaptativo

En `intelligentTest.ts`, función `calculateAdaptiveDifficulty()`:
```typescript
// Ajustar umbrales
const successRate = correctAnswers / totalAnswered;

if (successRate >= 0.8) { // Cambiar 0.8 a tu umbral
  // Incrementar dificultad
}
```

### Personalizar Prompt de IA

En `generateIntelligentTest()`:
```typescript
const prompt = spark.llmPrompt`
  Tu prompt personalizado aquí...
  Variables: ${specialty}, ${totalQuestions}
`;
```

### Agregar Nuevas Métricas

En `TestResult` type:
```typescript
export interface TestResult {
  // ... campos existentes
  customMetric?: YourMetricType;
}
```

## Troubleshooting

### Error: "No se pudo generar el test"
- Verificar conectividad con spark.llm API
- Revisar formato del specialty
- Confirmar que totalQuestions está en rango válido (5-30)

### Las preguntas no se adaptan
- Verificar que `difficulty` está configurado como 'adaptive'
- Revisar lógica en `calculateAdaptiveDifficulty()`
- Confirmar que se llama `getNextQuestion()` después de cada respuesta

### Resultados no persisten
- Verificar uso correcto de `useKV` hook
- Confirmar uso de actualizaciones funcionales: `setResults((current) => ...)`
- Revisar que `completeTest()` se llama al finalizar

## Próximos Pasos

### Mejoras Sugeridas
1. Exportación de resultados a PDF
2. Comparación de resultados históricos
3. Tests programados automáticamente
4. Integración con sistema de certificación
5. Banco de preguntas pre-generadas para reducir latencia
6. Modo offline con sincronización posterior

## Soporte

Para consultas o problemas:
- Revisar logs del navegador (console)
- Verificar errores de TypeScript
- Consultar documentación de spark.llm API
- Revisar tipos en `intelligentTest.ts`

---

**Versión:** 1.0.0  
**Última actualización:** 2024  
**Estado:** Producción-ready
