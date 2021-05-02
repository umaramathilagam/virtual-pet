var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
   feedsDog=createButton("Feed the dog")
   feedsDog.position(900,95)
   feedsDog.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
 
  //write code to display text lastFed time here

fill(0)
textSize(24)
if(lastFed>=12){
  //show time in PM format when the lastFed is greater than 12
  text("Last Fed :"+lastFed%12 +"PM",300,30)
}else if(lastFed==0){
  text ("Last Feed : 12 AM",350,30)
}else{
  //show time in AM format when lastFed is less than 12
  text("Last Fed :"+lastFed +"AM",300,30)
}
  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val=foodObj.getFoodStock()
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0)
  }else{
    foodObj.updateFoodStock(food_stock_val-1)
  }
  
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour ()
  })
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  console.log(foodS)
  database.ref('/').update({
    Food:foodS
  })
}
