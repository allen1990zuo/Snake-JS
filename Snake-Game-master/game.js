$(document).ready(function () {

    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var canvasWidth = $("#canvas").width();
    var canvasHeight = $("#canvas").height();
    var snakeCellWidth = 10;
    var direction;
    var score;
    var snake;

    function gameInit(){
        direction = "right";
        createSnake();
        createFood();
        createRock();
        score = 0;

        if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(drawSnake, 60);
    }
    
    gameInit();

    function createSnake(){
        var length = 5;
        snake = [];
        for(var i = length-1; i>=0; i--){
            snake.push({x: i, y:0});
        }
    }
    function createFood(){
        food = {
            x: Math.round(Math.random()*(canvasWidth-snakeCellWidth)/snakeCellWidth),
            y: Math.round(Math.random()*(canvasHeight-snakeCellWidth)/snakeCellWidth)
        };
    }
    function createRock() {
        rock = {
            x: Math.round(Math.random()*(canvasWidth-snakeCellWidth)/snakeCellWidth),
            y: Math.round(Math.random()*(canvasHeight-snakeCellWidth)/snakeCellWidth)
        }
    }

    function drawSnake(){

        ctx.fillStyle = "#DCFEF9";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = "#141C1C";
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

        var headX = snake[0].x;
        var headY = snake[0].y;

        if(direction == "right") headX++;
        else if(direction == "left") headX--;
        else if(direction == "up") headY--;
        else if(direction == "down") headY++;


        if( headX == -1 || headX == canvasWidth/snakeCellWidth || headY == -1 || headY == canvasHeight/snakeCellWidth || checkExist(headX,headY,snake) || (headX==rock.x && headY==rock.y) ){
            gameInit();
            return;
        }

        if(headX == food.x && headY == food.y){
            var tail = {x: headX, y: headY};
            score++;
            createFood();
            createRock();
        }else{
            var tail = snake.pop();
            tail.x = headX; tail.y = headY;
        }

        snake.unshift(tail);

        for(var i = 0; i < snake.length; i++)
        {
            var snakeBody = snake[i];
            drawSnakeCell(snakeBody.x, snakeBody.y);
        }

        drawSnakeCell(food.x, food.y);
        drawRock(rock.x,rock.y);

        var score_text = "Score: " + score;
        ctx.fillText(score_text, 5, canvasHeight-5);
    }

    function drawSnakeCell(x, y){
        ctx.fillStyle = "#08F90E";
        ctx.fillRect(x*snakeCellWidth, y*snakeCellWidth, snakeCellWidth, snakeCellWidth);
        ctx.strokeStyle = "#ECFE1C";
        ctx.strokeRect(x*snakeCellWidth, y*snakeCellWidth, snakeCellWidth, snakeCellWidth);
    }

    function drawRock(x,y) {
        ctx.fillStyle = "#F90300";
        ctx.fillRect(x*snakeCellWidth, y*snakeCellWidth, snakeCellWidth, snakeCellWidth);
        ctx.strokeStyle = "#010505";
        ctx.strokeRect(x*snakeCellWidth, y*snakeCellWidth, snakeCellWidth, snakeCellWidth);
    }

    function checkExist(x, y, array){
        for(var i = 0; i < array.length; i++){
            if(array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }
    $(document).keydown(function(e){
        var key = e.which;
        if(key == "37" && direction != "right") direction = "left";
        else if(key == "38" && direction != "down") direction = "up";
        else if(key == "39" && direction != "left") direction = "right";
        else if(key == "40" && direction != "up") direction = "down";
    });
});