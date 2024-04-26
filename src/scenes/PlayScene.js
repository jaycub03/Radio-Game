class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {
    //load play background image
    this.load.image("play_background", "../assets/play_background.png");
    this.load.image("enemy", "../assets/enemy.png");
    this.load.image("player", "../assets/player.png");
  }

  create() {
    //make background visible
    this.backgroundImage = this.add
      .tileSprite(0, 0, 900, 700, "play_background")
      .setOrigin(0, 0);

    // words
    this.songLyrics =
      "This is a song more lyrics woooo nowgn nsodg gklsg sdklg".toLowerCase();
    this.words = this.songLyrics.split(" ");
    this.enemyWords = ["", "", "", ""];
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
      for (let i = 0; i < this.enemyWords.length; i += 1) {
        if (
          this.enemyWords[i].length > 0 &&
          this.enemyWords[i][0] === event.key
        ) {
          this.enemyWords[i] = this.enemyWords[i].slice(1);
        }
      }
    });
    //player(temp)
    this.player = this.physics.add.image(game.config.width / 2, game.config.height / 2, 'player');
    // enemies
    this.enemy1 = new enemies(
      this,
      game.config.width / 2,
      game.config.height * 0.9,
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
      game.config.width * 0.9,
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
    this.allEnemies = [this.enemy1, this.enemy2, this.enemy3, this.enemy4];
    // words for enemies
    this.enemyWord1 = this.add.text(this.enemy1.x, this.enemy1.y, "word1");
    this.enemyWord2 = this.add.text(this.enemy2.x, this.enemy2.y, "word2");
    this.enemyWord3 = this.add.text(this.enemy3.x, this.enemy3.y, "word3");
    this.enemyWord4 = this.add.text(this.enemy4.x, this.enemy4.y, "word4");
    this.enemyTextObjects = [
      this.enemyWord1,
      this.enemyWord2,
      this.enemyWord3,
      this.enemyWord4,
    ];
  }

  // Get new words
  timedEvent() {
    // console.log("at timed event!");
    // if the enemy is on the screen, and has no word, give it a word
    for (let i = 0; i < this.enemyWords.length; i += 1) {
      //   console.log("i: ", i, this.allEnemies[i].x, this.allEnemies[i].y);
      if (
        this.allEnemies[i].x >= 0 &&
        this.allEnemies[i].x <= game.config.width &&
        this.allEnemies[i].y >= 0 &&
        this.allEnemies[i].y <= game.config.height &&
        this.enemyWords[i].length == 0
      ) {
        this.enemyWords[i] = this.words.shift();
      }
    }
  }

  update() {
    this.enemy1.update();
    this.enemy2.update();
    this.enemy3.update();
    this.enemy4.update();
    this.enemyWord1.x = this.enemy1.x;
    this.enemyWord1.y = this.enemy1.y;
    this.enemyWord2.x = this.enemy2.x;
    this.enemyWord2.y = this.enemy2.y;
    this.enemyWord3.x = this.enemy3.x;
    this.enemyWord3.y = this.enemy3.y;
    this.enemyWord4.x = this.enemy4.x;
    this.enemyWord4.y = this.enemy4.y;
    this.enemyWord1.text = this.enemyWords[0];
    this.enemyWord2.text = this.enemyWords[1];
    this.enemyWord3.text = this.enemyWords[2];
    this.enemyWord4.text = this.enemyWords[3];
    if(this.checkHit(this.player, this.enemy1)){
      this.enemy1.reset();
    }
    if(this.checkHit(this.player, this.enemy2)){
      this.enemy2.reset();
    }
    if(this.checkHit(this.player, this.enemy3)){
      this.enemy3.reset();
    }
    if(this.checkHit(this.player, this.enemy4)){
      this.enemy4.reset();
    }

    // winning the game!
    if (this.songLyrics.length == 0) {
      console.log("you won!!!");
    }
  }
  checkHit(player, enemy) {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
