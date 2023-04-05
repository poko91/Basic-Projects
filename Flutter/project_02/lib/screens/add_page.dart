import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:project_02/services/todo_service.dart';
import '../utils/snackbar_helper.dart';

class AddTodoPage extends StatefulWidget {
  final Map? todo;
  const AddTodoPage({
    super.key,
    this.todo,
  });

  @override
  State<AddTodoPage> createState() => _AddTodoPageState();
}

class _AddTodoPageState extends State<AddTodoPage> {
  TextEditingController titleController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  bool isEdit = false;

  @override
  void initState() {
    super.initState();
    final todo = widget.todo;
    if (todo != null) {
      isEdit = true;
      final title = todo['title'];
      final description = todo['description'];
      titleController.text = title;
      descriptionController.text = description;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          isEdit ? 'Edit Todo' : 'Add Todo',
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          TextField(
            controller: titleController,
            decoration: const InputDecoration(hintText: 'Title'),
          ),
          TextField(
            controller: descriptionController,
            decoration: const InputDecoration(hintText: 'Description'),
            keyboardType: TextInputType.multiline,
            minLines: 5,
            maxLines: 8,
          ),
          const SizedBox(
            height: 20,
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.teal[400],
              foregroundColor: Colors.black,
            ),
            onPressed: isEdit ? updateData : submitData,
            child: Padding(
              padding: const EdgeInsets.all(10),
              child: Text(
                isEdit ? 'Update' : 'Submit',
                style: const TextStyle(fontSize: 18),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> updateData() async {
    // Get the data from form
    final todo = widget.todo;
    if (todo == null) {
      print('Task does not exist');
      return;
    }
    final id = todo['_id'];

    // Submit updated data to Server
    final isSuccess = await TodoService.updateTodo(id, body);

    // show success or fail message based on status
    if (isSuccess) {
      titleController.text = '';
      descriptionController.text = '';
      showSuccessMessage(context, message: 'Task updated successfully!');
    } else {
      showErrorMessage(context, message: 'Failed to update task');
    }
  }

  Future<void> submitData() async {
    // Submit data to Server
    final isSuccess = await TodoService.addTodo(body);

    // show success or fail message based on status
    if (isSuccess) {
      titleController.text = '';
      descriptionController.text = '';
      showSuccessMessage(context, message: 'Task created successfully!');
    } else {
      showErrorMessage(context, message: 'Failed to create task');
    }
  }

  Map get body {
    final title = titleController.text;
    final description = descriptionController.text;
    return {"title": title, "description": description, "is_completed": false};
  }
}
