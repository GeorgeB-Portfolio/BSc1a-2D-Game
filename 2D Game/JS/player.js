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

function Playerupdate ()
{
    //Moving left
    if (cursors.left.isDown)
    {
        player.setVelocityX(-200);

    }
    //Moving right
    else if (cursors.right.isDown)
    {
        player.setVelocityX(200);

    }
    //Moving up
    else if (cursors.up.isDown)
    {
        player.setVelocityY(-200);

    }
    //Moving down
    else if (cursors.down.isDown)
    {
        player.setVelocityY(200);

    }
    //When none are pressed (not moving)
    else
    {
        player.setVelocityX(0);
        player.setVelocityY(0);

    }

}