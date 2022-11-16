var playerHealth = 100;
var playerDamage = 50;
var playerHealthUI;
var playerInvuln = 0;
var animResetTimer;
var currentAnimation = "";
var facing = "";
var gameOver = false;

function Playerpreload (scene)
{
    scene.load.spritesheet('player', 'Assets/Player.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('playerAttackUp', 'Assets/PlayerAttackUpTest.png', { frameWidth: 86, frameHeight: 69})
    scene.load.spritesheet('playerAttackLeft', 'Assets/PlayerAttackLeftTest.png', { frameWidth: 90, frameHeight: 51})
    scene.load.spritesheet('playerAttackDown', 'Assets/PlayerAttackDownTest.png', { frameWidth: 86, frameHeight: 72})
    scene.load.spritesheet('playerAttackRight', 'Assets/PlayerAttackRightTest.png', { frameWidth: 92, frameHeight: 52})
}


function Playercreate (scene)
{
    player = scene.physics.add.sprite(400, 300, 'player', [46])
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    cursors = scene.input.keyboard.createCursorKeys();
    keys = scene.input.keyboard.addKeys('SPACE')
    //Displaying the health of the player
    playerHealthUI = scene.add.text(10, 10, 'Health: ' + playerHealth, { fontSize: '25px', fill: 'black' });
    playerDown(scene);
    player.anims.play('down', true);
    return player

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

function playerAttackUp (scene)
{
    scene.anims.create({
        key: 'PlayerAttackUp', 
        frames: scene.anims.generateFrameNumbers('playerAttackUp', { start: 0, end: 0 }), 
        frameRate: 10,
        repeat: -1
    });

}

function playerAttackLeft (scene)
{
    
    scene.anims.create({
        key: 'PlayerAttackLeft', 
        frames: scene.anims.generateFrameNumbers('playerAttackLeft', { start: 0, end: 0 }), 
        frameRate: 10,
        repeat: -1
    });
    
}

function playerAttackDown (scene)
{
    
    scene.anims.create({
        key: 'PlayerAttackDown', 
        frames: scene.anims.generateFrameNumbers('playerAttackDown', { start: 0, end: 0 }), 
        frameRate: 10,
        repeat: -1
    });
    
}

function playerAttackRight (scene)
{
    
    scene.anims.create({
        key: 'PlayerAttackRight', 
        frames: scene.anims.generateFrameNumbers('playerAttackRight', { start: 0, end: 0 }), 
        frameRate: 10,
        repeat: -1
    });
    
}

function Playerupdate (scene)
{
    if (gameOver){
        gameOver = false
        scene.scene.restart();
    }

    //Displaying the health of the player
    playerHealthUI.setText('Health: ' + playerHealth);

    if (playerInvuln > 0) playerInvuln--;
    //Moving left
    if (cursors.left.isDown)
    {
        player.setVelocityX(-200);
        player.anims.play("left", true);
        facing = "left"
        clearTimeout(animResetTimer);
    }
    //Moving right
    else if (cursors.right.isDown)
    {
        player.setVelocityX(200);
        player.anims.play("right", true)
        facing = "right"
        clearTimeout(animResetTimer);
    }
    //Moving up
    else if (cursors.up.isDown)
    {
        player.setVelocityY(-200);
        player.anims.play("up", true)
        facing = "up"
        clearTimeout(animResetTimer);
    }
    //Moving down
    else if (cursors.down.isDown)
    {
        player.setVelocityY(200);
        player.anims.play("down", true);
        facing = "down"
        clearTimeout(animResetTimer);
    }
    //When none are pressed (not moving)
    else
    {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.stop();

    }

    if(Phaser.Input.Keyboard.JustDown(keys.SPACE))
    {
        if (!player.anims.currentAnim.key.includes("Attack")) currentAnimation = player.anims.currentAnim;
        clearTimeout(animResetTimer);
        if(facing == "up"){
            player.anims.play("PlayerAttackUp", true);
        }

        if(facing == "left"){
            player.anims.play("PlayerAttackLeft", true);
        }

        if(facing == "down"){
            player.anims.play("PlayerAttackDown", true)
        }

        if(facing == "right"){
            player.anims.play("PlayerAttackRight", true)
        }
        
        animResetTimer = setTimeout(resetAnim, 100, currentAnimation);
    }

    if(playerHealth <= 0){
        gameOver = true
        playerHealth = 100;
    }

}

function resetAnim(anim)
{
    player.anims.play(anim, true);
}