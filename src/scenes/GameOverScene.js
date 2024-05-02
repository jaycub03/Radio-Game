class GameOverScene extends Phaser.Scene {
    constructor() {
      super("GameOverScene");
      this.winText = "";
    }

    init(data)
    {
      this.win = data.win || 0
    }
  
    preload() {

    }
  
    create() {

      if (this.win == true)
      {
        this.winText = " You Win!"
      }

      else
      {
        this.winText = " You Lose."
      }

      this.add.text(
        game.config.width * 0.35,
        game.config.height * 0.1,
        this.winText,
        {
          fontSize: "32px",
        }
      );

      this.add.text(
        game.config.width * 0.35,
        game.config.height * 0.15,
        "Press 'P' to play again",
        {
          fontSize: "16px",
        }
      );

      this.add.text(
        game.config.width * 0.2,
        game.config.height * 0.3,
        "Credits:\nMika - typing mechanics and powerups\nIchiro - enemy spawns and movement\nJacob - character/enemy sprites and sound\nEmil - background sprite/animation and credits",
        {
          fontSize: "20px",
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
  