const prevScreen=document.querySelector("#previousScreen");
const currentScreen=document.querySelector("#currentScreen");
const operators=document.querySelectorAll(".operators");
const numbers=document.querySelectorAll(".numbers");
const equalsButton=document.querySelector("#equals");
const deleteButton=document.querySelector("#delete");
const clearButton=document.querySelector("#clear");
const percentButton=document.querySelector("#percent");
const signButton=document.querySelector("#sign");

// class //
class Calculator{
    constructor(prevScreen, currentScreen){
        this.prevScreen=prevScreen;
        this.currentScreen=currentScreen;
        this.clear();
    }
    clear(){
        this.prevOperand="";
        this.currentOperand="";
        this.operator="";
    }
    appendNumber(number){
        if((number==="." && this.currentScreen.textContent.includes(".")) || this.currentScreen.textContent.length>16) return;
        this.currentOperand+=number;
    }
    chooseOperator(operator){
        if(this.currentOperand==="")
            return;
        if(this.operator!=="")
            this.compute();
        this.operator=operator;
        this.prevOperand=this.currentOperand;
        this.currentOperand="";
    }
    getDisplayNumber(number){
        let wholePart=number.split(".")[0];
        let decimalPart=number.split(".")[1];
        if(wholePart==="-"){
        }
        else if(isNaN(parseFloat(wholePart)) ){
            wholePart="";
        }
        else{
            wholePart=parseFloat(wholePart).toLocaleString("en");
        }
        if(decimalPart!==undefined){
            return `${wholePart}.${decimalPart}`;
        }
        else{
            return `${wholePart}`;
        }
    }
    updateDisplay(){
        this.currentScreen.textContent=this.getDisplayNumber(this.currentOperand);
        this.prevScreen.textContent=`${this.getDisplayNumber(this.prevOperand)} ${this.operator}`;
    }
    compute(){
        let result;
        if(this.prevOperand==="" || this.currentOperand==="")
            return;
        switch(this.operator){
            case "+":
                result=Number(this.prevOperand)+Number(this.currentOperand);
                break;
            case "-":
                result=Number(this.prevOperand)-Number(this.currentOperand);
                break;
            case "×":
                result=Number(this.prevOperand)*Number(this.currentOperand);
                break;
            case "÷":
                result=Number(this.prevOperand)/Number(this.currentOperand);
                break;
            default:
                return;
        }
        result=this.adjustLength(result)
        this.currentOperand=result;
        this.operator="";
        this.prevOperand="";
    }
    delete(){
        this.currentOperand=this.currentOperand.slice(0, -1);
    }

    adjustLength(str){
        let whole;
        str=""+str;
        if(str.length>12){
            if (str.indexOf(".") !== -1){
                whole = str.substring(0, str.indexOf("."));
            } else{
                whole = str;
            }
            let rounding=(11-whole.length<0) ? 0 : (11-whole.length);
            str=Number(str).toFixed(rounding);
            str=""+str;
            if(str.length>12){
                str=Number(str).toExponential();
                if(str.length>12){
                    let first=str.substring(0, str.indexOf("e"));
                    let second=str.substring(str.indexOf("e"));
                    first=Number(first).toFixed(10-second.length);
                    str=""+first+second;
                }
            }
        }
        return str;
    }
    
    percentOperation(){
        if(this.currentOperand!=="") 
            this.currentOperand = `${this.adjustLength(Number(this.currentOperand)/100)}`;
    }

    changeSign(){
        if(this.currentOperand==="-")
            this.currentOperand="";
        else if(this.currentOperand!=="") 
            this.currentOperand = `${this.adjustLength(Number(this.currentOperand)*(-1))}`;
        else
            this.currentOperand="-";
    }
    keyboardSign(){
        if(this.currentOperand==="")
            this.currentOperand="-";
        else
            this.chooseOperator("-");
    }


}
// class //



const calculator=new Calculator(prevScreen, currentScreen);
numbers.forEach((number)=>{
    number.addEventListener("click", ()=>{
        calculator.appendNumber(number.textContent);
        calculator.updateDisplay();
    });
});

operators.forEach((operator)=>{
    operator.addEventListener("click", ()=>{
        calculator.chooseOperator(operator.textContent);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", ()=>{
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener("click", () =>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", ()=>{
    calculator.delete();
    calculator.updateDisplay();
});

percentButton.addEventListener("click", ()=>{
    calculator.percentOperation();
    calculator.updateDisplay();
});

signButton.addEventListener("click", ()=>{
    calculator.changeSign();
    calculator.updateDisplay();
});



const arrNums=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"];
const arrOpers=["+", "-", "*", "/"];
document.addEventListener("keydown", (event)=>{
    if(arrNums.includes(event.key)){
        if(event.key=="-")
            calculator.keyboardSign();
        else
            calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    else if(arrOpers.includes(event.key)){
        let oper=(event.key==="/") ? "÷": (event.key==="*") ? "×" : event.key;
        calculator.chooseOperator(oper);
        calculator.updateDisplay();
    }
    else if(event.key==="=" || event.key==="Enter"){
        calculator.compute();
        calculator.updateDisplay();
    }
    else if(event.key==="Escape"){
        calculator.clear();
        calculator.updateDisplay();
    }
    else if(event.key==="Backspace"){
        calculator.delete();
        calculator.updateDisplay();
    }
    else if(event.key==="%"){
        calculator.percentOperation();
        calculator.updateDisplay();
    }
});
