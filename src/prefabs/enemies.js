class enemies extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    this.moveSpeed = 4;
  }

  update() {
    const px = game.config.width / 2;
    const py = game.config.height / 2;
    const x = this.x;
    const y = this.y;

    const rotation = Phaser.Math.Angle.Between(x, y, tx, ty);
    this.setRotation(rotation);
  }

  reset() {}
}
