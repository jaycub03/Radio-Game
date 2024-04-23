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
    this.w = this.game.config.width;
    this.h = this.game.config.height;
    this.s = this.game.config.width * 0.01;

    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x000000, 1);
    // Seprator line
    this.graphics.fillRect(0, this.h / 2, this.w * 0.95, this.w * 0.005);

    // Instructions from radio
    this.challengesText = this.add
      .text(this.w * 0.02, this.h * 0.52, "Be prepared for the challenges...")
      .setStyle({ fontSize: `${3 * this.s}px`, color: "blue" });

    // change levels:
    this.levelText = this.add
      .text(this.w * 0.75, this.h * 0.52, "level ")
      .setStyle({ fontSize: `${3 * this.s}px`, color: "blue" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("LevelSlider");
      });
    // Radio
    this.currentStation = 98;
    this.graphics.lineStyle(5, 0x000000); // 10 is the thickness of the line, 0xffffff is white color (you can change it to any color you want)
    this.graphics.strokeRect(
      this.w * 0.01,
      this.h * 0.62,
      this.w * 0.8,
      this.h * 0.35
    );
    // changing station frq
    this.station = this.add
      .text(this.w * 0.08, this.h * 0.65, `${this.currentStation} fm`)
      .setStyle({ fontSize: `${3 * this.s}px`, color: "#000000" });
    this.add
      .text(this.w * 0.02, this.h * 0.65, "⬆️")
      .setStyle({ fontSize: `${3 * this.s}px` })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.currentStation += 1;
      });
    this.add
      .text(this.w * 0.2, this.h * 0.65, "⬇️")
      .setStyle({ fontSize: `${3 * this.s}px` })
      .setInteractive({ useHandCursor: true })
      // .on("pointerover", () => this.showMessage("Fullscreen?"))
      .on("pointerdown", () => {
        this.currentStation -= 1;
      });

    // if (this.scale.isFullscreen) {
    //   this.scale.stopFullscreen();
    // } else {
    //   this.scale.startFullscreen();
    // }
  }

  update() {
    this.station.text = `${this.currentStation} fm`;
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
          this.w * targetW
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
          this.w * targetW
        );
      });

    this.slider = this.add
      .image(this.w * 0.01, this.h * 0.8, "red")
      .setScale(this.w * 0.00005, 0.767)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.stopSlider(
          this.slider.x - this.w * 0.01,
          this.w * targetX,
          this.w * targetW
        );
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

  stopSlider(sliderX, targetX, targetW) {
    this.tween.stop();
    if (sliderX > targetX && sliderX < targetX + targetW) {
      // console.log("good!");
    }
  }
}

class Car extends Phaser.Scene {
  constructor() {
    super("Car");
  }

  preload() {}

  create() {}

  update() {}
}

let configCar = {
  type: Phaser.WEBGL,
  width: 800,
  height: 300,
  backgroundColor: 0xffffff,
  scene: [Car],
};

let configRadio = {
  type: Phaser.WEBGL,
  width: 800,
  height: 300,
  backgroundColor: 0xffffff,
  scene: [Level0, LevelSlider],
};

let gameCar = new Phaser.Game(configCar);
let gameRadio = new Phaser.Game(configRadio);
game.scene.add("Scene2", config2.scene, true);
