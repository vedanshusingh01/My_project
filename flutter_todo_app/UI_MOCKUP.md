# Flutter To-Do App - UI Mockup

## 📱 Application Screenshots (Visual Description)

Since the Flutter SDK is not available in this environment, here's a detailed description of what the app will look like when running:

---

## 🏠 Home Screen - Pending Tasks Tab

```
┌─────────────────────────────────────────┐
│  ← To-Do List                          │  <- AppBar (Blue)
├─────────────────────────────────────────┤
│ [Pending Tasks] [Completed Tasks]      │  <- TabBar
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🔍 Search tasks...              │   │  <- Search Bar
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ☐ Buy groceries            ✏️ 🗑️ │   │  <- Task Card 1
│  │   Need to buy milk, bread        │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ☐ Finish Flutter project   ✏️ 🗑️ │   │  <- Task Card 2
│  │   Complete the to-do app         │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ☐ Read documentation        ✏️ 🗑️ │   │  <- Task Card 3
│  │   Learn Provider package         │
│  └─────────────────────────────────┘   │
│                                         │
│                                         │
│                                    ⊕   │  <- Floating Action Button
└─────────────────────────────────────────┘
```

**Elements:**
- **Blue AppBar**: "To-Do List" title
- **TabBar**: Two tabs (Pending selected, Completed unselected)
- **Search Bar**: Light gray background with magnifying glass icon
- **Task Cards**: White cards with:
  - Empty checkbox (left)
  - Task title (bold)
  - Task description (smaller text, 2 lines max)
  - Edit icon (blue pencil)
  - Delete icon (red trash)
- **FAB**: Blue circular button with white "+" icon

---

## ✅ Home Screen - Completed Tasks Tab

```
┌─────────────────────────────────────────┐
│  ← To-Do List                          │  <- AppBar (Blue)
├─────────────────────────────────────────┤
│ [Pending Tasks] [Completed Tasks]      │  <- TabBar
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🔍 Search tasks...              │   │  <- Search Bar
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ☑ Write unit tests         ✏️ 🗑️ │   │  <- Completed Task 1
│  │   Test all provider methods      │   │  (strikethrough text)
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ☑ Setup project            ✏️ 🗑️ │   │  <- Completed Task 2
│  │   Initialize Flutter app         │   │  (strikethrough text)
│  └─────────────────────────────────┘   │
│                                         │
│                                         │
│                                         │
│                                         │
│                                    ⊕   │  <- Floating Action Button
└─────────────────────────────────────────┘
```

**Elements:**
- **Completed Tasks Tab**: Now selected (highlighted)
- **Checked Checkboxes**: Tasks marked as complete
- **Strikethrough Text**: Both title and description
- All other elements same as Pending tab

---

## ➕ Add Task Dialog

```
       ┌─────────────────────────────┐
       │      Add Task               │
       ├─────────────────────────────┤
       │                             │
       │  ┌───────────────────────┐  │
       │  │ Title                 │  │
       │  │                       │  │
       │  └───────────────────────┘  │
       │                             │
       │  ┌───────────────────────┐  │
       │  │ Description           │  │
       │  │                       │  │
       │  │                       │  │
       │  │                       │  │
       │  └───────────────────────┘  │
       │                             │
       │         [Cancel]  [Save]    │
       └─────────────────────────────┘
```

**Elements:**
- **Modal Dialog**: Centered on screen
- **Title**: "Add Task"
- **Title Field**: Single-line text input with border
- **Description Field**: Multi-line text input (3 rows) with border
- **Cancel Button**: Text button (gray)
- **Save Button**: Elevated button (blue)

**Validation:**
- Both fields required
- Shows error if empty on submit

---

## ✏️ Edit Task Dialog

```
       ┌─────────────────────────────┐
       │      Edit Task              │
       ├─────────────────────────────┤
       │                             │
       │  ┌───────────────────────┐  │
       │  │ Buy groceries         │  │  <- Pre-filled
       │  │                       │  │
       │  └───────────────────────┘  │
       │                             │
       │  ┌───────────────────────┐  │
       │  │ Need to buy milk,     │  │  <- Pre-filled
       │  │ bread, and eggs       │  │
       │  │                       │  │
       │  │                       │  │
       │  └───────────────────────┘  │
       │                             │
       │         [Cancel]  [Save]    │
       └─────────────────────────────┘
```

**Elements:**
- Same as Add Dialog but:
  - Title: "Edit Task"
  - Fields pre-filled with existing task data
  - Save updates the task instead of creating new

---

## 🗑️ Delete Confirmation Dialog

