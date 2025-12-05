import { useState } from 'react';
import { Brain, Bot, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface AICareAssistantProps {
  setPage: (page: string) => void;
}

interface AIResponse {
  analysis: string;
  category: string;
  steps: string[];
  recommendedProfessionals: string[];
}

export default function AICareAssistant({ setPage }: AICareAssistantProps) {
  const [queryText, setQueryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const handleAnalyze = async () => {
    if (!queryText.trim()) return;

    setLoading(true);
    
    // Simulated AI analysis
    setTimeout(() => {
      setResponse({
        analysis:
          'Basado en la descripción, parece que se requiere asistencia post-operatoria con enfoque en movilidad y cuidado de heridas. Es importante contar con un profesional de enfermería especializada que pueda realizar curaciones y monitoreo constante.',
        category: 'enfermeria',
        steps: [
          'Monitoreo de signos vitales',
          'Cuidado y curación de heridas',
          'Asistencia en movilidad',
          'Control de dolor y medicación',
          'Evaluación de recuperación',
        ],
        recommendedProfessionals: ['Enfermería Especializada', 'Fisioterapia', 'Médico Geriatra'],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-background to-indigo-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="shadow-2xl border-2 border-purple-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white text-center">
            <Bot className="w-16 h-16 mx-auto mb-4 text-purple-200" />
            <h2 className="text-3xl font-bold mb-2">Asistente Hogar Belén IA</h2>
            <p className="text-purple-100">Cuéntanos tu situación, nosotros te guiamos</p>
          </div>

          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Input Area */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Describe la situación o necesidad de cuidado
                </label>
                <Textarea
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="min-h-[120px] resize-none"
                  placeholder="Ej: Mi padre de 85 años necesita ayuda para moverse después de una cirugía de cadera. Requiere cuidado de la herida y asistencia para caminar..."
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Proporciona detalles como edad, condición médica, tipo de asistencia necesaria, etc.
                </p>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={loading || !queryText.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Analizando con IA...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2" size={20} />
                    Analizar Caso con IA
                  </>
                )}
              </Button>

              {/* AI Response */}
              {response && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="text-purple-600" size={20} />
                      <h3 className="font-bold text-lg text-purple-900">Análisis Inteligente</h3>
                    </div>
                    <p className="text-foreground leading-relaxed">{response.analysis}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">
                          1
                        </span>
                        Pasos Recomendados
                      </h4>
                      <div className="space-y-2">
                        {response.steps.map((step, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">
                          2
                        </span>
                        Profesionales Recomendados
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {response.recommendedProfessionals.map((prof, i) => (
                          <Badge key={i} className="bg-purple-100 text-purple-700 border-purple-200">
                            {prof}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button onClick={() => setPage('dashboard')} className="w-full" size="lg">
                        Buscar Profesionales de {response.category}
                        <ArrowRight className="ml-2" size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Example Cases */}
              {!response && !loading && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Ejemplos de casos:</h4>
                  {[
                    'Mi madre necesita ayuda para bañarse y vestirse después de un ACV',
                    'Busco fisioterapeuta para rehabilitación post-operatoria de rodilla',
                    'Necesito enfermera para administrar medicación diaria y control de diabetes',
                  ].map((example, i) => (
                    <button
                      key={i}
                      onClick={() => setQueryText(example)}
                      className="w-full text-left p-3 text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="text-purple-600" size={20} />
              ¿Cómo funciona el Asistente IA?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mb-2 font-bold">
                  1
                </div>
                <p className="font-semibold mb-1">Describe</p>
                <p className="text-muted-foreground text-xs">Cuéntanos la situación de cuidado</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mb-2 font-bold">
                  2
                </div>
                <p className="font-semibold mb-1">Analiza</p>
                <p className="text-muted-foreground text-xs">La IA evalúa y recomienda</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mb-2 font-bold">
                  3
                </div>
                <p className="font-semibold mb-1">Conecta</p>
                <p className="text-muted-foreground text-xs">Te dirigimos al profesional ideal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
