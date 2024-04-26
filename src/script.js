class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {

    //load play background image
    //this.load.image("play_background", "./assets/play_background.png")
  }

  create() {


    //make background visible
    //this.backgroundImage = this.add.tileSprite(0, 0, 900, 700, "play_background").setOrigin(0, 0)

    // words
    this.songLyrics = "This is a song!".toLowerCase();
    this.words = this.songLyrics.split(" ");
    this.word = "";
    // detect key presses
    let minInterval = 1000;
    let maxInterval = 5000;
    let timer = this.time.addEvent({
      delay: Phaser.Math.Between(minInterval, maxInterval),
      callback: this.timedEvent,
      callbackScope: this,
      loop: true,
    });

    let allKeys = this.input.keyboard.addKeys(
      "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,LEFT,RIGHT,UP,DOWN,SPACE,ENTER"
    );

    this.input.keyboard.on("keydown", (event) => {
      if (this.word.length > 0 && this.word[0] === event.key) {
        this.word = this.word.slice(1);
      }
    });

    // enemies
    this.enemy1 = new enemies(
      this,
      game.config.width / 2,
      game.config.height,
      "enemy",
      0
    ).setOrigin(0, 0);
    this.enemy2 = new enemies(
      this,
      game.config.width / 2,
      0,
      "enemy",
      0
    ).setOrigin(0, 0);
    this.enemy3 = new enemies(
      this,
      game.config.width,
      game.config.height / 2,
      "enemy",
      0
    ).setOrigin(0, 0);
    this.enemy4 = new enemies(
      this,
      0,
      game.config.height / 2,
      "enemy",
      0
    ).setOrigin(0, 0);
  }
  timedEvent() {
    if (this.word.length == 0) {
      this.word = this.words.shift();
    }
  }

  update() {}
}

const config = {
  type: Phaser.WEBGL,
  width: 900,
  height: 700,
  backgroundColor: 0x000000,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [MainScene],
};

const game = new Phaser.Game(config);
