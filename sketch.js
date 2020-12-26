//Create variables here
var dog,dogImage,happydog;
var database;
var food,foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800,600);
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  dog = createSprite(250,350);
  dog.addImage(dogImage);
  dog.scale=0.3;
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(food);
    dog.addImage(happydog);
  }

  drawSprites();

  fill("red");
  strokeWeight(4);
  stroke("yellow");
  textSize(40);
  text("foodStock: "+food,200,250);

  fill("red");
  strokeWeight(4);
  stroke("yellow")
  textSize(30);
  text("Note: Press UP_ARROW key to feed the Dog",100,50);
}

function readStock(data)
{
  food=data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=0
  }
  else
  {
    x=x-1
  }

   database.ref('/').update({
     food : x
   })
}

function showError()
{
    console.log("error in writing to database");
}