var stage;
    const E = 0;
    const W = 1;
	const P = 2;
	const G = 3;
	const R= 4;
	

const objects = ['Empty', 'Wall', 'Player', 'Goal', 'Reward'];
   
	//Defining KeyBoard input for the player
   const ARROW_KEY_LEFT = 37;
    const ARROW_KEY_UP = 38;
    const ARROW_KEY_RIGHT = 39;
    const ARROW_KEY_DOWN = 40;

    //loading all the images
    const PlayerImage = "images/player.png";
    const BrickImage = "images/brick.png";
	const GoalImage = "images/goal.png";
	const RewardImage = "images/reward.png";

    const playerImage = createImage(PlayerImage);
    const goalImage = createImage(GoalImage);
	var reward = [];
 

    /**Coordinates*/
    var playerCurPosition= [0,0];
    var playerImagePosition = [0,0];

	//defining gameworld incliuding player, goad,reward and wall
    var gameWorld = [];
	
    gameWorld.unshift([W, E, E, E, W, E, W, R, E, G]);
    gameWorld.unshift([W, E, E, E, W, E, W, E, E, R]);
    gameWorld.unshift([R, E, E, E, W, E, W, E, E, E]);
    gameWorld.unshift([W, E, D, E, W, E, E, E, W, E]);
    gameWorld.unshift([W, W, W, E, E, E, R, E, W, W]);
    gameWorld.unshift([W, E, W, E, W, E, E, R, W, W]);
    gameWorld.unshift([E, W, E, E, W, E, W, E, E, D]);
    gameWorld.unshift([E, E, E, E, W, E, W, E, E, E]);
    gameWorld.unshift([E, E, E, E, W, E, W, E, E, W]);
    gameWorld.unshift([E, E, E, W, E, W, E, E, E, W]);
    var containers = [];


    function init() {
        document.getElementById('canvas').style.visibility='visible';
        stage = new createjs.Stage(document.getElementById('canvas'));
        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(60);
  		startGame();
    }
    function handleTick(e) {
        stage.update();
    }

    function startGame() {
        buildWorld();
        setControls();
    }

    function setControls() {
        window.onkeydown = handleKeyDown;
    }

    function handleKeyDown(e) {
      e = !e ? window.event : e;
      var newPosition;
      switch (e.keyCode) {
        case ARROW_KEY_LEFT:
          newPosition = [playerCurPosition[0], playerCurPosition[1]-1]
          break;
        case ARROW_KEY_RIGHT:
          newPosition = [playerCurPosition[0], playerCurPosition[1]+1]
          break;
        case ARROW_KEY_UP:
          newPosition = [playerCurPosition[0]+1, playerCurPosition[1]]
          break;
        case ARROW_KEY_DOWN:
          newPosition = [playerCurPosition[0]-1, playerCurPosition[1]]
          break;
      }
      handleNewPosition(newPosition, e.keyCode);
    }


    function handleNewPosition(newPosition, moveEvent) {
        //setting up the newCordinats for the user
		var xCord = newPosition[0];
        var yCord = newPosition[1];
        //disabling move
        if (typeof gameWorld[xCord] === 'undefined' || typeof gameWorld[yCord] === 'undefined') {
          alert('Cannot Move Outside the world. Press OK to Continue');
        } else if (gameWorld[xCord][yCord] == W) {
          alert('Cannot move to the wall Press OK to Continue');
          var container = containers[xCord][yCord];
          container.removeAllChildren();
          var rectangle = createShape();
          var image = createImage(BrickImage);
          container.addChild(rectangle, image);
        } else {
          //allowing player's move
            var container = containers[xCord][yCord];
            container.removeAllChildren();
            var rectangle = createShape();
            container.addChild(rectangle);
			//winning Condition
            if (gameWorld[newPosition[0]][newPosition[1]] === G) {
                var container = containers[newPosition[0]][newPosition[1]];
                container.removeAllChildren();
                var rectangle = createShape();
                container.addChild(rectangle, goalImage);
                alert('Bingo!!! You Found Pokemon');
                location.reload();
            }
			
			//Moving PLAYER as per the user's Action
            if (moveEvent === ARROW_KEY_UP) {
              playerImagePosition = [playerImagePosition[0], playerImagePosition[1] - 60]
              var tween = createjs.Tween.get(playerImage).to({x: playerImagePosition[0], y: playerImagePosition[1]}, 0, createjs.Ease.bounceOut);
            } else if (moveEvent === ARROW_KEY_DOWN) {
               playerImagePosition = [playerImagePosition[0], playerImagePosition[1] + 60]
               var tween = createjs.Tween.get(playerImage).to({x: playerImagePosition[0], y: playerImagePosition[1]}, 0, createjs.Ease.bounceOut);
            } else if (moveEvent === ARROW_KEY_RIGHT) {
               playerImagePosition = [playerImagePosition[0] + 80 , playerImagePosition[1]]
               var tween = createjs.Tween.get(playerImage).to({x: playerImagePosition[0], y: playerImagePosition[1]}, 0, createjs.Ease.bounceOut);
            } else if (moveEvent === ARROW_KEY_LEFT) {
               playerImagePosition = [playerImagePosition[0] - 80 , playerImagePosition[1]]
               var tween = createjs.Tween.get(playerImage).to({x: playerImagePosition[0], y: playerImagePosition[1]}, 0, createjs.Ease.bounceOut);
            }
            playerCurPosition = newPosition;
        }
		

    }


	//builing WORLD for the game Content
    function buildWorld() {
		for (var i = 0; i<10; i++) {
		    var indexContainers = [];
			for (var j = 0; j<10; j++) {
			    var image;
			    if (i==9 && j==0) {
			      image = playerImage;
			    } else {
			      //RECTANGLE
			      image = createImage(BrickImage);
			    }
				var container1 = new createjs.Container();
               
                var rectangle = createShape();
				
				container1.addChild(rectangle, image);
				container1.x = j*80;
				container1.y = i*60;
				
				stage.addChild(container1);
                indexContainers[j] = container1;
				stage.update();
			}
			containers.unshift(indexContainers);
		}
    }

	//creating shapes
    function createShape() {
      var rectangle = new createjs.Shape();
      rectangle.graphics.beginStroke('#000');
      rectangle.graphics.drawRect(0, 0, 80, 60);
      return rectangle;
    }

	//creating Images
    function createImage(imageSrc) {
		loadImage = new createjs.Bitmap(imageSrc);
      return loadImage;
    }

}