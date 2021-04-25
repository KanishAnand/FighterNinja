var stars = [], enemies = [], planeBullets = [], enemyBullets = [], fireBlast = [];
var plane, camera, scenery, scene, fire, renderer, time = 0;
var firevertShader, firefragShader;

main();

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 38) { // up
        camera.position.z -= plane.VELOCITY;
        plane.obj.position.z -= plane.VELOCITY;
        plane.dist += 1;
    } else if (keyCode == 40) { // down
        camera.position.z += plane.VELOCITY;
        plane.obj.position.z += plane.VELOCITY;
    } else if (keyCode == 37) { // left
        camera.position.x -= plane.VELOCITY;
        plane.obj.position.x -= plane.VELOCITY;
    } else if (keyCode == 39) { // right
        camera.position.x += plane.VELOCITY;
        plane.obj.position.x += plane.VELOCITY;
    }
    else if(keyCode == 32){
        // space: fire bullets on enemies
        this.planeBullets.push(new PlaneBullets(scene, plane.obj.position.x - 0.8, plane.obj.position.y, plane.obj.position.z - 1));
        this.planeBullets.push(new PlaneBullets(scene, plane.obj.position.x + 0.8, plane.obj.position.y, plane.obj.position.z - 1));
    }
};

// Function to generate random number 
function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
} 

function removeObjects(){
    newStars = [];
    newEnemies = [];
    newplaneBullets = [];
    newenemyBullets = [];
    newfireBlast = [];

    for(const star of this.stars){
        if(star.obj){
            if(star.obj.position.z > camera.position.z){
                scene.remove(star.obj);
            }
            else{
                newStars.push(star);
            }
        }
        else{
            newStars.push(star);
        }
    }
    
    for(const enemy of this.enemies){
        if(enemy.obj){
            if(enemy.obj.position.z > camera.position.z){
                scene.remove(enemy.obj);
            }
            else if(enemy.flag == 1 &&  plane.obj.position.z - enemy.obj.position.z >= 30){
                scene.remove(enemy.obj);
            }
            else{
                newEnemies.push(enemy);
            }
        }
        else{
            newEnemies.push(enemy);
        }
    }

    for(const bullet of this.planeBullets){
        if(bullet.obj){
            if(bullet.dist > 20){
                scene.remove(bullet.obj);
            }
            else{
                newplaneBullets.push(bullet);
            }
        }
        else{
            newplaneBullets.push(bullet);
        }
    }

    for(const bullet of this.enemyBullets){
        if(bullet.obj){
            if(bullet.obj.position.z > camera.position.z){
                scene.remove(bullet.obj);
            }
            else{
                newenemyBullets.push(bullet);
            }
        }
        else{
            newenemyBullets.push(bullet);
        }
    }

    for(const blast of this.fireBlast){
        if(blast.mesh.position.y >= 10){
            scene.remove(blast.mesh);
        }
        else{
            newfireBlast.push(blast);
        }
    }
    
    this.stars = newStars;
    this.enemies = newEnemies;
    this.planeBullets = newplaneBullets;
    this.enemyBullets = newenemyBullets;
    this.fireBlast = newfireBlast;
}

function createStars(){
    numStars = parseInt(randomNumber(0,7));
    var x = plane.obj.position.x, deltaX = 10;
    var z = plane.obj.position.z, deltaZ = -5;
    
    for(i = 0; i < numStars; i++){
        // both stars and plane will have same y coordinate
        this.stars.push(new Star(scene, randomNumber(x - deltaX, x + deltaX), plane.obj.position.y, randomNumber(z + deltaZ, z + 8*deltaZ)));
    }
}

function createEnemies(){
    var posx = plane.obj.position.x - 5, deltaX = 10;
    var posz = plane.obj.position.z - 30, deltaZ = 100;
    var x = randomNumber(posx - deltaX, posx);
    var z = randomNumber(posz - deltaZ, posz);
    var y = plane.obj.position.y ;
    var offset = 1;
    
    numEnemies = 3;
    for(i = 0; i < numEnemies; i++){
        this.enemies.push(new Enemy(scene, x - i*offset, y, z - i*offset));
    }
}

function createEnemyBullets(){
    for(const enemy of this.enemies){
        if(enemy.obj){
            if(enemy.bulletInterval >= enemy.bulletThreshold){
                if(randomNumber(0,1) <= 0.3){
                    this.enemyBullets.push(new EnemyBullets(scene, enemy.obj.position.x , enemy.obj.position.y, enemy.obj.position.z));
                }
                enemy.bulletInterval = 0;
            }
            else{
                enemy.bulletInterval += 1;
            }
        }
    }
}

function rotatemoveObjects(){
    for(const star of this.stars){
        if(star.obj){
            star.obj.rotation.y += star.AngularVelocity;
        }
    }
 
    for(const enemy of this.enemies){
        if(enemy.obj){
            enemy.obj.position.x += enemy.SPEEDX;
            enemy.obj.position.y += enemy.SPEEDY;
            enemy.obj.position.z += enemy.SPEEDZ;
            if(enemy.flag == 0 && (plane.obj.position.z - enemy.obj.position.z) <= 0){
                enemy.flag = 1;
                enemy.obj.rotation.y += Math.PI;
                enemy.SPEEDZ = -enemy.SPEEDZ;
            }
        }
    }

    for(const bullet of this.planeBullets){
        if(bullet.obj){
            bullet.dist += 1;
            bullet.obj.position.z += bullet.VELOCITY;
        }
    }

    for(const bullet of this.enemyBullets){
        if(bullet.obj){
            bullet.obj.position.z += bullet.VELOCITY;
        }
    }
}

