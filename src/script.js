class Level0 extends Phaser.Scene {
  constructor() {
    super("Level0");
  }

  preload() {
    this.load.path = "../assets/";
    // this.load.image("red", "red.png");
    // this.load.image("green", "green.png");
    // this.load.image("black", "black.png");
  }

  create() {
    this.challenge = 0;
    this.w = this.game.config.width;
    this.h = this.game.config.height;
    this.s = this.game.config.width * 0.01;

    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x000000, 1);
    // Seprator line
    this.graphics.fillRect(0, this.h * 0.01, this.w * 0.95, this.w * 0.005);

    // Instructions from radio
    this.challengesText = this.add
      .text(this.w * 0.02, this.h * 0.03, "Be prepared for the challenges...")
      .setStyle({ fontSize: `${3 * this.s}px`, color: "blue" });

    // change levels:
    this.levelText = this.add
      .text(this.w * 0.75, this.h * 0.03, "next level ")
      .setStyle({ fontSize: `${1.5 * this.s}px`, color: "blue" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("LevelSlider");
      });
    // Radio
    this.currentStation = 98;
    this.graphics.lineStyle(5, 0x000000); // 10 is the thickness of the line, 0xffffff is white color (you can change it to any color you want)
    this.graphics.strokeRect(
      this.w * 0.01,
      this.h * 0.23,
      this.w * 0.8,
      this.h * 0.75
    );
    // changing station frq
    this.station = this.add
      .text(this.w * 0.08, this.h * 0.25, `${this.currentStation} fm`)
      .setStyle({ fontSize: `${3 * this.s}px`, color: "#000000" });
    this.add
      .text(this.w * 0.02, this.h * 0.25, "⬆️")
      .setStyle({ fontSize: `${3 * this.s}px` })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.currentStation += 1;
      });
    this.add
      .text(this.w * 0.2, this.h * 0.25, "⬇️")
      .setStyle({ fontSize: `${3 * this.s}px` })
      .setInteractive({ useHandCursor: true })
      // .on("pointerover", () => this.showMessage("Fullscreen?"))
      .on("pointerdown", () => {
        this.currentStation -= 1;
      });

    this.challenges();
    // New challenge every x seconds

    // if (this.scale.isFullscreen) {
    //   this.scale.stopFullscreen();
    // } else {
    //   this.scale.startFullscreen();
    // }
  }

  challenges() {
    this.time.delayedCall(
      5000,
      function () {
        this.challenge = Math.floor(Math.random() * 3) + 1;
        if (this.challenge == 1) {
          this.challengeStation =
            Math.floor(Math.random() * (108 - 83 + 1)) + 83;
          this.challengesText.text = `Can you tune the station to ${this.challengeStation}?`;
          this.tooLong = this.time.delayedCall(
            7000,
            function () {
              if (this.challenge == 1) {
                this.challengesText.text = "You took too long...";
                this.challenge = 0;
                this.challenges();
              }
            },
            [],
            this
          );
        } else {
          this.scene.start("LevelSlider");
        }
      },
      [],
      this
    );
  }
  update() {
    this.station.text = `${this.currentStation} fm`;
    if (this.challenge == 1) {
      if (this.currentStation == this.challengeStation) {
        this.challengesText.text = `Nice job! You got xx`;
        this.challenge = 0;
        this.tooLong.remove();
        this.challenges();
      }
    }
  }
}

class LevelSlider extends Phaser.Scene {
  constructor() {
    super("LevelSlider");
  }

  preload() {
    this.load.path = "../assets/";
    this.load.image("red", "red.png");
    this.load.image("green", "green.png");
    this.load.image("black", "black.png");
  }

  create() {
    this.w = this.game.config.width;
    this.h = this.game.config.height;
    this.s = this.game.config.width * 0.01;

    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x000000, 1);
    // Seprator line
    this.graphics.fillRect(0, this.h / 2, this.w * 0.95, this.w * 0.005);

