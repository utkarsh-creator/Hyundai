let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    slides.forEach((slide, i) => {
        slide.style.display = i === currentIndex ? 'block' : 'none';
    });
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Initialize slider
showSlide(currentIndex);
function toggleMenu() {
    var menu = document.querySelector(".nav-menu");
    menu.classList.toggle("active");
}


//Calculator

function toggleCalculator() {
    const calculator = document.getElementById("calculator-popup");

    if (calculator.classList.contains("show")) {
      
        calculator.classList.remove("show");
        calculator.classList.add("hide");

        setTimeout(() => {
            calculator.style.display = "none";
        }, 300); 
    } else {
        
        calculator.style.display = "flex";

        setTimeout(() => {
            calculator.classList.remove("hide");
            calculator.classList.add("show");
        }, 10);
    }
}


function appendCalcInput(value) {
    document.getElementById("calc-display").value += value;
}

function clearCalc() {
    document.getElementById("calc-display").value = "";
}

function calculateResult() {
    try {
        let expression = document.getElementById("calc-display").value;
        let result = evaluateExpression(expression);
        document.getElementById("calc-display").value = result;
    } catch (error) {
        document.getElementById("calc-display").value = "Error";
    }
}

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

function evaluateExpression(expression) {
    let tokens = tokenize(expression);
    let postfix = infixToPostfix(tokens);
    return evaluatePostfix(postfix);
}