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

function Enemyupdate (scene)
{
    targetX = player.x
    targetY = player.y

    //Moving up
    if (targetY < enemy.y)
    {
        enemy.setVelocityY(-100);

    }
    //Moving down
    else if ( targetY > enemy.y)
    {
        enemy.setVelocityY(100);

    }
    //Moving left
    if (targetX < enemy.x)
    {
        enemy.setVelocityX(-100);

    }
    //Moving right
    else if (targetX > enemy.x)
    {
        enemy.setVelocityX(100);
        
    }

    else
    {
        enemy.setVelocityX(0)
        enemy.setVelocityY
    }


}