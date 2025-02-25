// Toggle Calculator visibility
function toggleCalculator() {
    const calculator = document.getElementById("calculator-popup");

    if (calculator.classList.contains("show")) {
        calculator.classList.remove("show");
        calculator.classList.add("hide");

        setTimeout(() => {
            calculator.style.display = "none";
        }, 300); // Ensure hiding after animation
    } else {
        calculator.style.display = "flex"; // Show the calculator

        setTimeout(() => {
            calculator.classList.remove("hide");
            calculator.classList.add("show"); // Add the show class after the display is set to flex
        }, 10); // Ensure smooth animation
    }
}

// Append the clicked value to the display
function appendCalcInput(value) {
    document.getElementById("calc-display").value += value;
}

// Clear the calculator display
function clearCalc() {
    document.getElementById("calc-display").value = "";
}

// Calculate the result
function calculateResult() {
    try {
        let expression = document.getElementById("calc-display").value;
        let result = evaluateExpression(expression);
        document.getElementById("calc-display").value = result;
    } catch (error) {
        document.getElementById("calc-display").value = "Error";
    }
}

// Tokenize the expression (split into numbers and operators)
function tokenize(expression) {
    let tokens = [];
    let num = "";

    for (let char of expression) {
        if ("0123456789.".includes(char)) {
            num += char;
        } else if ("+-*/".includes(char)) {
            if (num) tokens.push(num), num = "";
            tokens.push(char);
        }
    }

    if (num) tokens.push(num);
    return tokens;
}

// Convert infix to postfix notation
function infixToPostfix(tokens) {
    let output = [], operators = [];
    let precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else {
            while (operators.length && precedence[operators.at(-1)] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }

    return output.concat(operators.reverse());
}

// Evaluate the postfix expression
function evaluatePostfix(postfix) {
    let stack = [];

    for (let token of postfix) {
        if (!isNaN(token)) {
            stack.push(token);
        } else {
            let b = stack.pop(), a = stack.pop();
            stack.push(token === "+" ? a + b :
                      token === "-" ? a - b :
                      token === "*" ? a * b :
                      a / b);
        }
    }

    return stack[0];
}

// Evaluate the mathematical expression
function evaluateExpression(expression) {
    let tokens = tokenize(expression);
    let postfix = infixToPostfix(tokens);
    return evaluatePostfix(postfix);
}
