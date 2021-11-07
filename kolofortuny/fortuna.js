
var game = {
  points : 0,
  life : 5,
}

var words = {
  actualWorld: "",
  listOfCountries: [],
}
window.addEventListener("load", function(){
  addElement("wrap");
  
});

//LISTENERS
document.getElementById("playGame").addEventListener("click", startGame); 
document.getElementById("getInfoAboutAuthor").addEventListener("click", getInfoAboutAuthor); 
document.getElementById("closeInfoAboutAuthor").addEventListener("click",closeInfoAboutAuthor)
document.getElementById("setLetter").addEventListener("click",checkLetter)
//FUNKCJE

function startGame(){
  returnWord();
  document.getElementById("userLetter").style.display = 'block'
  document.getElementById("setLetter").style.display = 'block'
  creatLifeAndPoints()
  document.getElementById("playGame").disabled = true;
}

function endGame(){
  document.getElementById("playGame").disabled = false;
  //TODO 
}
function creatLifeAndPoints(){
  var lifeElement = document.getElementById("life");
  var pointsElement = document.getElementById("points");
  lifeElement.style.display = "block"
  pointsElement.style.display = "block"
  document.getElementById("lifeNumber").innerHTML = game.life;
  document.getElementById("pointNumber").innerHTML = game.points;
}


function returnWord(){
  // console.log(data[0]['country']);
  // game.actualWorld = data[0]['country'];
  // var elem = document.getElementById("panstwa");
  // elem.innerHTML = returnFloors(game.actualWorld);
  
  // console.log(data.length);
  // console.log(data[0]['country'][2]);
  
  // for (var i = 0; i < data[0]['country'].length; i += 1) {
  //   console.log(data[0]['country'][i]);  
  // }
}

function returnFloors(word){
  var returnFloors = "";
  for(var i = 0; i < word.length; i++){
    returnFloors += "_ "
  }
  return returnFloors;
}

function checkLetter(){
  var liter = document.getElementById("setLetter").value;
  console.log(liter);
  console.log(getRandomInt(10,20));
}



function addElement(mydiv)
{
  // newDiv = document.createElement("span");
  // newDiv.innerHTML = "jasiokotek";

  // my_div = document.getElementById(mydiv);
  // document.body.insertBefore(newDiv, my_div);

  // newDiv2 = document.createElement("span");
  // newDiv2.innerHTML = "jasiokotek2";
  // document.body.insertBefore(newDiv2, my_div.nextSibling);

  // newDiv.classList.add("mystyle");  
}

function getInfoAboutAuthor(){
  document.getElementById("authorInfo").style.display = 'block'
}

function closeInfoAboutAuthor(){
  document.getElementById("authorInfo").style.display = 'none'
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
