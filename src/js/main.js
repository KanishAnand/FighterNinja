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

function createStars(){
    if(plane.dist < 10){
        return;
    }

    for(i = 0; i < stars.length; i++){
        scene.remove(stars[i]);
    }
    
    // stars = []
    plane.dist = 0;

    numStars = parseInt(randomNumber(0,5));
    var x = plane.obj.position.x, deltaX = 10;
    var z = plane.obj.position.z, deltaZ = -5;
    
    for(i = 0; i < numStars; i++){
        // both stars and plane will have same y coordinate
        stars.push(new Star(scene, randomNumber(x - deltaX, x + deltaX), plane.obj.position.y, randomNumber(z + deltaZ, z + 8*deltaZ)));
    }
}

function rotateStars(){
    for(i = 0; i < stars.length; i++){
        stars[i].obj.rotation.y += stars[i].AngularVelocity;
    }
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
        console.log(stars.length);
        createStars();
        rotateStars();
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