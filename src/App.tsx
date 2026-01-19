import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster, toast } from 'sonner'
import { Plus, Check, Circle, CircleNotch, CheckCircle, Trash, SmileyWink } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'

type TaskStatus = 'pending' | 'in-progress' | 'completed'

interface Task {
  id: string
  title: string
  status: TaskStatus
  createdAt: number
}

export default function App() {
  const [tasks, setTasks] = useKV<Task[]>('tasks', [])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTask = () => {
    const trimmedTitle = newTaskTitle.trim()
    if (!trimmedTitle) {
      toast.error('Please enter a task title')
      return
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: trimmedTitle,
      status: 'pending',
      createdAt: Date.now(),
    }

    setTasks((currentTasks) => [newTask, ...(currentTasks || [])])
    setNewTaskTitle('')
    toast.success('Task added!')
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks((currentTasks) =>
      (currentTasks || []).map((task) => {
        if (task.id !== taskId) return task

        const statusFlow: Record<TaskStatus, TaskStatus> = {
          pending: 'in-progress',
          'in-progress': 'completed',
          completed: 'pending',
        }

        const newStatus = statusFlow[task.status]
        
        if (newStatus === 'completed') {
          toast.success('Task completed! 🎉')
        }

        return { ...task, status: newStatus }
      })
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((currentTasks) => (currentTasks || []).filter((task) => task.id !== taskId))
    toast.success('Task deleted')
  }

  const taskList = tasks || []

  const filteredTasks = taskList.filter((task) => {
    if (filter === 'active') return task.status !== 'completed'
    if (filter === 'completed') return task.status === 'completed'
    return true
  })

  const activeTasks = taskList.filter((t) => t.status !== 'completed').length
  const completedTasks = taskList.filter((t) => t.status === 'completed').length
  const completionPercentage = taskList.length > 0 ? Math.round((completedTasks / taskList.length) * 100) : 0

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return <Circle className="text-muted-foreground" size={20} />
      case 'in-progress':
        return <CircleNotch className="text-primary" size={20} weight="bold" />
      case 'completed':
        return <CheckCircle className="text-accent" size={20} weight="fill" />
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-foreground">TaskFlow</h1>
            {taskList.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-muted-foreground">Progress</div>
                  <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-secondary"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - completionPercentage / 100)}`}
                      className="text-primary transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="flex gap-2">
              <Input
                id="new-task-title"
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                className="flex-1 bg-card"
              />
              <Button onClick={addTask} size="icon" className="shrink-0">
                <Plus size={20} weight="bold" />
              </Button>
            </div>
          </Card>
        </header>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {taskList.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              <Badge variant="secondary" className="ml-2">
                {activeTasks}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              <Badge variant="secondary" className="ml-2">
                {completedTasks}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <SmileyWink size={64} className="text-muted-foreground mx-auto mb-4" weight="duotone" />
                <h2 className="text-muted-foreground mb-2">
                  {filter === 'completed' && taskList.length > 0
                    ? 'No completed tasks yet'
                    : filter === 'active' && taskList.length > 0
                    ? 'All tasks completed!'
                    : 'No tasks yet'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filter === 'all' || taskList.length === 0
                    ? 'Add your first task to get started'
                    : filter === 'active'
                    ? 'Great job finishing everything!'
                    : 'Complete some tasks to see them here'}
                </p>
              </motion.div>
            ) : (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer group relative overflow-hidden ${
                      task.status === 'completed' ? 'opacity-75' : ''
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        task.status === 'pending'
                          ? 'bg-muted-foreground'
                          : task.status === 'in-progress'
                          ? 'bg-primary'
                          : 'bg-accent'
                      }`}
                    />
                    <div className="flex items-center gap-3 pl-2">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className="shrink-0 hover:scale-110 transition-transform"
                      >
                        {getStatusIcon(task.status)}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-base ${
                            task.status === 'completed'
                              ? 'line-through text-muted-foreground'
                              : 'text-card-foreground'
                          }`}
                        >
                          {task.title}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                        className="shrink-0 opacity-0 md:group-hover:opacity-100 md:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash size={18} />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}
