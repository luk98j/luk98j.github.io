
document.getElementById("validatePesel").addEventListener("click", validatePesel); 
document.getElementById("generatePesel").addEventListener("click", generatePesel); 
document.getElementById("findValidatePesel").addEventListener("click", findValidatePesel); 

function validatePesel(){
    var peselIsOK = document.getElementById("peselIsOK");
    peselIsOK.style.display = "none";
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var restOfPesel = document.getElementById("restOfPesel").value;
    var isValidDMY = validateNumbersWithoutRestOfPesel(day,month,year)
    var isValidRestOfPesel = validateRestOfPesel(restOfPesel)
    if(isValidDMY && isValidRestOfPesel){
        var worker = new Worker('validate_one_pesel.js');
        worker.onmessage = receivedWorkerMessageAboutPeselValidation
        worker.postMessage(
            {
            year: year,
            month: month,
            day: day,
            restOfPesel: restOfPesel
            }
        )
    } 
    
}

function receivedWorkerMessageAboutPeselValidation(event) {   
    var peselIsOK = document.getElementById("peselIsOK");
    peselIsOK.style.display = "block"
    var text = "<b>Walidacja twojego numeru:</b> <br>";
    if(event.data){
        text += "Twój pesel jest poprawny"
    } else {
        text += "Twój pesel jest niepoprawny"
    }
    peselIsOK.innerHTML = text;
}

function generatePesel(){
    var allPesels = document.getElementById("allPesels");
    allPesels.style.display = "none";
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var isValid = validateNumbersWithoutRestOfPesel(day,month,year)
    if(isValid){
        var worker = new Worker('show_all_pesels.js');
        worker.onmessage = receivedWorkerMessageAllPesels
        worker.postMessage(
            {
            year: year,
            month: month,
            day: day,
            }
        )
    }
}

function receivedWorkerMessageAllPesels(event) {
    var allPesels = document.getElementById("allPesels");
    var stringPesels = event.data.toString();
    var pesels = "<b>Numery Pesel dla wprowadzonych danych (Rok, miesiac, dzien):</b> <br>";
    pesels += stringPesels.replaceAll(',','<br/>')
    allPesels.style.display = "block"
    allPesels.innerHTML = pesels;
}

function findValidatePesel(){
    var allPesels = document.getElementById("peselsFromRest");
    allPesels.style.display = "none";
    var restOfPesel = document.getElementById("restOfPesel").value;
    var isValidRestOfPesel = validateRestOfPesel(restOfPesel)
    if(isValidRestOfPesel){
        var worker = new Worker('find_valid_pesels.js');
        worker.onmessage = receivedWorkerMessageAllPeselsFromRestOfPesel
        worker.postMessage(
            {
                restOfPesel: restOfPesel
            }
        )
    }
}

function receivedWorkerMessageAllPeselsFromRestOfPesel(event) {
    var allPesels = document.getElementById("peselsFromRest");
    var stringPesels = event.data.toString();
    var pesels = "<b>Numery Pesel dla wprowadzonych danych (ostatnie 5 liczb):</b> <br>";
    pesels += stringPesels.replaceAll(',','<br/>')
    allPesels.style.display = "block"
    allPesels.innerHTML = pesels;
}

function validateNumbersWithoutRestOfPesel(day,month,year){
    if(day==0 || day<1 || day > 31 || day.length<1 || day.length>2){
        alert("Please correct the day")
        return false;
    }
    if(month==0 || month<1 || month > 12 || month.length<1 || month.length>2){
        alert("Please correct the month")
        return false;
    }
    if(year.length!=4){
        alert("Please correct the year")
        return false;
    }
    return true;
}

function validateRestOfPesel(restOfPesel){
    if(restOfPesel.length!=5){
        alert("Please correct the last 5 number of Pesel")
        return false;
    }
    return true;
}

