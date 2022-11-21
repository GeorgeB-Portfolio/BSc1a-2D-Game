var enemyHealth = 100;
var enemyDamage = 25;
var enemies;
var wave = 1
var totalEnemies = 0
function Enemypreload (scene)
{
    //load enemy sprite
    scene.load.spritesheet('enemy', 'Assets/Enemy.png', { frameWidth: 64, frameHeight: 64 });
}

function Enemycreate (scene, inPlayer)
{
    //create enemies of wave 1
    if(wave == 1){
        //spawning 3 enemies
        enemies = scene.physics.add.group({
            key: 'enemy',
            repeat: 2,
            setXY: { x: 100, y: 100, stepX: 300 },

        });
        //The total number of enemies of the wave so can take away enemies as they die to know when all enemies die to begin next wave
        totalEnemies = 3
    }
    
    if(wave == 2){
        //Spawning a total of 6 enemies 3 at the top 3 at the the bottom
        for (let i = 0; i < 3; i++)
        {
            //Spawning enemies at the top (same places as wave 1)
            enemies.create(100 + (i * 300), 100, "enemy");
            //Spawning enemies same pattern as the top but below the player
            enemies.create(100 + (i * 300), 500, "enemy");
        }
        
        totalEnemies = 6
    }

    
    if(wave == 3){
        //Same spawning as last wave
        for (let i = 0; i < 3; i++)
        {
            enemies.create(100 + (i * 300), 100, "enemy");
            enemies.create(100 + (i * 300), 500, "enemy");
        }
        //2 extra enemies being spawned at each side of the player
        enemies.create(100, 300, 'enemy');
        enemies.create(600, 300, 'enemy');
        totalEnemies = 8

    }
     
    //All spawning same as previous wave.
    if(wave == 4){
        for (let i = 0; i < 3; i++)
        {
            enemies.create(100 + (i * 300), 100, "enemy");
            enemies.create(100 + (i * 300), 500, "enemy");
        }
        enemies.create(100, 300, 'enemy');
        enemies.create(600, 300, 'enemy');
        totalEnemies = 8

    }
    //All spawning same as previous wave.
    if(wave == 5){
        for (let i = 0; i < 3; i++)
        {
            enemies.create(100 + (i * 300), 100, "enemy");
            enemies.create(100 + (i * 300), 500, "enemy");
        }
        enemies.create(100, 300, 'enemy');
        enemies.create(600, 300, 'enemy');
        totalEnemies = 8
         
    }
    //Giving all enemy created in the enemies group health and the invulnerability timer
    enemies.children.iterate(function (child){child.health = enemyHealth; child.invuln = 0;});
    //Player and enemy overlap for both player and enemy attacking
    scene.physics.add.overlap(player, enemies, onEnemyOverlapPlayer, null, scene);
    //Health collectible group
    health = scene.physics.add.group()
    //Player and health overlap for the health collectible
    scene.physics.add.overlap(player, health, playerHealing, null, scene);
}

function onEnemyOverlapPlayer(inPlayer, enemy)
{
    //Player attacking enemy through their current animation inculding attack while overlapping an enemy
    if(inPlayer.anims.currentAnim.key.includes("Attack"))
    {
        //If the enemy is not invulnerable then taking damage and gaining brief invulnerability (less than the player as they can pile up a lot more on the player)
        if (enemy.invuln == 0)
        {
            enemy.health -= playerDamage;
            enemy.invuln = 60;
            if(enemy.health <= 0){
                enemy.disableBody(true, true)
                totalEnemies --
                health.create(enemy.x, enemy.y, "health")
                if(totalEnemies == 0)
                {
                    wave ++
                    console.log(wave)
                    Enemycreate(this)
                }
            }
        }
    }
    //If the player currently isn't in an attack animaiton (attacking) and isn't invulnerable then the player takes damage and gains brief invulnerability
    else if (playerInvuln == 0)
    {
        playerHealth -= enemyDamage;
        playerInvuln = 240;
    }
}

//called when player overalps a health consumable
function playerHealing(inPlayer, health)
{
    //making sure adding the health increase wouldn't go over 100 then adding health to the player if.
    if(playerHealth + 2 < 100 )
    {
        playerHealth = playerHealth + 2
        health.disableBody(true,true)
    }
    //If it would add up to more than 100 then just sets the health to 100 (ensures health is never greater than 100)
    else
    {
        playerHealth = 100
        health.disableBody(true,true)
    }
}

//Moving enemy down 
function enemyDown (scene)
{
    scene.anims.create({
        key: 'Down',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 46, end: 54 }),
        frameRate: 10,
        repeat: -1
    });
    
}

//moving enemy left
function enemyLeft (scene)
{
    scene.anims.create({
        key: 'Left',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 23, end: 31 }),
        frameRate: 10,
        repeat: -1
    });
    
}

//moving enemy up
function enemyUp (scene)
{
    scene.anims.create({
        key: 'Up',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
}

//moving enemy right
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
    //setting the target position to the players.
    targetX = player.x
    targetY = player.y
    
    enemies.children.iterate(function (child)
    {
        let enemy = child;
        //decreasing enemy invulnerability timer if the enemies currently invulnerable
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
        
        //Stop moving
        else
        {
            enemy.setVelocityX(0)
            enemy.setVelocityY
        }
                
    });
    
}