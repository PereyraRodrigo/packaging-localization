export class Sounds {
    public beep1: HTMLAudioElement;
    public beep2: HTMLAudioElement;
    public beep3: HTMLAudioElement;
    public muted: boolean = false;
    constructor() {
        this.beep1 = new Audio('https://cdn.waypoint.la/wp-content/uploads/2021/12/beep1.mp3')
        this.beep2 = new Audio('https://cdn.waypoint.la/wp-content/uploads/2021/12/beep2.mp3')
        this.beep3 = new Audio('https://cdn.waypoint.la/wp-content/uploads/2021/12/blip.mp3')
    }

    
    playSound(sound: number){
        // console.log(this.muted)
        if (this.muted == true) return;
        if(sound == 1){ this.beep2.play(); }
        if(sound == 2){ this.beep1.play(); }
        if(sound == 3){ this.beep3.play(); }
        
    }
}