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

// function removeStars(){
//     newStars = [];

//     for(i = 0; i < this.stars.length; i++){
//         if(this.stars[i].obj.position.z > plane.obj.position.z){
//             scene.remove(this.stars[i].obj);
//         }
//         else{
//             newStars.push(this.stars[i]);
//         }
//     }

//     this.stars = newStars;
// }

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
    console.log(this.stars.length);
    // for(star in this.stars){
    //     star.obj.rotatation.y += star.AngularVelocity;
    // }
    for(i = 0; i < this.stars.length; i++){
        this.stars[i].obj.rotation.y += this.stars[i].AngularVelocity;
    }
}

// function checkTouching(a, d) {
//     let b1 = a.position.y - a.geometry.parameters.height / 2;
//     let t1 = a.position.y + a.geometry.parameters.height / 2;
//     let r1 = a.position.x + a.geometry.parameters.width / 2;
//     let l1 = a.position.x - a.geometry.parameters.width / 2;
//     let f1 = a.position.z - a.geometry.parameters.depth / 2;
//     let B1 = a.position.z + a.geometry.parameters.depth / 2;
//     let b2 = d.position.y - d.geometry.parameters.height / 2;
//     let t2 = d.position.y + d.geometry.parameters.height / 2;
//     let r2 = d.position.x + d.geometry.parameters.width / 2;
//     let l2 = d.position.x - d.geometry.parameters.width / 2;
//     let f2 = d.position.z - d.geometry.parameters.depth / 2;
//     let B2 = d.position.z + d.geometry.parameters.depth / 2;
//     if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
//       return false;
//     }
//     return true;
//   }

// function checkCollision(){
//     newStars = [];

//     for(i = 0; i < stars.length; i++){
//         ans = checkTouching(plane.obj, stars[i].obj);
//         if(ans == 1){
//             console.log("HITTT");
//             scene.remove(stars[i].obj);
//         }
//         else{
//             newStars.push(stars[i]);
//         }
//     }

//     stars = newStars;
// }

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
        // checkCollision();
        // removeStars();
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