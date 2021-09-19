const addition = (x, y) => {
    return x + y
}
const substraction = (x, y) => {
    return x - y
}
const multiplication = (x, y) => {
    return x * y
}
const division = (x, y) => {
    return x / y
}
const modulo = (x, y) => {
    return x % y
}
const factorial = n => {
    let answer = 1;
    if (n == 0 || n == 1) {
        return answer;
    } else {
        for (var i = n; i >= 1; i--) {
            answer = answer * i;
        }
        return answer;
    }
}
const isPrimeNumber = n => {
    for (let i = 2, s = Math.sqrt(n); i <= s; i++)
        if (n % i === 0) return false;
    return n > 1;
}
const findPrimeNumber = num => {
    let i, primes = [2, 3], n = 5;
    const isPrime = n => {
        let i = 1, p = primes[i],
            limit = Math.ceil(Math.sqrt(n));
        while (p <= limit) {
            if (n % p === 0) {
                return false;
            }
            i += 1;
            p = primes[i];
        }
        return true;
    }
    for (i = 2; i <= num; i += 1) {
        while (!isPrime(n)) {
            n += 2;
        }
        primes.push(n);
        n += 2;
    };
    return primes[num - 1];
}

exports.calculate = function(parsed){
    let result = parsed;
    let tempResult;
    const op = parsed.op;
    const x = parseInt(parsed.x);
    const y = parseInt(parsed.y);
    const n = parseInt(parsed.n);
    const equationVal = isValidEquation(parsed);

    if (equationVal.validation){
        if (op === " ")
            tempResult = addition(x, y);
        else if (op === "-")
            tempResult = substraction(x, y);
        else if (op === "*")
            tempResult = multiplication(x, y)
        else if (op === "/")
            tempResult = division(x, y)
        else if (op === "%")
            tempResult = modulo(x, y)
        else if (op === "!")
            tempResult = factorial(n)
        else if (op === "p")
            tempResult = isPrimeNumber(n)
        else if (op === "np")
            tempResult = findPrimeNumber(n)

        if (tempResult === Infinity)
            tempResult = "Infinity";
        if (isNaN(tempResult))
            tempResult = "NaN";

        result.answer = tempResult;
    }
    else {
        result.error = equationVal.errorMessage;
    }

    return result;
}

const isValidEquation = parsed => {
    const op = parsed.op
    let equationVal = {
        validation: true,
        errorMessage: " "
    }

    if(op === undefined){
        equationVal.validation = false;
        equationVal.errorMessage = "'op' parameter is required";
    }
    else {
        if (op === " " || op === "-" || op === "*" || op === "/" || op === "%"){
            if (Object.keys(parsed).length <= 3){
                if(parsed.x === undefined){
                    equationVal.validation = false;
                    equationVal.errorMessage += "'x' parameter is required, ";
                }
                else if (parsed.x === ""){
                    equationVal.validation = false;
                    equationVal.errorMessage += "'x' parameter need a value, ";
                }
                else if (isNaN(parsed.x)){
                    equationVal.validation = false;
                    equationVal.errorMessage += "'x' parameter is not a number, ";
                }
                if(parsed.y === undefined){
                    equationVal.validation = false;
                    equationVal.errorMessage += "'y' parameter is required, ";
                }
                else if (parsed.y === ""){
                    equationVal.validation = false;
                    equationVal.errorMessage += "'y' parameter need a value, ";
                }
                else if (isNaN(parsed.y)){
                    equationVal.validation = false;
                    equationVal.errorMessage += "'y' parameter is not a number, ";
                }
            }
            else {
                equationVal.validation = false;
                equationVal.errorMessage += "Too many parameters ";
            }

        }
        else if (op === "!" || op === "p" || op === "np"){
            if(parsed.n === undefined){
                equationVal.validation = false;
                equationVal.errorMessage = "'n' parameter is required";
            }
            else if (parsed.n === ""){
                equationVal.validation = false;
                equationVal.errorMessage = "'n' parameter need a value";
            }
            else if (isNaN(parsed.n)){
                equationVal.validation = false;
                equationVal.errorMessage = "'n' parameter is not a number";
            }
            else if (!Number.isInteger(parsed.n)){
                equationVal.validation = false;
                equationVal.errorMessage = "'n' need to be a whole number";
            }
        }
        else {
            equationVal.validation = false;
            equationVal.errorMessage = "'op' parameter is invalid";
            
        }   
    }
    return  equationVal// return a bool and the error message if the equation isn't valid
}

