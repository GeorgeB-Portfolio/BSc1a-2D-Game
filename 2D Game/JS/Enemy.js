var enemyHealth = 100;
var enemyDamage = 25;
function Enemypreload (scene)
{
    scene.load.spritesheet('enemy', 'Assets/Enemy.png', { frameWidth: 64, frameHeight: 64 });
    
}

function Enemycreate (scene)
{
    enemy = scene.physics.add.sprite(200, 300, 'enemy', [46])
    
}

function enemyDown (scene)
{
    scene.anims.create({
        key: 'Down',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 46, end: 54 }),
        frameRate: 10,
        repeat: -1
    });

}

function enemyLeft (scene)
{
    scene.anims.create({
        key: 'Left',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 23, end: 31 }),
        frameRate: 10,
        repeat: -1
    });

}

function enemyUp (scene)
{
    scene.anims.create({
        key: 'Up',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

}

function enemyRight (scene)
{
    scene.anims.create({
        key: 'Right',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 69, end: 77 }),
        frameRate: 10,
        repeat: -1
    });

}

function Enemyupdate (scene)
{
    targetX = player.x
    targetY = player.y

    //Moving up
    if (targetY < enemy.y - 32)
    {
        enemy.setVelocityY(-100);
        enemy.anims.play("Up", true);

    }
    //Moving down
    else if ( targetY > enemy.y + 32)
    {
        enemy.setVelocityY(100);
        enemy.anims.play("Down", true);

    }
    //Moving left
    if (targetX < enemy.x - 32)
    {
        enemy.setVelocityX(-100);
        enemy.anims.play("Left", true);

    }
    //Moving right
    else if (targetX > enemy.x + 32)
    {
        enemy.setVelocityX(100);
        enemy.anims.play("Right", true);

    }

    else
    {
        enemy.setVelocityX(0)
        enemy.setVelocityY
    }


}