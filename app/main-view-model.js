var Observable = require("tns-core-modules/data/observable").Observable;

var displayVal = '0';
var displayExp = '0'
var pendingVal;
var evalStringArray = [];

function createViewModel() {
    var viewModel = new Observable();
    viewModel.expression = '0';
    viewModel.result = '0';

    viewModel.nums = function(args) {
        console.log("Entered " + args.object.text);
        this.set("expression", updateExpression(args));
    }

    viewModel.clear = function(args){
        console.log("Entered " + args.object.text);
        this.set('expression', '0');
        this.set('result', clear());
    }

    viewModel.backspace = function(args){
        console.log("Entered " + args.object.text);
        this.set('expression', backspace());
    }

    viewModel.decimal = function(args){
        console.log("Entered " + args.object.text);
        this.set('expression', decimal());
    }

    viewModel.performOperation = function(args){
        console.log("Entered " + args.object.text);
        this.set('expression', performOperation(args));
    }

    viewModel.equal = function(args){
        console.log("Entered " + args.object.text);
        this.set('result', equal());
    }

    return viewModel;
}

exports.createViewModel = createViewModel;

function updateExpression(args){
    let btnText = args.object.text;
    if(displayExp === '0'){
        displayVal = '';
        displayExp = ''
    }
    displayVal += btnText;
    displayExp += btnText;
    return displayExp;
}

function clear(){
    displayVal = '0';
    displayExp = '0'
    pendingVal = undefined;
    evalStringArray = [];
    return displayExp;
}

function backspace(){
    let lengthOfDisplayExp = displayExp.length;
    displayExp = displayExp.slice(0, lengthOfDisplayExp - 1);
    if(displayExp === ''){
        displayExp = '0';
    }
    return displayExp;
}

function decimal(){
    if(!displayVal.includes('.')){
        displayVal += '.';
        displayExp += '.';
    }
    return displayExp;
}

function performOperation(args){
    let operator = args.object.text;
    switch (operator){
        case '+':
            pendingVal = displayVal;
            displayVal = '0';
            evalStringArray.push(pendingVal);
            evalStringArray.push('+');
            displayExp += '+';
            return displayExp;
        case '-':
            pendingVal = displayVal;
            displayVal = '0';
            evalStringArray.push(pendingVal);
            evalStringArray.push('-');
            displayExp += '-';
            return displayExp;
        case '×':
            pendingVal = displayVal;
            displayVal = '0';
            evalStringArray.push(pendingVal);
            evalStringArray.push('*');
            displayExp += '×';
            return displayExp;
        case '÷':
            pendingVal = displayVal;
            displayVal = '0';
            evalStringArray.push(pendingVal);
            evalStringArray.push('/');
            displayExp += '÷';
            return displayExp;
        default:
            break;
    }
}

function equal(){
    displayExp += displayVal;
    evalStringArray.push(displayVal);
    let evaluation = eval(evalStringArray.join(' '));
    displayVal = evaluation + '';
    evalStringArray = [];
    console.log(displayVal);
    return displayVal;
}