```
       ┌─────────────────────────────┐
       │      Delete Task            │
       ├─────────────────────────────┤
       │                             │
       │  Are you sure you want to   │
       │  delete this task?          │
       │                             │
       │         [Cancel]  [Delete]  │
       └─────────────────────────────┘
```

**Elements:**
- **Title**: "Delete Task"
- **Message**: Confirmation text
- **Cancel Button**: Text button
- **Delete Button**: Text button (red text)

---

## 🔍 Search in Action

### Before Search (All Tasks)
```
┌─────────────────────────────────────┐
│ 🔍 Search tasks...                  │
├─────────────────────────────────────┤
│ ☐ Buy groceries              ✏️ 🗑️  │
│ ☐ Finish Flutter project     ✏️ 🗑️  │
│ ☐ Read documentation         ✏️ 🗑️  │
│ ☐ Write tests                ✏️ 🗑️  │
└─────────────────────────────────────┘
```

### After Typing "Flutter"
```
┌─────────────────────────────────────┐
│ 🔍 Flutter                          │
├─────────────────────────────────────┤
│ ☐ Finish Flutter project     ✏️ 🗑️  │  <- Matches in title
│   Complete the to-do app            │
└─────────────────────────────────────┘
```

**Behavior:**
- Real-time filtering as you type
- Searches both title and description
- Case-insensitive matching
- Works in both Pending and Completed tabs
- Clear search to show all tasks again

---

## 📱 Empty States

### No Pending Tasks
```
┌─────────────────────────────────────┐
│        Pending Tasks Tab            │
├─────────────────────────────────────┤
│                                     │
│                                     │
│          No tasks found             │  <- Gray text
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### No Completed Tasks
```
┌─────────────────────────────────────┐
│       Completed Tasks Tab           │
├─────────────────────────────────────┤
│                                     │
│                                     │
│          No tasks found             │  <- Gray text
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### No Search Results
```
┌─────────────────────────────────────┐
│ 🔍 xyz123                           │
├─────────────────────────────────────┤
│                                     │
│                                     │
│          No tasks found             │  <- Gray text
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Color Scheme

- **Primary Color**: Blue (#2196F3)
- **AppBar**: Blue background, white text
- **Tab Indicator**: White
- **Selected Tab**: White text
- **Unselected Tab**: White70 text
- **FAB**: Blue background, white icon
- **Task Cards**: White background
- **Search Bar**: Gray (200) background
- **Edit Icon**: Blue
- **Delete Icon**: Red
- **Checkbox (Unchecked)**: Gray outline
- **Checkbox (Checked)**: Blue fill
- **Text (Normal)**: Black
- **Text (Completed)**: Gray with strikethrough
- **Empty State Text**: Gray

---

## 🎭 Interactions & Animations

### Tap Interactions
- **FAB**: Opens Add Task dialog with fade animation
- **Checkbox**: Toggles task completion, moves task between tabs
- **Edit Icon**: Opens Edit Task dialog with existing data
- **Delete Icon**: Shows confirmation dialog
- **Search Field**: Keyboard appears, real-time filtering
- **Tab**: Switches between Pending/Completed views

### Visual Feedback
- **Buttons**: Material ripple effect on tap
- **Cards**: Slight elevation shadow
- **Dialog**: Appears with fade-in animation
- **Task Movement**: Smooth transition between tabs when toggling completion

---

## 📐 Layout Details

### Spacing
- **Card Margins**: 8px horizontal, 4px vertical
- **Search Bar Padding**: 8px all around
- **Dialog Padding**: 16px
- **Form Field Spacing**: 16px between fields
- **Icon Padding**: Standard Material padding

### Typography
- **AppBar Title**: 20px, medium weight
- **Tab Labels**: 14px
- **Task Title**: 16px, bold
- **Task Description**: 14px, normal weight
- **Dialog Title**: 20px, medium weight
- **Empty State**: 18px

### Borders
- **Search Field**: 10px border radius
- **Text Fields in Dialog**: Outlined border
- **Cards**: Default Material card elevation

---

## 🖼️ How to See the Actual UI

To see the actual running app with real UI:

1. Install Flutter SDK on your machine
2. Navigate to `flutter_todo_app` directory
3. Run `flutter pub get`
4. Run `flutter run` on your desired platform:
   - Android/iOS device or emulator
   - Chrome browser (web)
   - Desktop (Windows/macOS/Linux)

The app will launch and you'll see the actual Material Design 3 implementation with:
- Smooth animations
- Material ripple effects
- Proper shadows and elevations
- Responsive layout
- Beautiful typography

---

**Note**: This is a text-based mockup. The actual Flutter app will have much richer visuals with proper Material Design components, smooth animations, and responsive layouts that adapt to different screen sizes.
