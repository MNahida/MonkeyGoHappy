
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
 monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png",
                               "monkey_3.png","monkey_4.png","monkey_5.png",
                               "monkey_6.png","monkey_7.png","monkey_8.png");
  
  monkey_stop=loadAnimation("monkey_0.png");
  
  bananaImage = loadImage("banana.png");
  
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 400);
  
  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("Running",monkey_running);
   monkey.addAnimation("stop",monkey_stop);
   monkey.scale=0.15
  
  //creating ground sprite
    ground = createSprite(400,350,1200,20);
    ground.velocityX=-4;
    ground.shapeColor="brown"
    ground.x=ground.width/2;
  
  //creating group objects
    FoodGroup = new Group();
    obstaclesGroup = new Group();

  //initialising the score
    score = 0;
}

function draw() {
  
  background("green");
  console.log(monkey.y);
  //resetting the ground sprite
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
   
  //making monkey jump when space is pressed
  if(keyDown("space")  && monkey.y>=150) {
      monkey.velocityY = -12;
  }
  
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //stop monkey from falling
  monkey.collide(ground);   
  
  //function call: to spawn food and obstacles
  spawnFood();
  spawnObstacles();
 
  drawSprites();
  
  stroke("black");
  strokeWeight(3);
  textSize(18);
  fill("yellow");
  text("Score: "+ score, 520,40);        
  
  if(obstaclesGroup.isTouching(monkey)){
    
        monkey.changeAnimation("stop",monkey_stop);
    
        ground.velocityX = 0;
        monkey.velocityY = 0;
    
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
    
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
  }
  //updating the score
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score + 2;
   }
  
  stroke("green");
  textSize(22);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 220,50);
}

function spawnFood() {
  //code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(100,150);    
    banana.velocityX = -5;
    
    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //code here to spawn the obstacles
  if(frameCount % 100 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.2;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
