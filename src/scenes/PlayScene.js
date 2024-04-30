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
      "This is a song more lyrics woooo nowgn nsodg gklsg sdklg more words and even more words yay yay yay".toLowerCase();
    this.words = this.songLyrics.split(" ");
    this.enemyWords = ["", "", "", ""];
    // detect key presses
    let minInterval = 500;
    let maxInterval = 1000;
    let timer = this.time.addEvent({
      delay: Phaser.Math.Between(minInterval, maxInterval),
      callback: this.timedEvent,
      callbackScope: this,
      loop: true,
    });

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
    this.playerHealth = 5;

    this.player = this.physics.add.image(
      game.config.width / 2,
      game.config.height / 2,
      "player"
    );
    // enemies
    this.enemy1 = new enemies(
      this,
      game.config.width / 2,
      game.config.height * 0.9,
      "enemy",
      0,
      0.3
    ).setOrigin(0, 0);
    this.enemy2 = new enemies(
      this,
      game.config.width / 2,
      0,
      "enemy",
      0,
      0.2
    ).setOrigin(0, 0);
    this.enemy3 = new enemies(
      this,
      game.config.width * 0.9,
      game.config.height / 2,
      "enemy",
      0,
      0.1
    ).setOrigin(0, 0);
    this.enemy4 = new enemies(
      this,
      0,
      game.config.height / 2,
      "enemy",
      0,
      0.2
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
    this.newWords();

    // beat stuff
    this.beatText = this.add.text(
      20,
      20,
      "A green rect will appear on the\nscreen every once in a while.\nTo recieve power ups,Press enter\nwhen the rect incraeses in size!"
    );

    // Calculate beat duration in milliseconds
    this.BPM = 60;
    this.beatDuration = (60000 / this.BPM) * 3;

    // Draw a rectangle
    this.rectWidth = 0;
    this.powerUp = 0;
    this.graphics = this.add.graphics();
    this.graphics.clear();
    this.graphics.fillStyle(0x00ff00);
    this.graphics.fillRect(50, 150, this.rectWidth, this.rectWidth);

    // Set up interval timer for beats
    this.messageTimer = setInterval(() => {
      if (this.rectWidth == 100 || this.rectWidth == 120) {
        console.log("Beat!");
        this.graphics.clear();
        this.rectWidth = 120;
        this.graphics.fillRect(50, 150, this.rectWidth, this.rectWidth);
      }
    }, this.beatDuration);

    this.graphics = this.add.graphics();

    // Set up timer to shrink the rectangle a few seconds after each beat
    this.shrinkTimer = setInterval(() => {
      // Redraw the smaller rectangle
      if (this.rectWidth == 120 || this.rectWidth == 100) {
        this.rectWidth = 100;
        this.graphics.clear();
        this.graphics.fillRect(50, 150, this.rectWidth, this.rectWidth);
      }
    }, this.beatDuration + 2000); // Shrink the rectangle 3 seconds after each beat

    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Enter") {
        // Check if the key press is close enough to the beat
        if (this.rectWidth == 120 || this.rectWidth == 100) {
          console.log("Enter key pressed on beat!");
          this.graphics.clear();
          this.graphics.fillStyle(0x00ff00);
          this.rectWidth = 100;
          this.graphics.fillRect(50, 150, this.rectWidth, this.rectWidth);
        }
      }
    });
  }

  // Get new words
  newWords() {
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
        if (this.rectWidth > 0) {
          this.powerUp += 1;
        }
      }
    }
  }

  update() {
    // winning the game!
    if (this.words.length == 0) {
      this.scene.start("GameOverScene");
    }
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

    if (
      this.checkHit(this.player, this.enemy1) ||
      this.enemyWords[0].length == 0
    ) {
      this.enemy1.reset();
      this.enemyWords[0] = "";
      this.newWords();
    }
    if (
      this.checkHit(this.player, this.enemy2) ||
      this.enemyWords[1].length == 0
    ) {
      this.enemy2.reset();
      this.enemyWords[1] = "";
      this.newWords();
    }
    if (
      this.checkHit(this.player, this.enemy3) ||
      this.enemyWords[2].length == 0
    ) {
      this.enemy3.reset();
      this.enemyWords[2] = "";
      this.newWords();
    }
    if (
      this.checkHit(this.player, this.enemy4) ||
      this.enemyWords[3].length == 0
    ) {
      this.enemy4.reset();
      this.enemyWords[3] = "";
      this.newWords();
    }

    // power ups when pressing enter
    // console.log("here: ", this.words.length);
    if (this.words.length == 14) {
      this.rectWidth = 120;
    }
    if (this.words.length == 8) {
      if (this.powerUp >= 3) {
        this.beatText.text = "Nice job";
        this.powerUp = 0;
      }
      this.rectWidth = 0;
      this.graphics.clear();
    }
  }

  checkHit(player, enemy) {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      this.playerHealth -= 1;
      if (this.playerHealth <= 0) {
        this.scene.start("GameOverScene");
      }
      return true;
    } else {
      return false;
    }
  }
}
