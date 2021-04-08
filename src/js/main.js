var cube, camera;
main();

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    console.log(keyCode);
    if (keyCode == 38) { // up
        camera.position.z -= cube.VELOCITY;
        cube.obj.position.z -= cube.VELOCITY;
    } else if (keyCode == 40) { // down
        camera.position.z += cube.VELOCITY;
        cube.obj.position.z += cube.VELOCITY;
    } else if (keyCode == 37) { // left
        camera.position.x -= cube.VELOCITY;
        cube.obj.position.x -= cube.VELOCITY;
    } else if (keyCode == 39) { // right
        camera.position.x += cube.VELOCITY;
        cube.obj.position.x += cube.VELOCITY;
    }
};

function main() {
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 10000);
    camera.position.z = 7;

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
    
    cube = new Cube();
    scene.add(cube.obj);

    //game logic
    var update = function(){
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