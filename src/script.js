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
  scene: [MenuScene, PlayScene, GameOverScene],
};

const game = new Phaser.Game(config);
