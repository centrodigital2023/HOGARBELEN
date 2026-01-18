import { motion } from 'framer-motion'
import { ParticleBackground } from '@/components/ParticleBackground'
import { AnimatedStat } from '@/components/AnimatedStat'
import { ThemeCustomizer } from '@/components/ThemeCustomizer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Cube, 
  Lightning, 
  Sparkle, 
  Cpu, 
  ChartBar,
  Users,
  Rocket
} from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow">
                <Cpu size={24} weight="duotone" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">NEXUS</h1>
                <p className="text-xs text-muted-foreground font-mono">Command Center</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Badge variant="outline" className="glass border-primary/50">
                <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse-glow" />
                <span className="font-mono text-xs">ONLINE</span>
              </Badge>
              <ThemeCustomizer />
            </motion.div>
          </div>
        </header>

        <main className="container mx-auto px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-4">
              <span className="text-gradient">Intelligent</span> Dashboard
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
              Advanced data visualization and control systems for the modern era
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <motion.div variants={item}>
              <AnimatedStat
                value={12847}
                label="Active Systems"
                icon={<Cpu size={24} weight="duotone" />}
              />
            </motion.div>
            <motion.div variants={item}>
              <AnimatedStat
                value={98}
                label="Efficiency Score"
                suffix="%"
                icon={<ChartBar size={24} weight="duotone" />}
                delay={0.1}
              />
            </motion.div>
            <motion.div variants={item}>
              <AnimatedStat
                value={1543}
                label="Connected Nodes"
                icon={<Users size={24} weight="duotone" />}
                delay={0.2}
              />
            </motion.div>
            <motion.div variants={item}>
              <AnimatedStat
                value={247}
                label="Quantum Threads"
                icon={<Lightning size={24} weight="duotone" />}
                delay={0.3}
              />
            </motion.div>
          </motion.div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="glass-strong border border-border/50">
              <TabsTrigger value="overview" className="data-[state=active]:glow">
                <Brain size={18} weight="duotone" className="mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="neural" className="data-[state=active]:glow">
                <Cube size={18} weight="duotone" className="mr-2" />
                Neural Grid
              </TabsTrigger>
              <TabsTrigger value="quantum" className="data-[state=active]:glow">
                <Sparkle size={18} weight="duotone" className="mr-2" />
                Quantum Core
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <Card className="glass-strong p-6 border-border/50 group hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 font-mono">System Status</h3>
                      <p className="text-sm text-muted-foreground">Real-time monitoring</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:glow transition-all duration-300">
                      <Lightning size={24} weight="duotone" className="text-primary" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Neural Processing', value: 94 },
                      { label: 'Quantum Computing', value: 87 },
                      { label: 'Data Synchronization', value: 99 }
                    ].map((metric, i) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-mono">{metric.label}</span>
                          <span className="text-primary font-bold">{metric.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full glow"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass-strong p-6 border-border/50 group hover:border-secondary/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 font-mono">Active Processes</h3>
                      <p className="text-sm text-muted-foreground">Current operations</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/10 group-hover:glow-secondary transition-all duration-300">
                      <Cube size={24} weight="duotone" className="text-secondary" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Data Analysis', status: 'Running', color: 'bg-primary' },
                      { name: 'Neural Training', status: 'Active', color: 'bg-secondary' },
                      { name: 'Quantum Sync', status: 'Processing', color: 'bg-accent' },
                      { name: 'Pattern Recognition', status: 'Complete', color: 'bg-primary' }
                    ].map((process, i) => (
                      <motion.div
                        key={process.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg glass hover:bg-muted/5 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${process.color} animate-pulse-glow`} />
                          <span className="font-mono text-sm">{process.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs font-mono">
                          {process.status}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <Card className="glass-strong p-8 border-border/50 text-center group hover:border-accent/50 transition-all duration-300">
                <div className="inline-block p-4 rounded-2xl bg-accent/10 mb-4 group-hover:glow-accent transition-all duration-300">
                  <Rocket size={48} weight="duotone" className="text-accent" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Deploy New Module</h3>
                <p className="text-muted-foreground mb-6 font-mono">
                  Initialize advanced computational systems
                </p>
                <Button size="lg" className="glow bg-gradient-to-r from-primary via-accent to-secondary hover:scale-105 transition-transform duration-300">
                  <Lightning size={20} weight="fill" className="mr-2" />
                  Launch System
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="neural" className="space-y-6">
              <Card className="glass-strong p-8 border-border/50">
                <h3 className="text-2xl font-bold mb-4 font-mono flex items-center gap-2">
                  <Cube size={28} weight="duotone" className="text-primary" />
                  Neural Grid Architecture
                </h3>
                <p className="text-muted-foreground mb-6">
                  Advanced artificial intelligence processing nodes with distributed computing capabilities
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="gradient-border p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm text-muted-foreground">Node {i + 1}</span>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      </div>
                      <div className="text-2xl font-bold text-gradient">
                        {Math.floor(Math.random() * 100)}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="quantum" className="space-y-6">
              <Card className="glass-strong p-8 border-border/50">
                <h3 className="text-2xl font-bold mb-4 font-mono flex items-center gap-2">
                  <Sparkle size={28} weight="duotone" className="text-secondary" />
                  Quantum Processing Core
                </h3>
                <p className="text-muted-foreground mb-6">
                  Next-generation quantum computing infrastructure for exponential performance
                </p>
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative w-64 h-64"
                  >
                    <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary glow" />
                    <div className="absolute inset-4 rounded-full border-4 border-secondary/30 border-r-secondary glow-secondary" />
                    <div className="absolute inset-8 rounded-full border-4 border-accent/30 border-b-accent glow-accent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gradient">Q</div>
                        <div className="text-sm font-mono text-muted-foreground mt-2">CORE</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <footer className="relative z-10 border-t border-border/50 glass mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
              <div>© 2024 NEXUS Command Center</div>
              <div className="flex items-center gap-2">
                <span>Powered by Quantum Intelligence</span>
                <Sparkle size={16} weight="fill" className="text-primary" />
              </div>
            </div>
          </div>
        </footer>
      </div>

      <Toaster />
    </div>
  )
}
