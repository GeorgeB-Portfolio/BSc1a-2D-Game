var playerHealth = 100;
var playerDamage = 50;
var playerHealthUI;

function Playerpreload (scene)
{
    scene.load.spritesheet('player', 'Assets/Player.png', { frameWidth: 64, frameHeight: 64 });
}


function Playercreate (scene)
{
    player = scene.physics.add.sprite(400, 300, 'player', [46])
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    cursors = scene.input.keyboard.createCursorKeys();
    //Displaying the health of the player
    playerHealthUI = scene.add.text(10, 10, 'Health: ' + playerHealth, { fontSize: '25px', fill: 'black' });

}

function playerDown (scene)
{
    scene.anims.create({
        key: 'down',
        frames: scene.anims.generateFrameNumbers('player', { start: 46, end: 54 }),
        frameRate: 10,
        repeat: -1
    });

}

function playerLeft (scene)
{
    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('player', { start: 23, end: 31 }),
        frameRate: 10,
        repeat: -1
    });

}

function playerUp (scene)
{
    scene.anims.create({
        key: 'up',
        frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

}

function playerRight (scene)
{
    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('player', { start: 69, end: 77 }),
        frameRate: 10,
        repeat: -1
    });

}

function Playerupdate ()
{
    //Moving left
    if (cursors.left.isDown)
    {
        player.setVelocityX(-200);
        player.anims.play("left", true);

    }
    //Moving right
    else if (cursors.right.isDown)
    {
        player.setVelocityX(200);
        player.anims.play("right", true)

    }
    //Moving up
    else if (cursors.up.isDown)
    {
        player.setVelocityY(-200);
        player.anims.play("up", true)
        
    }
    //Moving down
    else if (cursors.down.isDown)
    {
        player.setVelocityY(200);
        player.anims.play("down", true);

    }
    //When none are pressed (not moving)
    else
    {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.stop();

    }

}