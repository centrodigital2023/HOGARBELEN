# Planning Guide

A clean, modern productivity dashboard application for managing tasks and tracking daily progress.

**Experience Qualities**:
1. **Efficient** - Streamlined workflows that help users accomplish tasks quickly without friction
2. **Focused** - Clear visual hierarchy that directs attention to what matters most
3. **Delightful** - Subtle animations and thoughtful interactions that make task management enjoyable

**Complexity Level**: Light Application (multiple features with basic state)
This is a task management app with persistence, filtering, and status tracking - core features that work together seamlessly without overwhelming complexity.

## Essential Features

### Task Creation
- **Functionality**: Add new tasks with title and optional description
- **Purpose**: Capture ideas and todos quickly before they're forgotten
- **Trigger**: Click "Add Task" button or press Enter in input field
- **Progression**: Click button → Input appears → Type task → Press Enter or click Save → Task appears in list
- **Success criteria**: Task persists in storage and appears immediately in the active tasks list

### Task Status Management
- **Functionality**: Toggle tasks between pending, in-progress, and completed states
- **Purpose**: Track progress and maintain focus on current work
- **Trigger**: Click task status indicator or checkbox
- **Progression**: Click task → Status cycles (pending → in-progress → completed) → Visual feedback → List re-organizes
- **Success criteria**: Status changes persist and tasks visually update to reflect current state

### Task Filtering
- **Functionality**: View all tasks, only active tasks, or only completed tasks
- **Purpose**: Reduce cognitive load by focusing on relevant tasks
- **Trigger**: Click filter tabs (All, Active, Completed)
- **Progression**: Click tab → Active tab highlights → Task list filters → Count updates
- **Success criteria**: Correct tasks display for each filter, counts are accurate

### Task Deletion
- **Functionality**: Remove tasks permanently from the list
- **Purpose**: Clean up completed or irrelevant tasks
- **Trigger**: Click delete icon on task
- **Progression**: Hover task → Delete icon appears → Click → Brief animation → Task removed
- **Success criteria**: Task is removed from storage and disappears with smooth animation

## Edge Case Handling

- **Empty States**: Show encouraging message with icon when no tasks exist for current filter
- **Long Task Names**: Truncate with ellipsis and show full text on hover tooltip
- **Rapid Interactions**: Debounce input and prevent double-clicks on action buttons
- **Data Persistence Failure**: Show toast notification if save fails, keep task in memory
- **Invalid Input**: Prevent empty task creation, show subtle error state on input

## Design Direction

The design should evoke feelings of calm productivity and gentle motivation. It should feel like a personal workspace that's both professional and approachable - not sterile or corporate, but also not overly playful. The aesthetic should inspire focus while celebrating small wins.

## Color Selection

A fresh, energizing palette centered around teal/cyan tones that balance professionalism with approachability.

- **Primary Color**: `oklch(0.65 0.15 200)` - A vibrant teal that communicates clarity and forward momentum, used for primary actions and task status indicators
- **Secondary Colors**: `oklch(0.88 0.06 220)` - Soft blue-tinted backgrounds for cards and secondary elements providing visual breathing room
- **Accent Color**: `oklch(0.70 0.18 140)` - Energetic green for completed tasks and success states, celebrating accomplishment
- **Foreground/Background Pairings**:
  - Background `oklch(0.98 0.005 220)`: Foreground `oklch(0.20 0.02 240)` - Ratio 11.5:1 ✓
  - Card `oklch(1 0 0)`: Foreground `oklch(0.20 0.02 240)` - Ratio 13.2:1 ✓
  - Primary `oklch(0.65 0.15 200)`: White `oklch(1 0 0)` - Ratio 4.9:1 ✓
  - Accent `oklch(0.70 0.18 140)`: White `oklch(1 0 0)` - Ratio 5.2:1 ✓

## Font Selection

Typography should feel modern and readable with a hint of personality - professional but not corporate, friendly but not casual.

- **Primary Font**: Space Grotesk - A geometric sans-serif with distinctive character that balances readability with visual interest
- **Secondary Font**: Inter - For body text and UI elements, providing excellent readability at all sizes

**Typographic Hierarchy**:
- H1 (App Title): Space Grotesk Bold/32px/tight letter-spacing (-0.02em)
- H2 (Section Headers): Space Grotesk SemiBold/20px/normal letter-spacing
- Body (Task Text): Inter Regular/16px/1.5 line-height
- Small (Metadata): Inter Medium/14px/muted color

## Animations

Animations should feel responsive and purposeful, reinforcing user actions without causing delays. Use subtle motion to create a sense of physical space and direct attention.

- **Task Addition**: Slide in from top with gentle bounce (300ms ease-out)
- **Task Completion**: Scale down slightly and fade out checkbox, then slide to completed section (250ms)
- **Task Deletion**: Scale to 0.95, fade out, then collapse height (200ms ease-in)
- **Filter Transitions**: Crossfade task lists with 150ms overlap to maintain visual continuity
- **Hover States**: Scale up to 1.02 on task cards (100ms ease-out)
- **Success Feedback**: Brief confetti burst or checkmark animation for completing first task of the day

## Component Selection

- **Components**: 
  - Card (task containers with subtle shadow and border)
  - Button (primary actions like "Add Task")
  - Input (task title entry)
  - Textarea (task description, optional)
  - Checkbox (task completion toggle)
  - Tabs (filter navigation: All, Active, Completed)
  - Badge (task count indicators)
  - Dialog (task details/edit modal if needed)
  - Tooltip (full text for truncated tasks)

- **Customizations**: 
  - Custom task card component with status indicator bar on left edge (3px wide, color changes with status)
  - Custom empty state component with animated icon
  - Progress ring showing completion percentage in header

- **States**: 
  - Buttons: Default has solid background, hover lifts with shadow, active scales down slightly, disabled shows reduced opacity with no-cursor
  - Tasks: Default white background, hover shows light blue tint and delete icon, completed has strikethrough and muted colors
  - Input: Default has border, focus shows primary-colored ring, error shows red border with shake animation

- **Icon Selection**: 
  - Plus (add task)
  - Check (complete task)
  - Circle (pending task status)
  - CircleNotch (in-progress task status)
  - CheckCircle (completed task status)
  - Trash (delete task)
  - Funnel (filter dropdown alternative)
  - SmileyWink (empty state encouragement)

- **Spacing**: 
  - Card padding: p-4 (16px)
  - Task list gap: gap-3 (12px)
  - Section margins: mb-6 (24px)
  - Button padding: px-4 py-2
  - Container max-width: max-w-3xl mx-auto
  - Page padding: p-6 on desktop, p-4 on mobile

- **Mobile**: 
  - Stack filter tabs vertically on <640px
  - Reduce task card padding to p-3
  - Make delete icons always visible (not just on hover)
  - Increase touch targets to minimum 44x44px
  - Full-width layout with reduced side margins (px-4)
  - Sticky header with add task button always accessible
