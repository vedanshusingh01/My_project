# Flutter To-Do App Setup Guide

This guide will help you set up and run the Flutter To-Do List application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Flutter SDK** (version 3.0.0 or higher)
   - Download from: https://flutter.dev/docs/get-started/install
   - Follow the installation instructions for your operating system

2. **Dart SDK** (comes bundled with Flutter)

3. **An IDE** (choose one):
   - Visual Studio Code with Flutter extension
   - Android Studio with Flutter plugin
   - IntelliJ IDEA with Flutter plugin

4. **Device/Emulator**:
   - Android device/emulator
   - iOS device/simulator (macOS only)
   - Web browser (for web version)
   - Desktop environment (Windows, macOS, or Linux)

## Installation Steps

### Step 1: Verify Flutter Installation

Open a terminal and run:

```bash
flutter doctor
```

This command checks your environment and displays a report. Ensure all required dependencies are installed.

### Step 2: Navigate to Project Directory

```bash
cd flutter_todo_app
```

### Step 3: Install Dependencies

Run the following command to download all required packages:

```bash
flutter pub get
```

This will install:
- `provider`: ^6.1.1 (State management)
- `cupertino_icons`: ^1.0.2 (Icons)
- `flutter_lints`: ^3.0.0 (Linting rules)

### Step 4: Run the Application

#### For Android/iOS:

Make sure you have an emulator running or a device connected, then run:

```bash
flutter run
```

#### For Web:

```bash
flutter run -d chrome
```

#### For Desktop (Windows/macOS/Linux):

```bash
flutter run -d windows  # On Windows
flutter run -d macos    # On macOS
flutter run -d linux    # On Linux
```

### Step 5: Hot Reload (During Development)

While the app is running, you can make changes to the code and press:
- `r` - Hot reload (applies changes without losing state)
- `R` - Hot restart (restarts the app)
- `q` - Quit

## Testing

### Run All Tests

```bash
flutter test
```

### Run Tests with Coverage

```bash
flutter test --coverage
```

## Linting and Code Analysis

### Analyze Code

```bash
flutter analyze
```

This will check your code against the rules defined in `analysis_options.yaml`.

## Building for Production

### Android APK

```bash
flutter build apk --release
```

Output: `build/app/outputs/flutter-apk/app-release.apk`

### Android App Bundle (for Google Play)

```bash
flutter build appbundle --release
```

### iOS (macOS only)

```bash
flutter build ios --release
```

### Web

```bash
flutter build web --release
```

Output: `build/web/`

### Desktop

```bash
flutter build windows --release  # On Windows
flutter build macos --release    # On macOS
flutter build linux --release    # On Linux
```

## Troubleshooting

### Common Issues

1. **"flutter: command not found"**
   - Ensure Flutter is added to your PATH
   - Run: `export PATH="$PATH:`pwd`/flutter/bin"` (or add to .bashrc/.zshrc)

2. **Android licenses not accepted**
   - Run: `flutter doctor --android-licenses`
   - Accept all licenses

3. **iOS setup issues (macOS)**
   - Ensure Xcode is installed
   - Run: `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`
   - Run: `sudo xcodebuild -runFirstLaunch`

4. **Packages not downloading**
   - Clear cache: `flutter pub cache clean`
   - Try again: `flutter pub get`

5. **Build errors**
   - Clean build: `flutter clean`
   - Get packages: `flutter pub get`
   - Try building again

## Using the App

### Basic Features

1. **Add a Task**
   - Click the floating action button (+) at the bottom right
   - Enter task title and description
   - Click "Save"

2. **Edit a Task**
   - Click the edit (pencil) icon on any task
   - Modify the title or description
   - Click "Save"

3. **Delete a Task**
   - Click the delete (trash) icon on any task
   - Confirm deletion in the dialog

4. **Mark Task as Complete**
   - Click the checkbox next to the task
   - Completed tasks will be moved to the "Completed Tasks" tab
   - Click again to mark as pending

5. **Search Tasks**
   - Type in the search bar at the top
   - Tasks will filter in real-time based on title or description

6. **Switch Between Tabs**
   - Click "Pending Tasks" to see incomplete tasks
   - Click "Completed Tasks" to see completed tasks

## Architecture Overview

### State Management

The app uses **Provider** for state management:
- `TaskProvider`: Manages the global task state
- All widgets consume data from the provider
- No direct use of `setState` in the app

### Project Structure

```
lib/
├── models/
│   └── task.dart              # Task data model with JSON serialization
├── providers/
│   └── task_provider.dart     # State management logic
├── screens/
│   └── home_screen.dart       # Main screen with tabs and search
├── widgets/
│   ├── search_bar.dart        # Search input widget
│   ├── task_list.dart         # Reusable task list widget
│   └── task_dialog.dart       # Add/Edit task dialog
└── main.dart                  # App entry point
```

## Additional Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Provider Package Documentation](https://pub.dev/packages/provider)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Flutter Widget Catalog](https://flutter.dev/docs/development/ui/widgets)

## Support

For issues or questions:
1. Check the Flutter documentation
2. Visit Flutter community forums
3. Check Stack Overflow with the [flutter] tag

---

**Happy Coding! 🚀**
