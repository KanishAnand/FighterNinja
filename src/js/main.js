var stars = [], enemies = [];
var plane, camera, scenery, scene;
main();

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 38) { // up
        camera.position.z -= plane.VELOCITY;
        plane.obj.position.z -= plane.VELOCITY;
        plane.dist += 1;
        // scenery.obj.position.z -= plane.VELOCITY;
    } else if (keyCode == 40) { // down
        camera.position.z += plane.VELOCITY;
        plane.obj.position.z += plane.VELOCITY;
        // scenery.obj.position.z += plane.VELOCITY;
    } else if (keyCode == 37) { // left
        camera.position.x -= plane.VELOCITY;
        plane.obj.position.x -= plane.VELOCITY;
        // scenery.obj.position.x -= plane.VELOCITY;
    } else if (keyCode == 39) { // right
        camera.position.x += plane.VELOCITY;
        plane.obj.position.x += plane.VELOCITY;
        // scenery.obj.position.x += plane.VELOCITY;
    }
};

// Function to generate random number 
function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
} 

function removeObjects(){
    newStars = [];
    newEnemies = [];

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
            else{
                newEnemies.push(enemy);
            }
        }
        else{
            newEnemies.push(enemy);
        }
    }
    
    this.stars = newStars;
    this.enemies = newEnemies;
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
    numEnemies = parseInt(randomNumber(0,2));
    var x = plane.obj.position.x, deltaX = 10;
    var z = plane.obj.position.z, deltaZ = -5;
    
    for(i = 0; i < numEnemies; i++){
        // both stars and plane will have same y coordinate
        this.enemies.push(new Enemy(scene, randomNumber(x - deltaX, x + deltaX), plane.obj.position.y, randomNumber(z + deltaZ, z + 8*deltaZ)));
    }
}

function rotateObjects(){
    for(const star of this.stars){
        if(star.obj){
            star.obj.rotation.y += star.AngularVelocity;
        }
    }
 
    for(const enemy of this.enemies){
        if(enemy.obj){
            if(enemy.direction == 1){
                enemy.vertDist++;
                enemy.obj.position.y += enemy.vertSpeed;
            }
            else{
                enemy.vertDist++;
                enemy.obj.position.y -= enemy.vertSpeed;
            }
            
            if(enemy.vertDist >= enemy.distThreshold){
                enemy.vertDist = 0;
                enemy.distThreshold = enemy.finaldistThreshold;
                enemy.direction = 1 - enemy.direction;
            }
            
            enemy.obj.rotation.y += enemy.AngularVelocity;
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
    newStars = [];
    newEnemies = [];

    // collision of plane with stars
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

    // collision of plane with enemies
    for(const enemy of this.enemies){
        if(enemy.obj){
            if(checkTouching(plane.obj, enemy.obj)){
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

    this.stars = newStars;
    this.enemies = newEnemies;
}

function updateHUD(){
    document.getElementById("score").innerHTML = "Score: " + plane.score;
    document.getElementById("health").innerHTML = "Health: " + plane.health;
}

function main() {
    scene = new THREE.Scene();
    var Light = new THREE.DirectionalLight(0x404040,10);
    scene.add(Light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 10000);
    camera.position.z = 6;
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', function(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    })

    window.addEventListener("keydown", onDocumentKeyDown, false);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    scenery = new Scenery();
    scene.add(scenery.obj);
    
    plane = new Plane(scene);

    camera.position.y += 3;
    camera.rotation.x += -0.2;

    //game logic
    var update = function(){
        // remove objects which are passed back
        removeObjects();

        // detect collisions with objects
        checkCollision();

        if(plane.dist >= 10){
            //create new objects
            createStars();
            createEnemies();
            plane.dist = 0;
        }

        rotateObjects();

        if(plane.dist >= 10){
            plane.dist = 0;
        }

        //update HUD
        updateHUD();
    };
    
    var render = function(){
        renderer.render(scene,camera);
    };
    
    var GameLoop = function(){
        requestAnimationFrame(GameLoop);
        update();
        render();
    };

    GameLoop();
}