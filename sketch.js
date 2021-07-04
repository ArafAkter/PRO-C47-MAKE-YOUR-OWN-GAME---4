var player

var score = 0

//var score1 = 0
var obstaclesGroup
var gameState = "play"

var score1 = 175
var score2 = 0
var score3 = 125
var score4 = 0

var money = 0
function preload(){
  check = loadSound("jump.wav")
  die = loadSound("collided.wav")
}


function setup(){
  createCanvas(600,400)
  over = createSprite(200,-1400,400,400)
  over.shapeColor = "limegreen"
player = createSprite(300,300,30,30)

bump1 = createSprite(590,-150,20,20)
bump2 = createSprite(10,-250,20,20)

coinGroup = new Group();

obstaclesGroup = new Group()

barrier1 = createSprite(300,400,600,20)
barrier2 = createSprite(610,-400,40,1600)
barrier3 = createSprite(-10,-400,40,1600)



player.shapeColor = "cyan"

}

function draw(){
  background(0,0, score1 );
  score1 = score1 - Math.round(getFrameRate()/60);
player.collide(barrier1)
player.collide(barrier2)
player.collide(barrier3)

bump1.shapeColor="black"
bump2.shapeColor="black"
barrier2.shapeColor="black"
barrier3.shapeColor="black"


end = createSprite(1600,300,600,400)
end.shapeColor = "darkorange"
if(gameState === "play"){
  score = score + Math.round(getFrameRate()/60);

  spawnObstacles()
  spawnCoin() 
  if(keyDown("up")){
 //   player.y -= 5
  }
  if(keyDown("down")){
   // player.y += 5
  }
  if(keyDown("left")){
    player.x -= 7
  }
  if(keyDown("right")){
    player.x += 7
  }
  //end.velocityY = -3.95
  if(player.isTouching(obstaclesGroup)){
    gameState = "end"
    die.play()
  }

  if(score1 < 15 ){
    score2 = score2 + getFrameRate()/60/5;
  //  score1 = 0
    background(score2,0,score2)
 

  }
  
  if(score2 > 125 ){
    score3 = score3 - Math.round(getFrameRate()/60)/5;
   // score2 = 0
    background(score3,0,0)


  }
  
  if(score3 < 0 ){
  //  score3 = 0
    score4 = score4 + Math.round(getFrameRate()/60)/5;
    background(0,0,score4)


  }
    
    if(score4 > 175){
  score1 = 175;
  score2 = 0;
  score3 = 125;
  score4 = 0;
 
    }
    obstaclesGroup.setVelocityYEach(3 + score/100)
    coinGroup.setVelocityYEach(3 + score/100)
}
 if(player.isTouching(end) ){
gameState = "end"
  }

bump1.velocityY = (3 + score/100)
bump2.velocityY = (3 + score/100)

if(score>0 && score%100 === 0){
 // check.play() 
}

over.visible = false

  if(gameState === "end"){
    obstaclesGroup.setVelocityYEach(0)
    obstaclesGroup.setLifetimeEach(-1);
    coinGroup.setVelocityYEach(0)
    coinGroup.setLifetimeEach(-1); 
    bump1.velocityY = 0
    bump2.velocityY = 0
if(keyDown("space")){
  reset()
}

background("red")
  }

  if(bump1.y > 400){
    bump1.y = -150
  }

  if(bump2.y > 400){
    bump2.y = -150
  }

  for(var i = 0; i < coinGroup.length; i++){
    if(coinGroup.get(i).isTouching(player)){
    coinGroup.get(i).destroy()
    money = money + 1
    check.play();
    }
  }
 
  //obstaclesGroup.bounceOff(barrier1)
  obstaclesGroup.bounceOff(barrier2)
  obstaclesGroup.bounceOff(barrier3)

  barrier1.visible = false
  //barrier2.visible = false
  //barrier3.visible = false

  //camera.position.y = player.y - 100

  drawSprites()
  //text(player.x + "    " + player.y,player.x - 75,player.y - 75)

  if(gameState === "over"){
    textSize(40)
    textAlign(CENTER)
    fill("darkblue")
    stroke(0)
    text("YOU WIN!!!",player.x,player.y)
   
  }
  if(gameState === "end"){
    textAlign(CENTER)
    textSize(30)
    fill("darkblue")
    text("GAME OVER!",player.x, player.y)
  }
  fill(0)
  stroke(225)
  textSize(20)
  text(score,500,50)
  text(money,500,75)

}
function spawnObstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(550,-100,90,90)
    obstacle.x = random(50,550)
   // obstacle.velocityX = -10

 //   obstacle.velocityY = (3 + score/100)
  
    obstacle.shapeColor = "orange"
    
    obstacle.lifetime = 250
  
    obstaclesGroup.add(obstacle)
  }
  }

  function spawnCoin() {
    //write code here to spawn the clouds
    if (frameCount % 100 === 0) {
      var coin = createSprite(200,-200,15,15);
      coin.shapeColor=("gold");
    //  coin.y = Math.round(random(50,windowHeight - 50));   
    coin.x = random(50,550)
      //cloud.addImage(cloudImage);
     // cloud.scale = 0.5;
     // coin.velocityX = -(6 + 3*score/100);
   //  coin.velocityY = (3 + score/100)
      var rand = Math.round(random(1,5));
    
       //assign lifetime to the variable
      coin.lifetime = 250;
     
      //adjust the depth 
      coin.depth = 0
  
     
     
      
      //add each cloud to the group
      coinGroup.add(coin);
    
    }
    
  }
  function reset(){
    gameState = "play"
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();
    score = 0
    money = 0
    score1 = 175;
    score2 = 0;
    score3 = 125;
    score4 = 0;

    bump1.y = -150
    bump2.y = -250
  }