import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Palette } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const themes = [
  {
    name: 'Cyber Neon',
    colors: {
      primary: 'oklch(0.70 0.20 210)',
      secondary: 'oklch(0.65 0.25 300)',
      accent: 'oklch(0.72 0.24 340)',
    }
  },
  {
    name: 'Quantum Green',
    colors: {
      primary: 'oklch(0.68 0.22 150)',
      secondary: 'oklch(0.60 0.20 180)',
      accent: 'oklch(0.75 0.25 120)',
    }
  },
  {
    name: 'Solar Flare',
    colors: {
      primary: 'oklch(0.72 0.24 40)',
      secondary: 'oklch(0.70 0.22 50)',
      accent: 'oklch(0.65 0.26 25)',
    }
  },
  {
    name: 'Deep Space',
    colors: {
      primary: 'oklch(0.65 0.22 260)',
      secondary: 'oklch(0.70 0.20 280)',
      accent: 'oklch(0.68 0.24 240)',
    }
  }
]

export function ThemeCustomizer() {
  const [selectedTheme, setSelectedTheme] = useKV<typeof themes[0]>('selected-theme', themes[0])
  const [isOpen, setIsOpen] = useState(false)

  const applyTheme = (theme: typeof themes[0]) => {
    setSelectedTheme(() => theme)
    const root = document.documentElement
    root.style.setProperty('--primary', theme.colors.primary)
    root.style.setProperty('--secondary', theme.colors.secondary)
    root.style.setProperty('--accent', theme.colors.accent)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="glass border-border/50 hover:glow transition-all duration-300"
        >
          <Palette size={20} className="text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="glass-strong border-border/50 p-4 w-80">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1 font-mono">Theme Palette</h3>
            <p className="text-sm text-muted-foreground">Choose your color scheme</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme, index) => (
              <motion.button
                key={theme.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => applyTheme(theme)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedTheme.name === theme.name
                    ? 'border-primary glow'
                    : 'border-border/30 hover:border-primary/50'
                }`}
              >
                <div className="flex gap-2 mb-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ background: theme.colors.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ background: theme.colors.secondary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ background: theme.colors.accent }}
                  />
                </div>
                <div className="text-sm font-mono text-left">{theme.name}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
