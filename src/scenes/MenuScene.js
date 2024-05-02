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
      "Press 'P' to play",
      {
        fontSize: "16px",
      }
    );
    this.add.text(
      50,
      200,
      " In this typing game, enemies will have song lyrics associated with them.\nTo destroy the enemies, type in the lyrics before they reach you!\nYou'll win if you can survive the song."
    );
    this.beatText = this.add.text(
      50,
      300,
      " Every once in a while, the player's size will change.\nTo recieve power ups (like slowing down the enemies),\npress enter when it incraese in size!"
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
