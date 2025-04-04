document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");
    const historyToggle = document.getElementById("history-toggle");
    const clearHistoryBtn = document.getElementById("clear-history");
    const historyContainer = document.getElementById("history-container");
    const historyList = document.getElementById("history-list");

    // Variable para almacenar la operación actual
    let currentOperation = ""; 

    // Mostrar el historial de operaciones
    historyToggle.addEventListener("click", () => {
        historyContainer.style.display = historyContainer.style.display === "none" ? "block" : "none";
        displayHistory();
    });

    // Borrar el historial
    clearHistoryBtn.addEventListener("click", () => {
        localStorage.removeItem("history");
        displayHistory();
    });

    // Función para añadir un valor a la operación actual
    function appendValue(value) {
        currentOperation += value;
        display.value = currentOperation;
    }

    // Función para borrar la pantalla
    function clearDisplay() {
        currentOperation = "";
        display.value = "";
    }

    // Función para borrar el último carácter
    function deleteLast() {
        currentOperation = currentOperation.slice(0, -1);
        display.value = currentOperation;
    }

    // Función para calcular la operación
    function calculate() {
        try {
            // Maneja el evento en el que se presiona igual (=) sin operación
            if (currentOperation === "") return;
            const result = eval(currentOperation);
            display.value = result;
            saveToHistory(`${currentOperation} = ${result}`); // Guardar operación en el historial
            currentOperation = result.toString();
        } catch (error) {
            display.value = "Error";
            // La operación se resetea en caso de error
            currentOperation = "";
        }
    }

    // Guardar la operación en el historial usando el localStorage
    function saveToHistory(operation) {
        let history = JSON.parse(localStorage.getItem("history")) || [];
        history.push(operation); // Guardar operación con el resultado
        localStorage.setItem("history", JSON.stringify(history));
    }

    // Mostrar el historial
    function displayHistory() {
        let history = JSON.parse(localStorage.getItem("history")) || [];
        historyList.innerHTML = ""; // Limpiar historial antes de mostrar
        history.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            historyList.appendChild(li);
        });
    }

    // Función para calcular el factorial
    function calculateFactorial() {
        const num = parseInt(display.value);
        if (num >= 0) {
            display.value = factorial(num);
            saveToHistory(`${currentOperation} = ${display.value}`);
            currentOperation = ""; // Limpiar la operación después de calcular
        } else {
            display.value = "Error";
        }
    }

    // Cálculo del factorial
    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Función que garantiza que los eventos click on button de borrar historial y/o
    // mostrar historial no afectan los valores del input
    function noCalculate() {
        display.value = appendValue(value);
    }

    // Añadir evento para los botones
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.dataset.value;
            const action = button.dataset.action;

            if (action === "clear") clearDisplay();
            else if (action === "back") deleteLast();
            else if (action === "calculate") calculate();
            else if (action === "factorial") calculateFactorial();
            else if (action === "none") noCalculate();
            else appendValue(value);
        });
    });
});

