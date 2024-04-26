class enemies extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    this.moveSpeed = 1;
    this.initialX = x;
    this.initialY = y;
  }

  update() {
    const px = game.config.width / 2;
    const py = game.config.height / 2;
    const x = this.x;
    const y = this.y;

    const rotation = Phaser.Math.Angle.Between(x, y, px, py);
    this.setRotation(rotation);
    //this.scene.physics.velocityFromRotation(this.rotation, this.moveSpeed);
    if(x >= px && y >= py){
      this.x -= this.moveSpeed;
      this.y -= this.moveSpeed;      
    }
    if(x >= px && y <= py){
      this.x -= this.moveSpeed;
      this.y += this.moveSpeed;      
    }
    if(x <= px && y >= py){
      this.x += this.moveSpeed;
      this.y -= this.moveSpeed;      
    }
    if(x <= px && y <= py){
      this.x += this.moveSpeed;
      this.y += this.moveSpeed;      
    }
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}
