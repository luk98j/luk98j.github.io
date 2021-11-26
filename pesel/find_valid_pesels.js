onmessage = function(e) {
    console.log("Generowanie")
    var restOfPesel =  e.data.restOfPesel;
    var correctPesels = [];
    var date = new Date(1930,0,1);
    var year;
    var day;
    var month;
    while(date.getFullYear()!=2050){
        month = validateDayOrMonth(addValueToMonth(date.getFullYear(), date.getMonth()+1))
        day = validateDayOrMonth(date.getDate())
        year = validateYear(date.getFullYear())
        if(checkIfPeselIsValid(year, month, day, restOfPesel)){
            console.log(year +""+month+""+day+""+restOfPesel)
            correctPesels.push(year +""+month+""+day+""+restOfPesel)
        }
        date.setDate(date.getDate() + 1)
    }
    console.log(correctPesels)
    postMessage(correctPesels);
}

function checkIfPeselIsValid(year, month, day, restOfPesel){
    var pesel = year +""+month+""+day+""+restOfPesel;
    var weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    var sum = 0;
    var controlNumber = parseInt(pesel.substring(10, 11));

    for (var i = 0; i < weight.length; i++) {
        sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    return (10 - sum) % 10 === controlNumber;
}

function addValueToMonth(year, month){
    if(year>=1900 && year<=1999){
        return month
    } else if(year>=1800 && year<=1899){
        return month + 80
    } else if(year>=2000 && year<=2099){
        return month+20
    } else if(year>=2100 && year <= 2199){
        return month+40
    } else if(year>=2200 && year <= 2299){
        return month+60
    } else{
        return month
    }
}
function validateDayOrMonth(passNumber){
    var number = passNumber.toString()
    if(number.length==1){
        return 0+""+number;
    } else {
        return number;
    }
}

function validateYear(passNumber){
    var number = passNumber.toString();
    if(number.length==4){
        return number.substring(2,4);
    } else if(number.length ==2){
        return number
    }
}