class Introduction extends Phaser.Scene {
  constructor() {
    super("Introduction");
  }

  preload() {}

  create() {
    this.textObject = this.add.text(
      70, //x
      70, //y
      "testing..." //text
    );
  }

  update() {}
}

class Video extends Phaser.Scene {
  constructor() {
    super("Video");
  }

  preload() {}

  create() {}

  update() {}
}

let config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [Introduction],
};
let game = new Phaser.Game(config);
