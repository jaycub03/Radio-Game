class MenuScene extends Phaser.Scene {
    constructor() {
      super("MenuScene");
    }
  
    preload() {

    }
  
    create() {

        this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }

    update() {

        if (this.startGame.isDown)
        {
            this.scene.start('PlayScene')
        }
    }
}
  