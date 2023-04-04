import 'package:flutter/material.dart';
import 'package:math_expressions/math_expressions.dart';
import 'package:project_01/buttons.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  var userQuery = '';
  var userAnswer = '';

  final myTextStyle = TextStyle(fontSize: 30, color: Colors.red[200]);

  final List<String> buttons = [
    'AC',
    '+/-',
    '%',
    '÷',
    '7',
    '8',
    '9',
    'x',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '<',
    '=',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.red[50],
      body: Column(
        children: <Widget>[
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.all(20),
                  alignment: Alignment.centerRight,
                  child: Text(
                    userQuery,
                    style: const TextStyle(fontSize: 60),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(20),
                  alignment: Alignment.centerRight,
                  child: Text(
                    userAnswer,
                    style: const TextStyle(fontSize: 60),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            flex: 2,
            child: GridView.builder(
              itemCount: buttons.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4),
              itemBuilder: (BuildContext context, int index) {
                // Clear button
                if (index == 0) {
                  return MyButton(
                    buttonTapped: () {
                      setState(() {
                        userQuery = '';
                        userAnswer = '';
                      });
                    },
                    buttonText: buttons[index],
                    color: Colors.red[100],
                    textColor: Colors.black,
                  );
                }
                // Back button
                else if (index == buttons.length - 2) {
                  return MyButton(
                    buttonTapped: () {
                      setState(() {
                        userQuery =
                            userQuery.substring(0, userQuery.length - 1);
                      });
                    },
                    buttonText: buttons[index],
                    color: Colors.red[100],
                    textColor: Colors.black,
                  );
                }
                // Equal button
                else if (index == buttons.length - 1) {
                  return MyButton(
                    buttonTapped: () {
                      setState(() {
                        evaluate();
                      });
                    },
                    buttonText: buttons[index],
                    color: Colors.red[100],
                    textColor: Colors.black,
                  );
                }
                // Rest of the buttons
                else {
                  return MyButton(
                    buttonTapped: () {
                      setState(() {
                        userQuery += buttons[index];
                      });
                    },
                    buttonText: buttons[index],
                    color: isDigit(buttons[index])
                        ? Colors.white
                        : Colors.red[100],
                    textColor: Colors.black,
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }

  bool isDigit(String x) {
    if (x == '0' ||
        x == '1' ||
        x == '2' ||
        x == '3' ||
        x == '4' ||
        x == '5' ||
        x == '6' ||
        x == '7' ||
        x == '8' ||
        x == '9') {
      return true;
    }
    return false;
  }

  void evaluate() {
    String finalQuestion = userQuery;
    finalQuestion = finalQuestion.replaceAll('x', '*');
    finalQuestion = finalQuestion.replaceAll('÷', '/');
    Parser p = Parser();
    Expression exp = p.parse(finalQuestion);
    ContextModel cm = ContextModel();

    // Evaluate userQuery:
    double eval = exp.evaluate(EvaluationType.REAL, cm);

    userAnswer = eval.toString();
  }

  void clear() {
    userQuery = '';
  }
}
