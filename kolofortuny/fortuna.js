var game = {
  points : 0,
  life : 5,
}

var words = {
  actualWord: [],
  listOfCountries: [],
  whatLeftToGuess: [],
}

document.getElementById("playGame").addEventListener("click", startGame); 
document.getElementById("getInfoAboutAuthor").addEventListener("click", getInfoAboutAuthor); 
document.getElementById("closeInfoAboutAuthor").addEventListener("click",closeInfoAboutAuthor)
document.getElementById("closeInfoGame").addEventListener("click",closeTheEnd)
document.getElementById("setLetter").addEventListener("click",checkLetter)
document.getElementById("userLetter").addEventListener("keyup",verifyLetter)


function startGame(){
  loadAllCountires();
  returnWord();
  creatLifeAndPoints()
  document.getElementById("gamePanel").style.display = 'block'
  document.getElementById("playGame").disabled = true;
}

function endGame(){
  document.getElementById("playGame").disabled = false;
  document.getElementById("infoAboutGame").innerHTML = game.points;
  document.getElementById("theEnd").style.display = 'block'
  document.getElementById("gamePanel").style.display = 'none'
}

function loadAllCountires(){
  words.listOfCountries  = Array.from(data);
}

function creatLifeAndPoints(){
  var lifeElement = document.getElementById("life");
  var pointsElement = document.getElementById("points");
  lifeElement.style.display = "block"
  pointsElement.style.display = "block"
  game.life = 5;
  game.points = 0;
  document.getElementById("lifeNumber").innerHTML = game.life;
  document.getElementById("pointNumber").innerHTML = game.points;
}

function addPoints(){
  game.points += 10;
  document.getElementById("pointNumber").innerHTML = game.points;
}

function removeLifes(){
  game.life = game.life - 1;
  document.getElementById("lifeNumber").innerHTML = game.life;
}

function addLifes(){
  game.life += 5;
  document.getElementById("lifeNumber").innerHTML = game.life;
}

function returnWord(){
  var randomNumber = getRandomInt(0,words.listOfCountries.length)
  words.actualWord = Array.from(words.listOfCountries[randomNumber]['country'].toUpperCase());
  words.listOfCountries.splice(randomNumber,1);
  words.whatLeftToGuess = whatIsNeededToGuess(words.actualWord)
  document.getElementById("drawnWord").innerHTML = returnFloors(words.actualWord);
}

function returnFloors(word){
  var returnFloors = "";
  for(var i = 0; i < word.length; i++){
    if(isLetter(word[i])){
      if(isLetterInArray(word[i])){
        returnFloors += '<div class="card">_</div>';
      } else {
        returnFloors += '<div class="card">' + word[i] + '</div>';
      }
    }
    else {
      if(word[i] == " "){
        returnFloors += '<br>'
      } else {
        returnFloors += '<div class="card">' + word[i] + '</div>';
      }
    }
  }
  return returnFloors;
}

function checkGame(){
  if(words.whatLeftToGuess.length==0){
    window.alert("Brawo! Gramy dalej!")
    addLifes()
    returnWord()
  }
  if(game.life===0){
    endGame()
  }
}

function checkLetter(){
  var letter = document.getElementById("userLetter").value.toUpperCase();
  if(letter.length==0 || !isLetter(letter)){
    window.alert("Niepoprawne dane!")
  } else {
    if(isLetterInArray(letter)){
      words.whatLeftToGuess =  words.whatLeftToGuess.filter(function(value, index, arr){ 
        return value != letter
      });
      console.log(words.whatLeftToGuess)
      document.getElementById("drawnWord").innerHTML = returnFloors(words.actualWord);
      addPoints()
    } else {
      removeLifes()
    }
  checkGame()
  }
  document.getElementById("userLetter").value = "";
}


function isLetterInArray(char){
  for(var i=0;i<words.whatLeftToGuess.length;i++){
    if(char === words.whatLeftToGuess[i]){
      return true;
      break;
    }
  }
}

function whatIsNeededToGuess(word){
  var array = word.filter((c, index) => {
    if(isLetter(c)){
      return word.indexOf(c) === index;
    }
    });
  return array;
}




function verifyLetter(){
  var letter = document.getElementById("userLetter").value;
  var button = document.getElementById("setLetter");
  if(letter.length>1){
    window.alert("Za dużo liter! Wprowadz tylko jedna!")
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function isLetter(str) {
  return str.length === 1 && str.match(/[A-Z]/i);
}

function getInfoAboutAuthor(){
  document.getElementById("authorInfo").style.display = 'block'
}

function closeInfoAboutAuthor(){
  document.getElementById("authorInfo").style.display = 'none'
}

function closeTheEnd(){
  document.getElementById("theEnd").style.display = 'none'
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
