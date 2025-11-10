# Flutter To-Do App - Features & Architecture

## 📱 Application Features

### Core Functionality
✅ **Task Management**
- Create new tasks with title and description
- Edit existing tasks
- Delete tasks with confirmation dialog
- Mark tasks as complete/incomplete

✅ **State Management**
- Uses Provider package (no setState)
- Centralized state in TaskProvider
- Reactive UI updates

✅ **User Interface**
- Two-tab layout (Pending/Completed)
- Search bar for filtering tasks
- Floating action button for adding tasks
- Material Design 3 styling

✅ **Search & Filter**
- Real-time search as you type
- Searches both title and description
- Works across all task states

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        MyApp                            │
│                (ChangeNotifierProvider)                 │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │              TaskProvider                         │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ State:                                      │ │ │
│  │  │  - List<Task> _tasks                        │ │ │
│  │  │  - String _searchQuery                      │ │ │
│  │  ├─────────────────────────────────────────────┤ │ │
│  │  │ Getters:                                    │ │ │
│  │  │  - pendingTasks                             │ │ │
│  │  │  - completedTasks                           │ │ │
│  │  │  - searchQuery                              │ │ │
│  │  ├─────────────────────────────────────────────┤ │ │
│  │  │ Methods:                                    │ │ │
│  │  │  - addTask()                                │ │ │
│  │  │  - updateTask()                             │ │ │
│  │  │  - deleteTask()                             │ │ │
│  │  │  - toggleTaskCompletion()                   │ │ │
│  │  │  - setSearchQuery()                         │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────┘ │
│                          │                              │
│                          ▼                              │
│  ┌───────────────────────────────────────────────────┐ │
│  │              HomeScreen                           │ │
│  │        (DefaultTabController)                     │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │  AppBar with TabBar                         │ │ │
│  │  │   - Pending Tasks                           │ │ │
│  │  │   - Completed Tasks                         │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │  SearchBar Widget                           │ │ │
│  │  │   (filters tasks in real-time)              │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │  TabBarView                                 │ │ │
│  │  │  ┌──────────────┐  ┌──────────────┐        │ │ │
│  │  │  │ TaskList     │  │ TaskList     │        │ │ │
│  │  │  │ (pending)    │  │ (completed)  │        │ │ │
│  │  │  └──────────────┘  └──────────────┘        │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │  FloatingActionButton                       │ │ │
│  │  │   (opens TaskDialog)                        │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    Widgets                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  TaskList Widget                                        │
│  ├─ Displays list of tasks                             │
│  ├─ Each task shows: title, description, checkbox      │
│  ├─ Edit and Delete buttons                            │
│  └─ Consumer<TaskProvider> for reactivity              │
│                                                         │
│  TaskDialog Widget                                      │
│  ├─ Add or Edit mode                                   │
│  ├─ Form validation                                    │
│  ├─ Title and Description fields                       │
│  └─ Save/Cancel actions                                │
│                                                         │
│  SearchBar Widget                                       │
│  ├─ TextField for search input                         │
│  ├─ Calls setSearchQuery() on change                   │
│  └─ Triggers provider update                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

### Adding a Task
```
User clicks FAB (+)
    ↓
TaskDialog opens (empty)
    ↓
User enters title & description
    ↓
User clicks "Save"
    ↓
TaskProvider.addTask() called
    ↓
Task added to _tasks list
    ↓
notifyListeners() called
    ↓
UI rebuilds automatically
    ↓
Task appears in Pending tab
```

### Editing a Task
```
User clicks Edit icon
    ↓
TaskDialog opens (pre-filled with task data)
    ↓
User modifies title/description
    ↓
User clicks "Save"
    ↓
TaskProvider.updateTask() called
    ↓
Task updated in _tasks list
    ↓
notifyListeners() called
    ↓
UI rebuilds with updated task
```

### Deleting a Task
```
User clicks Delete icon
    ↓
Confirmation dialog appears
    ↓
User confirms deletion
    ↓
TaskProvider.deleteTask() called
    ↓
Task removed from _tasks list
    ↓
notifyListeners() called
    ↓
UI rebuilds without the task
```

