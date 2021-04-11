var stars = [];
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

function removeStars(){
    newStars = [];

    for(const star of this.stars){
        if(star.obj){
            if(star.obj.position.z > plane.obj.position.z){
                scene.remove(star.obj);
            }
            else{
                newStars.push(star);
            }
        }
    }

    this.stars = newStars;
}

function createStars(){
    if(plane.dist < 10){
        return;
    }
    
    plane.dist = 0;

    numStars = parseInt(randomNumber(0,7));
    var x = plane.obj.position.x, deltaX = 10;
    var z = plane.obj.position.z, deltaZ = -5;
    
    for(i = 0; i < numStars; i++){
        // both stars and plane will have same y coordinate
        this.stars.push(new Star(scene, randomNumber(x - deltaX, x + deltaX), plane.obj.position.y, randomNumber(z + deltaZ, z + 8*deltaZ)));
    }
}

function rotateStars(){
    for(const star of this.stars){
        if(star.obj){
            star.obj.rotation.y += star.AngularVelocity;
        }
    }
}

function checkTouching(firstObj, secondObj) {
    dist = firstObj.position.distanceTo(secondObj.position);
    
    if(dist < 2){
        return true;
    }
    return false;
  }

function checkCollision(){
    newStars = [];

    for(const star of this.stars){
        if(star.obj){
            if(checkTouching(plane.obj, star.obj)){
                console.log("HITTT");
                scene.remove(star.obj);
            }
            else{
                newStars.push(star);
            }
        }
    }

    stars = newStars;
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
    
    plane = new Plane();
    scene.add(plane.obj);

    //game logic
    var update = function(){
        // star operations
        removeStars();
        createStars();
        rotateStars();
        checkCollision();
    };
    
    camera.position.y += 3;
    camera.rotation.x += -0.2;
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