function checkTouching(firstObj, secondObj) {
    dist = firstObj.position.distanceTo(secondObj.position);
    if(dist < 1){
        return true;
    }
    return false;
  }

function checkCollision(){
    // collision of plane with stars
    newStars = [];
    for(const star of this.stars){
        if(star.obj){
            if(checkTouching(plane.obj, star.obj)){
                plane.score += star.scoreChange;
                scene.remove(star.obj);
            }
            else{
                newStars.push(star);
            }
        }
        else{
            newStars.push(star);
        }
    }
    this.stars = newStars;
    
    // collision of plane with enemies
    newEnemies = [];
    for(const enemy of this.enemies){
        if(enemy.obj){
            if(checkTouching(plane.obj, enemy.obj)){
                fireBlast.push(new Fire(scene, camera, renderer, firevertShader, firefragShader, plane.obj.position.x, plane.obj.position.y, plane.obj.position.z));
                plane.health += enemy.healthChange;
                scene.remove(enemy.obj);
            }
            else{
                newEnemies.push(enemy);
            }
        }
        else{
            newEnemies.push(enemy);
        }
    }
    this.enemies = newEnemies;

    // collision of plane bullets with enemies;
    newplaneBullets = [];
    for(const bullet of this.planeBullets){
        if(bullet.obj){
            flag = false
            newEnemies = [];
            for(const enemy of this.enemies){
                if(enemy.obj){
                    if(checkTouching(bullet.obj, enemy.obj)){
                        flag = true;
                        scene.remove(enemy.obj);
                    }
                    else{
                        newEnemies.push(enemy);    
                    }
                }
                else{
                    newEnemies.push(enemy);
                }
            }
            
            this.enemies = newEnemies;
            if(flag){
                plane.score += bullet.firedScore;
                scene.remove(bullet.obj);
            }
            else{
                newplaneBullets.push(bullet);
            }
        }
        else{
            newplaneBullets.push(bullet);
        }
    }
    this.planeBullets = newplaneBullets;
    
    // collision of plane with enemy bullets
    newenemyBullets = [];
    for(const bullet of this.enemyBullets){
        if(bullet.obj){
            if(checkTouching(plane.obj, bullet.obj)){
                // fireBlast.push(new Fire(scene, camera, renderer, firevertShader, firefragShader, plane.obj.position.x, plane.obj.position.y, plane.obj.position.z));
                plane.health += bullet.healthChange;
                scene.remove(bullet.obj);
            }
            else{
                newenemyBullets.push(bullet);
            }
        }
        else{
            newenemyBullets.push(bullet);
        }
    }
    this.enemyBullets = newenemyBullets;
}

function updateHUD(){
    document.getElementById("score").innerHTML = "Score: " + plane.score;
    document.getElementById("health").innerHTML = "Health: " + plane.health;
    document.getElementById("time").innerHTML = "Time Left: " + plane.time;
}

function main() {
    scene = new THREE.Scene();
    var Light = new THREE.DirectionalLight(0x404040,10);
    scene.add(Light);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth/ window.innerHeight, 1, 20000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', function(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    })

    window.addEventListener("keydown", onDocumentKeyDown, false);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    camera.position.set(0,5,8);
    camera.rotation.x += -0.4;

    scenery = new Scenery(scene, renderer);
    scenery.updateSun(scene);

    plane = new Plane(scene);

    firevertShader = document.getElementById( 'vertexShader' ).textContent;
	firefragShader = document.getElementById( 'fragmentShader' ).textContent;
    clock = new THREE.Clock();

    //game logic
    var update = function(){
        if(plane.time <= 0){
            plane.time = 0;
            document.getElementById("over").innerHTML = "Game Won!";
            return;
        }

        if(plane.health <= 0){
            plane.health = 0;
            document.getElementById("over").innerHTML = "Game Over!";
            return;
        }

        // remove objects which are passed back
        removeObjects();

        // detect collisions with objects
        checkCollision();
        
        if(plane.dist >= 15){
            //create new objects
            createStars();
            createEnemies();
            plane.dist = 0;
        }
        
        createEnemyBullets();
        
        rotatemoveObjects();

        if(plane.dist >= 15){
            plane.dist = 0;
        }

        time += 1;
        if(time == 50){
            time = 0;
            plane.time -= 1;
        }
        plane.health = Math.max(plane.health, 0);
        plane.time = Math.max(plane.time, 0);

        updateHUD();
    };
    
    var render = function(){
        const delta = 5 * clock.getDelta();
        for(const blast of this.fireBlast){
            blast.uniforms['time'].value += 0.2 * delta;
            blast.mesh.position.y += blast.SPEEDY;
            blast.composer.render( 0.01 );
        }
        
        scenery.waterObj.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        
        renderer.render(scene,camera);
    };
    
    var GameLoop = function(){
        requestAnimationFrame(GameLoop);
        update();
        render();
    };

    GameLoop();
}