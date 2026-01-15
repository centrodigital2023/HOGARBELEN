import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SupabaseAuthExample } from '@/components/examples/SupabaseAuthExample'
import { LeadsManagerExample } from '@/components/examples/LeadsManagerExample'
import { 
  Database, 
  Cloud, 
  CheckCircle, 
  Code, 
  Rocket,
  Lightning,
  Shield
} from '@phosphor-icons/react'

export default function SupabaseIntegrationDemo() {
  const [activeTab, setActiveTab] = useState('overview')

  const features = [
    {
      icon: Database,
      title: 'Supabase Database',
      description: 'PostgreSQL con tipos TypeScript completos',
      status: 'Configurado'
    },
    {
      icon: Shield,
      title: 'Autenticación',
      description: 'Sistema de auth con Row Level Security',
      status: 'Activo'
    },
    {
      icon: Lightning,
      title: 'Hooks Personalizados',
      description: 'useSupabaseQuery, useSupabaseMutation, useSupabaseAuth',
      status: 'Disponible'
    },
    {
      icon: Cloud,
      title: 'Vercel Deployment',
      description: 'CI/CD automático configurado',
      status: 'Listo'
    },
    {
      icon: Code,
      title: 'TypeScript',
      description: 'Type-safe database operations',
      status: 'Implementado'
    },
    {
      icon: Rocket,
      title: 'Componentes Ejemplo',
      description: 'Auth y CRUD completamente funcionales',
      status: 'Completo'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-4 py-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/10 rounded-full mb-4">
            <Database size={32} weight="duotone" className="text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">
              Supabase + Vercel Integration
            </span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Conexión Inteligente Completada
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tu aplicación ahora cuenta con autenticación, base de datos, y deployment automatizado - todo configurado de forma inteligente
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <feature.icon size={32} weight="duotone" className="text-primary" />
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                    <CheckCircle size={12} className="mr-1" />
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Alert className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200">
          <AlertDescription className="text-sm">
            <strong>📚 Documentación:</strong> Ver{' '}
            <code className="bg-white/50 px-2 py-1 rounded">CONEXION-INTELIGENTE.md</code> y{' '}
            <code className="bg-white/50 px-2 py-1 rounded">DEPLOY-QUICK-START.md</code> para instrucciones completas
          </AlertDescription>
        </Alert>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Demostración Interactiva</CardTitle>
            <CardDescription>
              Prueba los componentes completamente funcionales integrados con Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Vista General</TabsTrigger>
                <TabsTrigger value="auth">Autenticación</TabsTrigger>
                <TabsTrigger value="leads">Gestión de Leads</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 py-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Archivos Creados</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="font-mono bg-muted p-3 rounded space-y-1">
                        <div>✅ <span className="text-blue-600">src/lib/supabase.ts</span></div>
                        <div>✅ <span className="text-blue-600">src/lib/supabase-helpers.ts</span></div>
                        <div>✅ <span className="text-blue-600">src/hooks/useSupabaseAuth.ts</span></div>
                        <div>✅ <span className="text-blue-600">src/hooks/useSupabaseQuery.ts</span></div>
                        <div>✅ <span className="text-blue-600">src/hooks/useSupabaseMutation.ts</span></div>
                        <div>✅ <span className="text-blue-600">src/components/examples/*</span></div>
                        <div>✅ <span className="text-blue-600">.env.example</span></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Próximos Pasos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm flex-shrink-0">1</div>
                        <div className="text-sm">
                          <p className="font-medium">Crear proyecto en Supabase</p>
                          <p className="text-muted-foreground">supabase.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm flex-shrink-0">2</div>
                        <div className="text-sm">
                          <p className="font-medium">Ejecutar schema SQL</p>
                          <p className="text-muted-foreground">Ver DEPLOY-QUICK-START.md</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm flex-shrink-0">3</div>
                        <div className="text-sm">
                          <p className="font-medium">Configurar variables .env</p>
                          <p className="text-muted-foreground">Copiar credenciales de Supabase</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm flex-shrink-0">4</div>
                        <div className="text-sm">
                          <p className="font-medium">Deploy a Vercel</p>
                          <p className="text-muted-foreground">vercel --prod</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">🎉 Todo Listo para Producción</CardTitle>
                    <CardDescription className="text-blue-100">
                      Tu aplicación cuenta con una arquitectura escalable, segura y lista para crecer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-white/20 hover:bg-white/30">TypeScript</Badge>
                      <Badge className="bg-white/20 hover:bg-white/30">React 19</Badge>
                      <Badge className="bg-white/20 hover:bg-white/30">Supabase</Badge>
                      <Badge className="bg-white/20 hover:bg-white/30">Vercel</Badge>
                      <Badge className="bg-white/20 hover:bg-white/30">shadcn/ui</Badge>
                      <Badge className="bg-white/20 hover:bg-white/30">Tailwind v4</Badge>
                      <Badge className="bg-white/20 hover:bg-white/30">RLS Security</Badge>
                      <Badge className="bg-white/20 hover:bg-white/30">CI/CD</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="auth" className="py-6">
                <Alert className="mb-6">
                  <AlertDescription>
                    <strong>Nota:</strong> Para que este componente funcione, primero debes configurar Supabase con las credenciales en tu archivo <code>.env</code>
                  </AlertDescription>
                </Alert>
                <SupabaseAuthExample />
              </TabsContent>

              <TabsContent value="leads" className="py-6">
                <Alert className="mb-6">
                  <AlertDescription>
                    <strong>Nota:</strong> Para que este componente funcione, primero debes configurar Supabase y ejecutar el schema SQL. Ver <code>DEPLOY-QUICK-START.md</code>
                  </AlertDescription>
                </Alert>
                <LeadsManagerExample />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground space-y-2 pb-12">
          <p>
            Desarrollado con ❤️ para Hogar Belén - Centro de Vida para Adultos Mayores
          </p>
          <p>
            Arquitectura inteligente • Componentes reutilizables • Lista para escalar
          </p>
        </div>
      </div>
    </div>
  )
}
