import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Controls } from '../enums/controls';
import { PongGame } from '../classes/pong-game';
import { Boundaries } from '../classes/boundaries';
import { ControlState } from '../classes/control-state';
import { Sounds } from '../classes/sound';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild("pongCanvas") canvasElement: ElementRef

  public imgUrl = environment.IMGURL;
  public soundIcon: string  = 'soundon.png'
  public sound: Sounds;
  public width: number = 800;
  public height: number = 600;
  
  private context: CanvasRenderingContext2D;
  private pongGame: PongGame;
  private ticksPerSecond: number = 60;
  private gameTickInterval;
  private countDownIntervall;
  public scoreCom: number = 0;
  public scorePlayer: number = 0;
  private controlState: ControlState; 
  public gameOverText: string = '';
  public countDownNum: number = 3;
  public gameEnded: boolean = false;
  public showShareModal: boolean = false;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
  ) {
   
    this.pongGame = new PongGame(this.height,this.width);
    this.controlState = { upPressed: false, downPressed: false };
    this.sound = new Sounds();
  }

  ngOnInit() {    

  }

  ngAfterViewInit() {
    this.context = this.canvasElement.nativeElement.getContext('2d');
    this.startCountDown();
    // this.renderFrame();    
    // Game model ticks 60 times per second. Doing this keeps same game speed
    // on higher FPS environments.

  }

  renderFrame(): void {
    // Only run if game still going
    if(this.gameEnded == true){ return }
    if (this.scoreCom == 10 || this.scorePlayer == 10) {
      if(this.scoreCom == 10) this.gameOverText = 'LOSER'
      if(this.scorePlayer == 10) this.gameOverText = 'WINNER'
      this.gameEnded = true;      
      clearInterval(this.gameTickInterval);
      return;
    }

    if (this.pongGame.score() == 'com'){
      this.scoreCom = this.scoreCom + 1
      this.sound.playSound(3)
      this.reset()

    }
    if (this.pongGame.score() == 'player'){
      this.scorePlayer = this.scorePlayer + 1
      this.sound.playSound(3)
      this.reset()
    }
    // Draw background
    this.context.fillStyle = 'rgb(0,0,0)';
    this.context.fillRect(0, 0, this.width, this.height);
    
    // Set to white for game objects
    this.context.fillStyle = 'rgb(255,255,255)';
    
    let bounds: Boundaries;
    
    // Draw player paddle
    let paddleObj = this.pongGame.playerPaddle;
    bounds = paddleObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, paddleObj.getWidth(), paddleObj.getHeight());

    // Draw enemy paddle
    let enemyObj = this.pongGame.enemyPaddle;
    bounds = enemyObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, enemyObj.getWidth(), enemyObj.getHeight());

    // Draw ball
    let ballObj = this.pongGame.ball;
    bounds = ballObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, ballObj.getWidth(), ballObj.getHeight());

    // Render next frame
    window.requestAnimationFrame(() => this.renderFrame());
  }

  startCountDown(){
    
    this.gameOverText = `READY? ${this.countDownNum}`
    this.countDownIntervall = setInterval(() => {
      this.countDownNum = this.countDownNum - 1;
      this.gameOverText = `READY? ${this.countDownNum}`;
     
      if(this.countDownNum == 0){
        this.gameOverText = '';
        this.pongGame.ballSpeed = 2;
        this.renderFrame();
        this.gameTickInterval = setInterval(() => this.pongGame.tick(this.controlState), 1 / this.ticksPerSecond);
        clearInterval(this.countDownIntervall);
      }
    }, 1000);
  }

  reset(){
    this.pongGame.reset()
  }

  restart(){
    
    clearInterval(this.gameTickInterval);
    this.gameOverText = '';
    this.scorePlayer = 0;
    this.scoreCom = 0;
    
    this.gameEnded = false;
    this.countDownNum = 3;
    this.startCountDown();

  }

  @HostListener('window:keydown', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.key == Controls.Up) {
      this.controlState.upPressed = true;
    }
    if (event.key == Controls.Down) {
      this.controlState.downPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.key == Controls.Up) {
      this.controlState.upPressed = false;
    }
    if (event.key == Controls.Down) {
      this.controlState.downPressed = false;
    }
  }

  muteSound(){
    this.sound.muted = !this.sound.muted;
    if(this.sound.muted == true){
      this.soundIcon = 'soundoff.png'
    }else{
      this.soundIcon = 'soundon.png'
    }
    this.pongGame.muteSound()
  }
  
  ngOnDestroy() {
    clearInterval(this.countDownIntervall);
    clearInterval(this.gameTickInterval);
    this.gameOverText = '';
    this.scorePlayer = 0;
    this.scoreCom = 0;
    this.gameEnded = true;
  }

  shareOnSocial(){
    // console.log("open modal");
    this.showShareModal = true;
    this.updateTags()
    // console.log(this.showShareModal)
  }

  updateTags(){
    // console.log("update tags")
    let thumb = `${this.imgUrl}/img/seo/waypoint.jpg`
    let description = `I have beaten the WAYPONG, can you?.`;
    // console.log(description);
    this.titleService.setTitle(`WAYPOINT | Video Game Creative Agency`);
    this.metaTagService.updateTag({ 
      name: 'description', 
      content: `${description}` 
    })
    this.metaTagService.updateTag({ 
      name: 'twitter:text:title', 
      content: `WAYPOINT | Video Game Creative Agency` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:title', 
      content: `WAYPOINT | Video Game Creative Agency` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:description', 
      content: `${description}` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:image', 
      content: `${thumb}` 
    })
    this.metaTagService.updateTag({ 
      name: 'twitter:image', 
      content: `${thumb}` 
    })    
  }
}
