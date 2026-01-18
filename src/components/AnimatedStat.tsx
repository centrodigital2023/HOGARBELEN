import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  icon?: React.ReactNode
  delay?: number
}

export function AnimatedStat({ value, label, suffix = '', prefix = '', icon, delay = 0 }: AnimatedStatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    const stepTime = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(stepValue * currentStep))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass-strong p-6 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {icon && (
            <div className="text-primary glow p-2 rounded-lg bg-primary/10">
              {icon}
            </div>
          )}
        </div>
        
        <div className="text-4xl font-bold text-gradient mb-2">
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        
        <div className="text-muted-foreground font-mono text-sm">
          {label}
        </div>
      </div>
      
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
    </motion.div>
  )
}
