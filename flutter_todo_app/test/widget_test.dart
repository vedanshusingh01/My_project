import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_todo_app/models/task.dart';
import 'package:flutter_todo_app/providers/task_provider.dart';

void main() {
  group('Task Model Tests', () {
    test('Task should be created with correct properties', () {
      final task = Task(
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
      );

      expect(task.id, '1');
      expect(task.title, 'Test Task');
      expect(task.description, 'Test Description');
      expect(task.isCompleted, false);
    });

    test('Task copyWith should work correctly', () {
      final task = Task(
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
      );

      final updatedTask = task.copyWith(title: 'Updated Task');

      expect(updatedTask.title, 'Updated Task');
      expect(updatedTask.description, 'Test Description');
      expect(updatedTask.id, '1');
    });

    test('Task toJson and fromJson should work correctly', () {
      final task = Task(
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        isCompleted: true,
      );

      final json = task.toJson();
      final fromJsonTask = Task.fromJson(json);

      expect(fromJsonTask.id, task.id);
      expect(fromJsonTask.title, task.title);
      expect(fromJsonTask.description, task.description);
      expect(fromJsonTask.isCompleted, task.isCompleted);
    });
  });

  group('TaskProvider Tests', () {
    test('Should add task correctly', () {
      final provider = TaskProvider();
      final task = Task(
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
      );

      provider.addTask(task);

      expect(provider.tasks.length, 1);
      expect(provider.tasks.first.title, 'Test Task');
    });

    test('Should delete task correctly', () {
      final provider = TaskProvider();
      final task = Task(
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
      );

      provider.addTask(task);
      expect(provider.tasks.length, 1);

      provider.deleteTask('1');
      expect(provider.tasks.length, 0);
    });

    test('Should update task correctly', () {
      final provider = TaskProvider();
      final task = Task(
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
      );

      provider.addTask(task);

      final updatedTask = task.copyWith(title: 'Updated Task');
      provider.updateTask('1', updatedTask);

      expect(provider.tasks.first.title, 'Updated Task');
    });

    test('Should toggle task completion correctly', () {
      final provider = TaskProvider();
      final task = Task(
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
      );

      provider.addTask(task);
      expect(provider.tasks.first.isCompleted, false);

      provider.toggleTaskCompletion('1');
      expect(provider.tasks.first.isCompleted, true);

      provider.toggleTaskCompletion('1');
      expect(provider.tasks.first.isCompleted, false);
    });

    test('Should filter pending and completed tasks correctly', () {
      final provider = TaskProvider();

      final task1 = Task(
        id: '1',
        title: 'Pending Task',
        description: 'This is pending',
      );

      final task2 = Task(
        id: '2',
        title: 'Completed Task',
        description: 'This is completed',
        isCompleted: true,
      );

      provider.addTask(task1);
      provider.addTask(task2);

      expect(provider.pendingTasks.length, 1);
      expect(provider.completedTasks.length, 1);
      expect(provider.pendingTasks.first.title, 'Pending Task');
      expect(provider.completedTasks.first.title, 'Completed Task');
    });

    test('Should search tasks correctly', () {
      final provider = TaskProvider();

      final task1 = Task(
        id: '1',
        title: 'Flutter Development',
        description: 'Build a Flutter app',
      );

      final task2 = Task(
        id: '2',
        title: 'React Development',
        description: 'Build a React app',
      );

      provider.addTask(task1);
      provider.addTask(task2);

      provider.setSearchQuery('Flutter');

      expect(provider.pendingTasks.length, 1);
      expect(provider.pendingTasks.first.title, 'Flutter Development');

      provider.setSearchQuery('app');
      expect(provider.pendingTasks.length, 2);

      provider.setSearchQuery('');
      expect(provider.pendingTasks.length, 2);
    });
  });
}
