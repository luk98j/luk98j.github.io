onmessage = function(e) {
    console.log("Lista peseli")
    var day = validateDayOrMonth(e.data.day)
    var tempMonth = addValueToMonth(e.data.year, e.data.month)
    var month = validateDayOrMonth(tempMonth)
    var year = validateYear(e.data.year);
    var correctPesels = [];
    for(var i=0; i<=99999;i++){
        var tempRest = fullFillRestOfPesel(i)
        if(checkIfPeselIsValid(year,month,day,tempRest)){
            correctPesels.push(year +""+month+""+day+""+tempRest)
        }
    }
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

function validateDayOrMonth(passNumber){
    if(passNumber.length==1){
        return 0+""+passNumber;
    } else {
        return passNumber;
    }
}

function validateYear(passNumber){
    if(passNumber.length==4){
        return passNumber.substring(2,4);
    } else if(passNumber.length ==2){
        return passNumber
    }
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

function fullFillRestOfPesel(number){
    var restOfPesel = number.toString()
    if(restOfPesel.length==1){
        return "0000"+restOfPesel
    } else if(restOfPesel.length==2){
        return "000"+restOfPesel
    }
    else if(restOfPesel.length==3){
        return "00"+restOfPesel
    }
    else if(restOfPesel.length==4){
        return "0"+restOfPesel
    } else {
        return restOfPesel
    }
}
