class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {}

  create() {
    this.add.text(
      game.config.width * 0.35,
      game.config.height * 0.1,
      "Lyrics Typer",
      {
        fontSize: "32px",
      }
    );
    this.add.text(
      game.config.width * 0.35,
      game.config.height * 0.15,
      "Press 'P' to select songs",
      {
        fontSize: "16px",
      }
    );

    this.startGame = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );
  }

  update() {
    if (this.startGame.isDown) {
      this.scene.start("PlayScene");
    }
  }
}
