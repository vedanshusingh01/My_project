import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/task_provider.dart';
import '../widgets/search_bar.dart' as custom;
import '../widgets/task_list.dart';
import '../widgets/task_dialog.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('To-Do List'),
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
          bottom: const TabBar(
            indicatorColor: Colors.white,
            labelColor: Colors.white,
            unselectedLabelColor: Colors.white70,
            tabs: [
              Tab(
                icon: Icon(Icons.pending_actions),
                text: 'Pending Tasks',
              ),
              Tab(
                icon: Icon(Icons.check_circle),
                text: 'Completed Tasks',
              ),
            ],
          ),
        ),
        body: Column(
          children: [
            const custom.SearchBar(),
            Expanded(
              child: TabBarView(
                children: [
                  Consumer<TaskProvider>(
                    builder: (context, provider, child) {
                      return TaskList(tasks: provider.pendingTasks);
                    },
                  ),
                  Consumer<TaskProvider>(
                    builder: (context, provider, child) {
                      return TaskList(tasks: provider.completedTasks);
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            showDialog(
              context: context,
              builder: (context) => const TaskDialog(),
            );
          },
          backgroundColor: Colors.blue,
          child: const Icon(Icons.add, color: Colors.white),
        ),
      ),
    );
  }
}
