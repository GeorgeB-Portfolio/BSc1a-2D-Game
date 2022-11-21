var enemyHealth = 100;
var enemyDamage = 25;
var enemies;
var wave = 1
var lastFrameTime = Date.now();
var totalEnemies = 0
var victory = false;
function Enemypreload (scene)
{
    //load enemy sprite
    scene.load.spritesheet('enemy', 'Assets/Enemy.png', { frameWidth: 64, frameHeight: 64 });
}

function Enemycreate (scene, inPlayer)
{
    //Adding the r key as as option which is later used for resetting the scene after vicotry.
    keys2 = scene.input.keyboard.addKeys('R')
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

    //Victory screen
    if(wave == 6)
    {
        //Text at the center of the screen saying "You Win!"
        victory = scene.add.text(150, 250, 'You Win!', {fontSize: '100px', fill: 'black'});
        //Text under the victory message telling the player how to restart.
        restart = scene.add.text(130, 350, 'Press r to restart', {fontSize: '50px', fill: 'black'})
        victory = true
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
            //Enemy takes damage equivalent to the players damage
            enemy.health -= playerDamage;
            //enemy gains temporary invulnerabilty to damage so they don't just instantly die from one press.
            enemy.invuln = Math.floor(400 / (Date.now() - lastFrameTime));
            if(enemy.health <= 0){
                //enemy dying when at 0 or less health.
                enemy.disableBody(true, true)
                //taking away from total number of enemies so that once all enemies have died it will reach 0 and begin new wave.
                totalEnemies --
                //Creating the health collectible where the enemy died.
                health.create(enemy.x, enemy.y, "health")

                //Progressing to next wave if no enemies are left.
                if(totalEnemies == 0)
                {
                    wave ++
                    Enemycreate(this)
                }
            }
        }
    }
    //If the player currently isn't in an attack animaiton (attacking) and isn't invulnerable then the player takes damage and gains brief invulnerability
    else if (playerInvuln == 0)
    {
        playerHealth -= enemyDamage;
        playerInvuln = Math.floor(1500 / (Date.now() - lastFrameTime));
    }
}

//called when player overalps a health consumable
function playerHealing(inPlayer, health)
{
    //making sure adding the health increase wouldn't go over 100 then adding health to the player if.
    if(playerHealth + 5 < 100 )
    {
        playerHealth = playerHealth + 5
        health.disableBody(true,true)
    }
    //If it would add up to more than 100 then just sets the health to 100 (ensures health is never greater than 100)
    else if(playerHealth < 100)
    {
        playerHealth = 100
        health.disableBody(true,true)
    }
    //If the player health is equal to 100 then just stays at 100 and doesn't collect the health consumable
    else if(playerHealth = 100)
    {
        playerHealth = 100
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
    lastFrameTime = Date.now();
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

        //When the player kills all the enemies of the final wave victory is set to true which then has it constantly true so this condition can be checked in case the player presses r to restart
        if(victory == true)
        {
            if(Phaser.Input.Keyboard.JustDown(keys2.R))
        {
            gameOver = true
        }
        }
                
    });
    
}