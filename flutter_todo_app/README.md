# Flutter To-Do List App

A Flutter application for managing tasks with Provider state management.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Each task has a title, description, and completion status
- ✅ Provider for state management (instead of setState)
- ✅ Two tabs: Pending Tasks and Completed Tasks
- ✅ Search bar to filter tasks by title or description
- ✅ Toggle task completion status
- ✅ Confirmation dialog before deleting tasks

## Getting Started

### Prerequisites

- Flutter SDK (3.0.0 or higher)
- Dart SDK

### Installation

1. Clone the repository
2. Navigate to the flutter_todo_app directory:
   ```bash
   cd flutter_todo_app
   ```

3. Install dependencies:
   ```bash
   flutter pub get
   ```

4. Run the app:
   ```bash
   flutter run
   ```

## Project Structure

```
lib/
├── models/
│   └── task.dart              # Task data model
├── providers/
│   └── task_provider.dart     # State management with Provider
├── screens/
│   └── home_screen.dart       # Main screen with tabs
├── widgets/
│   ├── search_bar.dart        # Search functionality
│   ├── task_list.dart         # Task list display
│   └── task_dialog.dart       # Add/Edit task dialog
└── main.dart                  # App entry point
```

## State Management

This app uses the **Provider** package for state management. The `TaskProvider` class manages:
- Task list
- CRUD operations (Create, Read, Update, Delete)
- Search/filter functionality
- Task completion toggling

## Usage

1. **Add a Task**: Tap the floating action button (+) to add a new task
2. **Edit a Task**: Tap the edit icon on any task
3. **Delete a Task**: Tap the delete icon and confirm
4. **Complete a Task**: Tap the checkbox to mark as complete/incomplete
5. **Search Tasks**: Use the search bar to filter tasks by title or description
6. **View Tasks**: Switch between Pending and Completed tabs

## Dependencies

- `flutter`: SDK
- `provider`: ^6.1.1 - State management
- `cupertino_icons`: ^1.0.2 - iOS style icons

## License

This project is open source and available under the MIT License.
