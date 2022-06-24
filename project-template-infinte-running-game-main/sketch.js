var runner, runner1, runner2, runner3, runner4, runnerImg;
var runner_collided;
var path, pathImage;
var obstaclesGroup, obstacle1, obstacle2;

var score;
var gameOverImage;

var gameState;

function preload(){
runner_running = loadAnimation("Runner1.png","Runner2.png","Runner3.png","Runner4.png");
runner_collided = loadAnimation("runner_collided.png")
Path = loadAnimation("Path.jpg");
obstacle1 = loadImage("obstacle1.jpg")
obstacle2 = loadImage("obstacle2.jpg")

restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")

}

function setup() {
createCanvas(600, 200);

runner = createSprite(50,160,20,50);
runner.addAnimation("running", runner_running);
runner.addAnimation("collided", runner_collided);

runner.scale = 0.4;

path = createSprite(200,180,400,20);
path.addImage("path", pathImage)
path.x = path.width/2

gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  gameOver.scale = 0.5;

  runner.setCollider("rectangle",0,0,runner.width,runner.height);
  runner.debug = true
  
  score = 0;

}

function draw() { 
    background(180);
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);

    if (ground.x < 0){
        ground.x = ground.width/2;
      }

      if(keyDown("space")&& runner.y >= 100) {
        runner.velocityY = -12;
  }
  
  runner.velocityY = runner.velocityY + 0.8
  
spawnObstaclea();

  if(obstaclesGroup.isTouching(trex)){
    runner.velocityY = -12;
    gameState = END;
    
  }
}
else if (gameState === END) {
  gameOver.visible = true;

  runner.changeAnimation("collided", runner_collided);

  ground.velocityX = 0;
  runner.velocityY = 0

  obstaclesGroup.setLifetimeEach(-1);
  drawSprites();
}

function reset(){
  
}
}
