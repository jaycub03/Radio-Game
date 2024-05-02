class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
    this.win = false;
  }

  preload() {
    //load play background image
    this.load.image("play_background", "../assets/play_background.png");

    //load bg anims atlas
    this.load.atlas(
      "background_atlas",
      "../assets/bg_anims.png",
      "../assets/bg_anims.json"
    );

    //load enemy/player images
    this.load.image("enemy", "../assets/enemy.png");
    this.load.image("player", "../assets/player.png");

    //best song ever
    this.load.audio("music", "../assets/baby_cut.wav");
  }

  create() {
    //create background anims
    this.anims.create({
      key: "bgAnims",
      frames: this.anims.generateFrameNames("background_atlas", {
        prefix: "bg_frame_",
        start: 1,
        end: 4,
        suffix: ".png",
      }),
      frameRate: 4,
      repeat: -1,
    });

    //make background visible and play background anims
    this.bg_anims = this.add.sprite(0, 0, "play_background").setOrigin(0);
    this.bg_anims.anims.play("bgAnims");

    //play the music
    this.song = this.sound.add("music");
    this.song.setVolume(0.3);
    this.song.play();
    this.startTime = this.time.now;
    this.breakTimes = [
      2 * 1000,
      2 * 1000,
      2 * 1000,
      2 * 1000,
      6 * 1000,
      6 * 1000,
      6 * 1000,
      6 * 1000,
      10 * 1000,
      10 * 1000,
      10 * 1000,
      10 * 1000,
      14 * 1000,
      14 * 1000,
      14 * 1000,
      14 * 1000,
      55 * 1000,
      55 * 1000,
      55 * 1000,
      55 * 1000,
      69 * 1000,
      69 * 1000,
      69 * 1000,
      69 * 1000,
      94 * 1000,
      94 * 1000,
      94 * 1000,
      94 * 1000,
    ];

    // words
    this.songLyrics =
      "delay delay delay delay Oh woah Oh woah delay delay delay delay Oh woah oh woah delay delay delay delay oh woah oh woah delay delay delay delay You know you love me Just shout whenever You are my love And we will never Are we an item? Were just friends Said Theres another and My first love broke my heart and I was like Baby baby baby oh Like baby baby baby no Like baby baby baby oh delay delay delay delay I thought youd always be mine mine Baby baby baby oh Like baby baby baby no Like baby baby baby oh delay delay delay delay I thought youd always be mine mine Oh for you I wouldve done whatever I wanna play it cool Ill buy you anything Im in pieces baby fix me till you wake me I just cant believe my first love wont be around Im like Baby baby baby oh Like baby baby baby no Like baby baby baby oh I thought youd always be mine mine Baby baby baby oh Like baby baby baby no Like baby baby baby oh I thought youd always be mine mine"
        .toLowerCase()
        .replace(",", "")
        .replace("?", "")
        .replace("'", "")
        .replace(",", "");
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
    this.hpText = this.add.text(
      game.config.width * 0.9,
      game.config.height * 0.05,
      "HP: " + this.playerHealth
    );

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
      0.2
    ).setOrigin(0, 0);
    this.enemy2 = new enemies(
      this,
      game.config.width / 2,
      0,
      "enemy",
      0,
      0.15
    ).setOrigin(0, 0);
    this.enemy3 = new enemies(
      this,
      0,
      game.config.height / 2,

      "enemy",
      0,
      0.1
    ).setOrigin(0, 0);
    this.enemy4 = new enemies(
      this,
      game.config.width * 0.9,
      game.config.height / 2,
      "enemy",
      0,
      0.2
    ).setOrigin(0, 0);
    this.allEnemies = [this.enemy1, this.enemy2, this.enemy3, this.enemy4];
    // words for enemies
    this.enemyWord1 = this.add.text(this.enemy1.x, this.enemy1.y, "");
    this.enemyWord2 = this.add.text(this.enemy2.x, this.enemy2.y, "");
    this.enemyWord3 = this.add.text(this.enemy3.x, this.enemy3.y, "");
    this.enemyWord4 = this.add.text(this.enemy4.x, this.enemy4.y - 20, "");
    this.enemyTextObjects = [
      this.enemyWord1,
      this.enemyWord2,
      this.enemyWord3,
      this.enemyWord4,
    ];
    this.newWords();

    // power up
    // if the player hits enter at the right times, 2 enemies will slow down
    this.beatText = this.add.text(
      20,
      20,
      "Every once in a while, the player's\nsize will change. To recieve power\nups, Press enter when it incraeses\nin size!"
    );

    // Calculate beat duration in milliseconds
    this.BPM = 60;
    this.beatDuration = (60000 / this.BPM) * 3;

    // Draw a rectangle
    this.lengthOfPowerUp = 25; // # of words before it turns off
    this.startOfPowerUp = parseInt(this.words.length - this.words.length / 5);
    this.characterSize = 0;
    this.powerUp = 0;

    // Set up interval timer for beats
    // increase character size on beat
    this.messageTimer = setInterval(() => {
      if (this.characterSize >= 1 && this.beatTime == true) {
        this.characterSize = 2;
        this.player.setScale(this.characterSize);
      }
    }, this.beatDuration);

    this.graphics = this.add.graphics();

    // Set up timer to shrink the rectangle a few seconds after each beat
    this.shrinkTimer = setInterval(() => {
      if (this.characterSize > 1 && this.beatTime == true) {
        this.characterSize = 1;
        this.player.setScale(this.characterSize);
      }
    }, this.beatDuration + 3000); // Shrink the rectangle 3 seconds after each beat

    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Enter") {
        // Check if the key press is close enough to the beat
        if (this.characterSize > 1 && this.beatTime == true) {
          this.powerUp += 1;
          this.characterSize = 1;
          this.player.setScale(this.characterSize);
        }
      }
    });
  }

  // Get new words
  newWords() {
    for (let i = 0; i < this.enemyWords.length; i += 1) {
      if (
        this.allEnemies[i].x >= 0 &&
        this.allEnemies[i].x <= game.config.width &&
        this.allEnemies[i].y >= 0 &&
        this.allEnemies[i].y <= game.config.height &&
        this.enemyWords[i].length == 0
      ) {
        if (this.words === undefined || this.words.length == 0) {
          this.win = true;
          this.song.stop();
          this.scene.start("GameOverScene", { win: this.win });
        } else {
          let newWord = this.words.shift();

          console.log("word:", newWord, this.breakTimes);
          if (newWord == "delay") {
            this.currentTime = this.time.now;
            this.currentBreak = this.breakTimes.shift();

            // console.log(
            //   this.startTime,
            //   this.currentTime,
            //   this.startTime - this.currentTime,
            //   this.breakTimes[0] - (this.currentTime - this.startTime)
            // );
            if (this.currentTime - this.startTime <= this.breakTimes[0]) {
              this.enemyWords[i] = " ";
              this.allEnemies[i].setStop(true);
              this.time.delayedCall(
                this.currentBreak - (this.currentTime - this.startTime),
                function () {
                  this.allEnemies[i].reset();
                  this.newWords();
                  this.enemyWords[i] = "";
                  this.allEnemies[i].setStop(false);
                },
                [],
                this
              );
            }
          } else {
            this.enemyWords[i] = newWord;
          }
        }
      }
    }
  }

  update() {
    // winning the game!
    if (this.words === undefined || this.words.length == 0) {
      this.win = true;
      this.scene.start("GameOverScene", { win: this.win });
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
    this.enemyWord3.y = this.enemy3.y - 20;
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
    if (this.words.length == this.startOfPowerUp) {
      this.characterSize = 1;
      this.beatTime = true;
    }
    if (this.words.length == this.startOfPowerUp - this.lengthOfPowerUp) {
      this.beatTime = false;
      if (this.powerUp >= 3) {
        this.beatText.text = "Nice job";
        this.enemy1.decreaseSpeed();
        this.enemy2.decreaseSpeed();
        this.powerUp = 0;
      }
      if (this.characterSize > 1) {
        this.characterSize = 1;
        this.player.setScale(this.characterSize);
      }
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
        this.win = false;
        this.song.stop();
        this.scene.start("GameOverScene", { win: this.win });
      }
      this.hpText.text = "HP: " + this.playerHealth;

      return true;
    } else {
      return false;
    }
  }
}
