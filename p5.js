var Score = 0;
var lives = 3;
let ball_x
let ball_y, ball_dx, ball_dy, ball_radius;
let paddle_x, paddle_y, paddle_width, paddle_height, paddle_dy;
var bricks_hit;
let bricks = [];
var temp;

function setup() {
  createCanvas(400, 400);
  
  score=0;
  lives=3;
  bricks_hit = 0;
  
  //ball init
  ball_x = width/2;
  ball_y = height - 50;
  ball_dx = 3; //change in distance i.e speed
  ball_dy = -1.7;
  ball_radius = 25;
  
  
  //paddle init
  paddle_x = width/2 - (80/2);
  paddle_y = height-20;
  paddle_height = 15;
  paddle_width = 80;
  paddle_dx = 5;

  //bricks init
  var dx = 80;
  var dy = 60;
  for(var row=0; row<4; row++){
    let brick_row = [];
    for(var col=0; col<5; col++){

      let brick = {};
      brick["x"] = 25 + dx*col;
      brick["y"] = 50 + dy*row;
      brick["w"] = 50;
      brick["h"] = 15;
      brick["status"] = true;
      
      brick_row.push(brick);
    }
    bricks.push(brick_row);
  }


}

function draw() {
  background("black")
  ball_x += ball_dx;
  ball_y += ball_dy;
  fill("white")
  
  circle(ball_x,ball_y,ball_radius);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  
  //code for paddle movement right and left

  if(keyIsDown(RIGHT_ARROW)){
    paddle_x +=paddle_dx;
  }
  
  if(keyIsDown(LEFT_ARROW)){
    paddle_x -=paddle_dx;
  }
  
  //code for bounicing the ball back if touches the left side and right side
  
  if(ball_x+(ball_radius/2)>width || ball_x-(ball_radius/2)<0){
    ball_dx=-(ball_dx);
  }
  
  
  //code for bouncing the ball back when it touches the top of the background
  
  if(ball_y-(ball_radius/2)<=0){
    ball_dy = -(ball_dy);
  }
     
  //code for bouncing the ball back if it touches the paddle
  
  if(ball_y+(ball_radius/2)>paddle_y && ball_x+(ball_radius/2)>paddle_x && ball_x+(ball_radius/2)<paddle_x+paddle_width){
    ball_dy = -(ball_dy);
  }
  
  
  //code for placing the paddle back to position so it did not disappear in negative y-axis
  
  if(paddle_x<=0){
    paddle_x = 0;
  }
  
  //code for placing the paddle back to position so it did not disappear in positive x-axis
  
  if(paddle_x+paddle_width>=width){
    paddle_x = width-paddle_width;
  }
  
  
  fill("white");
  text("Score: ",width-100, 20);
  text("Lives: ",width-100, 40);
  
  //brick properties
  //brick top
  var win = true;
  for(var i=0; i<bricks.length; i++){
    for(var j=0; j<bricks[1].length; j++){
      if(bricks[i][j].status==true){
        rect(bricks[i][j].x, bricks[i][j].y, bricks[i][j].w, bricks[i][j].h);

        win = false;
        //brick top
        if(ball_x>=bricks[i][j].x+2 && ball_x<=bricks[i][j].x+bricks[i][j].w+2 && ball_y+(ball_radius/2)>=bricks[i][j].y+2 && ball_y+(ball_radius/2)<=bricks[i][j].y+bricks[i][j].w+2){
          ball_dy = -ball_dy;
          Score+=1;
          bricks[i][j].status = false;
        }
        //brick_bottom
        if(ball_x>=bricks[i][j].x+1 && ball_x<=bricks[i][j].x+bricks[i][j].w+1 && ball_y-(ball_radius/2)==bricks[i][j].y+bricks[i][j].h+1){
          ball_dy = -ball_dy;
          Score+=1;
          bricks[i][j].status = false;
        }
        //brick left
        if(ball_y>=bricks[i][j].y && ball_y<=bricks[i][j].y+bricks[i][j].h && ball_x+(ball_radius/2)>=bricks[i][j].x && ball_x+(ball_radius/2)<bricks[i][j].x + bricks[i][j].w){
          ball_dx = -ball_dx;
          Score+=1;
          bricks[i][j].status = false;
        }
        //brick right
        if(ball_y>=bricks[i][j].y && ball_y<=bricks[i][j].y+bricks[i][j].h && ball_x-(ball_radius/2)<=bricks[i][j].x+bricks[i][j].w && ball_x-(ball_radius/2)>bricks[i][j].x){
          ball_dx = -ball_dx;
          Score+=1;    
          bricks[i][j].status = false;
        }
      }
    }
  }

  if(ball_y+(ball_radius/2)>=height){
    if(lives>0){
      lives = lives-1;
      ball_x = paddle_x+paddle_width/2;
      ball_y = paddle_y-ball_radius/2;
    }
    if(lives==0){
      ball_dx = 0;
      ball_dy = 0;
    }
  }
    
  if(win==true){
    ball_dx = 0;
    ball_dy = 0;
    ball_x = paddle_x + paddle_width/2;
    ball_y = paddle_y - ball_radius/2;
    paddle_x = width/2;
    paddle_y = height-20;
    text("You Won", 170, 180);
  }
  if(lives == 0 && win==false){
    text("Game Over", 170, 150);
    text("You Lose", 170, 180)
    ball_dx = 0;
    ball_dy = 0;
    ball_x = paddle_x + paddle_width/2;
    ball_y = paddle_y - ball_radius/2;
    paddle_x = width/2;
    paddle_y = height-20;
  }
  
  text(Score, width-50,20);
  text(lives, width-50,40);
  
}







