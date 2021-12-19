const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const clear = document.querySelector('[data-clear]');
const del = document.querySelector('[data-delete]');
const equal = document.querySelector('[data-equal]');

const previousOperandTextElement = document.querySelector('[data-prev-operand-text-element]');
const currentOperandTextElement = document.querySelector('[data-current-operand-text-element]');

const outPut = document.querySelector('[data-output]');

let answer;

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
    /*just variable assigning to calculator output screen*/  
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
         this.currentOperand = '';
         this.prevOperand = '';
         this.currentOperation = undefined;
    }

    append(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand + number;
        // Here I have effective variable with right current value
    }


    updateOutputWindow(){
        this.currentOperandTextElement.innerText = this.currentOperand;    

        if(this.currentOperation != null){
            this.previousOperandTextElement.innerText = `${this.prevOperand} ${this.currentOperation}`;
        }else{
            this.previousOperandTextElement.innerText = this.prevOperand;
        }
    }

    operationSelection(operation){
        if(this.currentOperand === '') return;

        if(this.currentOperation != undefined){
            this.calculate();
        }
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
        this.currentOperation = operation;   
    }

    calculate(){
        console.log('Processing...');

        switch(this.currentOperation){ 
            case '+':
               answer = parseFloat(this.prevOperand) + parseFloat(this.currentOperand);
                break;
            case '-':
                answer = parseFloat(this.prevOperand) - parseFloat(this.currentOperand);
                break;
            case '*':
                answer = parseFloat(this.prevOperand) * parseFloat(this.currentOperand);
                break;
            case '/':
                answer = parseFloat(this.prevOperand) / parseFloat(this.currentOperand);  
            }
        this.clear();
        this.currentOperand = answer.toString();
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0,-1);
    }
}

const myCalculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


numbers.forEach( number => {
    number.addEventListener('click', () => {
        myCalculator.append(number.innerText);
        myCalculator.updateOutputWindow();
    })
})

operators.forEach( operator =>{
    operator.addEventListener('click', () => {
        myCalculator.operationSelection(operator.innerText);
        myCalculator.updateOutputWindow();
    })
});

clear.addEventListener('click',() => {
    myCalculator.clear();
    myCalculator.updateOutputWindow();
});

equal.addEventListener('click', () => {
    myCalculator.calculate();
    myCalculator.updateOutputWindow();
});

del.addEventListener('click', () => {
    myCalculator.delete();
    myCalculator.updateOutputWindow();
});
