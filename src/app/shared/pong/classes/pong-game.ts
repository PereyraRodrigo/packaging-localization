import { Ball } from './ball';
import { Boundaries } from './boundaries';
import { Paddle } from './paddle';
import { ControlState } from './control-state';
import { Sounds } from './sound';

export class PongGame {
    public sound: Sounds;
    public ball: Ball;
    public playerPaddle: Paddle;
    public enemyPaddle: Paddle;
    public ballSpeed: number = 2;
    private height: number
    private width: number;
    


    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;

        // Construct game objects
        this.ball = new Ball(15, 15, 2, { x: height / 2, y: width / 2 }, { x: 1, y: 1 });
        this.playerPaddle = new Paddle(100, 20, 1.5, { x: 50, y: height / 2 });
        this.enemyPaddle = new Paddle(100, 20, .8, { x: width - 50, y: height / 2 })
        this.sound = new Sounds();
    }

    tick(controlState: ControlState) {
        this.ball.move();

        // Set acceleration, move player paddle based on input
        var paddleBounds = this.playerPaddle.getCollisionBoundaries();
        if (controlState.upPressed && paddleBounds.top > 0) {
            this.playerPaddle.accelerateUp(1);
        }

        else if (controlState.downPressed && paddleBounds.bottom < this.height) {
            this.playerPaddle.accelerateDown(1);
        }

        else {
            this.playerPaddle.decelerate(.05);
        }
        this.playerPaddle.move();

        this.moveEnemyPaddle();
        this.checkCollisions();
    }

    private moveEnemyPaddle() {
        if (this.ball.getPosition().y < this.enemyPaddle.getPosition().y){
            this.enemyPaddle.accelerateUp(1)
        }else {
            this.enemyPaddle.accelerateDown(1)
        }
        this.enemyPaddle.move()
    }

    private checkCollisions() {
        // Bounce off top/bottom
        let ballBounds = this.ball.getCollisionBoundaries();
        if (ballBounds.bottom >= this.height || ballBounds.top <= 0){
            
            this.ball.reverseY();
            this.sound.playSound(2);

        }

        let paddleBounds = this.playerPaddle.getCollisionBoundaries();

        // Don't let paddle go past boundaries
        if (paddleBounds.top <= 0 || paddleBounds.bottom >= this.height)
            this.playerPaddle.decelerate(1);

        // Player paddle hit
        if (ballBounds.left <= paddleBounds.right &&
            paddleBounds.right - ballBounds.left <= 3 &&
            ballBounds.bottom >= paddleBounds.top &&
            ballBounds.top <= paddleBounds.bottom) {
            this.ball.reverseX();
            this.sound.playSound(1);
            // Set vertical speed ratio by taking ratio of 
            // dist(centerOfBall, centerOfPaddle) to dist(topOfPaddle, centerOfPaddle)
            // Negate because pixels go up as we go down :)
            var vsr = - (this.ball.getPosition().y - this.playerPaddle.getPosition().y)
                / (paddleBounds.top - this.playerPaddle.getPosition().y);

            // Max vsr is 1
            vsr = Math.min(vsr, 1);
            this.ball.setVerticalSpeedRatio(vsr);
        }

        // Enemy paddle hit
        paddleBounds = this.enemyPaddle.getCollisionBoundaries();
        if (ballBounds.right <= paddleBounds.left &&
            paddleBounds.left - ballBounds.right <= 3 &&
            ballBounds.bottom >= paddleBounds.top &&
            ballBounds.top <= paddleBounds.bottom) {
            this.ball.reverseX();
            this.sound.playSound(1);

            // Set vertical speed ratio by taking ratio of 
            // dist(centerOfBall, centerOfPaddle) to dist(topOfPaddle, centerOfPaddle)
            // Negate because pixels go up as we go down :)
            var vsr = - (this.ball.getPosition().y - this.enemyPaddle.getPosition().y)
                / (paddleBounds.top - this.enemyPaddle.getPosition().y);

            // Max vsr is 1
            vsr = Math.min(vsr, 1); 
           this.ball.setVerticalSpeedRatio(vsr);
        }
    }

    score(){
        if(this.ball.getCollisionBoundaries().left <= 0){
            return 'com'
        }
        if(this.ball.getCollisionBoundaries().right >= this.width){
            return 'player'
        }
    }

    reset(){
        if(this.ballSpeed < 2.8){
            this.ballSpeed = (this.ballSpeed * 1.05);
        }
        this.ball  = new Ball(15, 15, this.ballSpeed, { x: this.height / 2, y: this.width / 2 }, { x: 1, y: 1 })
        this.enemyPaddle = new Paddle(100, 20, .8, { x: this.width - 50, y: this.height / 2 })
    }

    muteSound(){
        // console.log(this.sound.muted)
        this.sound.muted = !this.sound.muted;
      }

}