    // Instructions from radio
    this.challengesText = this.add
      .text(
        this.w * 0.02,
        this.h * 0.15,
        "hmm, the radio is making a lot of static noise,\ncan you bang it at the right power to fix it?"
      )
      .setStyle({ fontSize: `${2 * this.s}px`, color: "blue" });

    // change levels:
    this.levelText = this.add
      .text(this.w * 0.65, this.h * 0.15, "next level")
      .setStyle({ fontSize: `${3 * this.s}px`, color: "blue" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("Level0");
      });
    // Radio

    // hmm, the radio is making a lot of static noise, can you bang it at the right power to fix it?
    this.add
      .image(this.w * 0.01, this.h * 0.8, "black")
      .setScale(3, 0.7)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.stopSlider(
          this.slider.x - this.w * 0.01,
          this.w * targetX,
          targetW
        );
      });

    let targetX = 0.1 + Math.random() * 0.7;
    let targetW = 0.1 + Math.random() * 0.15;
    if (this.w * targetX + this.w * targetW > this.w * 0.8) {
      targetX -= targetW;
    }
    this.target = this.add
      .image(this.w * targetX, this.h * 0.8, "green")
      .setScale(targetW, 0.56)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.stopSlider(
          this.slider.x - this.w * 0.01,
          this.w * targetX,
          targetW
        );
      });

    this.slider = this.add
      .image(this.w * 0.01, this.h * 0.8, "red")
      .setScale(this.w * 0.00005, 0.767)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.stopSlider(this.slider.x, this.w * targetX, targetW);
      });

    this.moveLine(this.w * 0.8, this.w * 0.01, this.slider);

    // if (this.scale.isFullscreen) {
    //   this.scale.stopFullscreen();
    // } else {
    //   this.scale.startFullscreen();
    // }
  }

  update() {}

  moveLine(x, originalX, line) {
    this.tween = this.tweens.add({
      targets: line,
      x: x,
      duration: 1500,
      onComplete: () => {
        // Start moving the line again
        this.moveLine(originalX, x, line);
      },
    });
  }
  // slider x:  263.75466666666665  target:  275.54520335800197 0.1678783234048406

  stopSlider(sliderX, targetX, targetW) {
    this.tween.stop();
    console.log(
      "slider x: ",
      sliderX,
      " target: ",
      this.target.x,
      targetX,
      targetW
    );
    if (
      sliderX > targetX - targetX * targetW &&
      sliderX < targetX + targetX * targetW
    ) {
      this.challengesText.text = "Nice job! You got it!";
      this.time.delayedCall(
        4000,
        function () {
          this.scene.start("Level0");
        },
        [],
        this
      );
    } else {
      this.challengesText.text = "Out of bounds...";
      this.time.delayedCall(
        4000,
        function () {
          this.scene.start("Level0");
        },
        [],
        this
      );
    }
    // console.log("good!");
  }
}

class Car extends Phaser.Scene {
  constructor() {
    super("Car");
  }
  player;
  cursors;
  preload() {
    this.load.path = "../assets/";
    this.load.image("player", "car.png");
  }
  //Adding in a different 2d endless runner to check how it would be like
  create() {
    //this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.sprite(64, 200, 'player');
    //this.player = this.physics.add.image(300, 200, 'player');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});
  }

  update(){
    this.player.setVelocity(0);
    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-300);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(300);
    }
    if (this.cursors.up.isDown)
    {
      this.player.setVelocityY(-300);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.setVelocityY(300);
    }
  }
}

const configCar = {
  type: Phaser.WEBGL,
  width: 800,
  height: 300,
  backgroundColor: 0x000000,
  physics:{
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [Car],
};

const configRadio = {
  type: Phaser.WEBGL,
  width: 800,
  height: 300,
  backgroundColor: 0xffffff,
  scene: [Level0, LevelSlider],
};

const gameCar = new Phaser.Game(configCar);
const gameRadio = new Phaser.Game(configRadio);
gameCar.scene.add("Scene2", configRadio.scene, true);