### Toggling Completion
```
User clicks checkbox
    ↓
TaskProvider.toggleTaskCompletion() called
    ↓
Task.isCompleted toggled
    ↓
notifyListeners() called
    ↓
UI rebuilds
    ↓
Task moves between Pending/Completed tabs
```

### Searching Tasks
```
User types in search bar
    ↓
onChanged callback triggered
    ↓
TaskProvider.setSearchQuery() called
    ↓
_searchQuery updated
    ↓
notifyListeners() called
    ↓
Getters (pendingTasks/completedTasks) filter based on query
    ↓
UI rebuilds with filtered results
```

---

## 🔧 Key Components

### Task Model (`models/task.dart`)
```dart
class Task {
  final String id;           // Unique identifier
  String title;              // Task title
  String description;        // Task description
  bool isCompleted;          // Completion status
  
  // Methods: copyWith(), toJson(), fromJson()
}
```

### TaskProvider (`providers/task_provider.dart`)
```dart
class TaskProvider extends ChangeNotifier {
  List<Task> _tasks;         // All tasks
  String _searchQuery;       // Current search query
  
  // Getters:
  - tasks: All tasks
  - pendingTasks: Filtered incomplete tasks
  - completedTasks: Filtered complete tasks
  
  // Methods:
  - addTask(): Add new task
  - updateTask(): Update existing task
  - deleteTask(): Remove task
  - toggleTaskCompletion(): Toggle isCompleted
  - setSearchQuery(): Update search filter
}
```

---

## 🎨 UI Components

### HomeScreen
- **AppBar**: Title and TabBar (Pending/Completed)
- **SearchBar**: Real-time task filtering
- **TabBarView**: Two TaskList widgets (one per tab)
- **FloatingActionButton**: Opens TaskDialog for adding tasks

### TaskList Widget
- **ListView.builder**: Efficiently renders task list
- **Card**: Contains each task
- **ListTile**: Displays task info
  - **Checkbox**: Toggle completion
  - **Title**: Task title (with strikethrough if completed)
  - **Subtitle**: Task description (with strikethrough if completed)
  - **Edit Icon**: Opens TaskDialog for editing
  - **Delete Icon**: Shows confirmation dialog

### TaskDialog Widget
- **Form**: Validates input
- **TextFormField** (Title): Required field
- **TextFormField** (Description): Required, multi-line
- **Actions**: Cancel and Save buttons

---

## 🧪 Testing Coverage

### Unit Tests (`test/widget_test.dart`)

**Task Model Tests:**
- ✅ Task creation with correct properties
- ✅ copyWith() method
- ✅ JSON serialization/deserialization

**TaskProvider Tests:**
- ✅ Add task
- ✅ Delete task
- ✅ Update task
- ✅ Toggle completion
- ✅ Filter pending/completed tasks
- ✅ Search functionality

---

## 🚀 Performance Optimizations

1. **Provider Pattern**: Only rebuilds widgets that consume changed data
2. **Consumer Widgets**: Granular control over what rebuilds
3. **const Constructors**: Prevents unnecessary widget rebuilds
4. **ListView.builder**: Lazy loading for large lists
5. **Efficient Filtering**: Filters computed on-demand via getters

---

## 📦 Dependencies

```yaml
dependencies:
  flutter: sdk: flutter
  provider: ^6.1.1         # State management
  cupertino_icons: ^1.0.2  # iOS-style icons

dev_dependencies:
  flutter_test: sdk: flutter
  flutter_lints: ^3.0.0    # Linting rules
```

---

## 🎯 Future Enhancements (Optional)

- [ ] Persistent storage (SQLite, Hive, or SharedPreferences)
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Priority levels
- [ ] Dark mode
- [ ] Animations and transitions
- [ ] Task sorting options
- [ ] Export/Import tasks
- [ ] Task statistics and analytics
- [ ] Undo/Redo functionality

---

## 📝 Notes

- **No setState**: All state management handled via Provider
- **Reactive UI**: UI automatically updates when state changes
- **Clean Architecture**: Separation of concerns (models, providers, widgets, screens)
- **Material Design 3**: Modern, beautiful UI
- **Type Safety**: Full Dart type safety throughout
- **Testable**: Easy to unit test with Provider pattern

---

**Built with ❤️ using Flutter and Provider**
