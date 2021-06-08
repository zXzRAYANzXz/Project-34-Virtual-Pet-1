var dog, dogImg, happyDogImg;
var database;
var foodS, foodStock;

function preload()
{
  dogImg=loadImage("images/Dog.png");
  happyDogImg=loadImage("images/HappyDog.png");
}

function setup(){
  createCanvas(500, 500);

  dog = createSprite(250,250)
  dog.addImage(dogImg);
  dog.scale=0.2;

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}

function draw(){

  background("lavender");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg)
  }

  drawSprites();

  fill("blue");
  textSize(20);
  text("Press UP ARROW KEY to feed Dog",100,50);
  text("Food:  "+foodS,100,100)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  x = x-1;

  database.ref('/').update({

    Food:x
  })
}