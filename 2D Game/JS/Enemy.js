var enemyHealth = 100;
var enemyDamage = 25;
var enemies;
var wave = 1
var totalEnemies = 0
function Enemypreload (scene)
{
    scene.load.spritesheet('enemy', 'Assets/Enemy.png', { frameWidth: 64, frameHeight: 64 });
    
}

function Enemycreate (scene, inPlayer)
{
    if(wave == 1){
        enemies = scene.physics.add.group({
            key: 'enemy',
            repeat: 2,
            setXY: { x: 100, y: 100, stepX: 300 },

        });
        totalEnemies = 3
    }
    enemies.children.iterate(function (child){child.health = enemyHealth; child.invuln = 0;});
    scene.physics.add.overlap(player, enemies, onEnemyOverlapPlayer, null, scene);
}

function onEnemyOverlapPlayer(inPlayer, enemy)
{
    if(inPlayer.anims.currentAnim.key.includes("Attack"))
    {
        if (enemy.invuln == 0)
        {
            enemy.health -= playerDamage;
            enemy.invuln = 60;
            if(enemy.health <= 0){
                enemy.disableBody(true, true)
                totalEnemies --
                if(totalEnemies == 0)
                {
                    wave ++
                    console.log(wave)
                }
            }
        }
    }
    else if (playerInvuln == 0)
    {
        playerHealth -= enemyDamage;
        playerInvuln = 240;
    }
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

    enemies.children.iterate(function (child)
    {
        let enemy = child;
        if (enemy.invuln > 0) enemy.invuln--;
        
        //Moving up
        if (targetY < child.y - 32)
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
        
        
    });
   
}