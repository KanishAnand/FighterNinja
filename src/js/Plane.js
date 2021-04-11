class Plane{
    constructor(scene){
        this.dist = 0;
        this.score = 0;
        this.health = 100;
        this.VELOCITY = 1;
        this.initRenderData(scene);
    }
    
    initRenderData(scene){
        var loader = new THREE.GLTFLoader();
        loader.load("src/models/plane.glb", (obj) => {
            obj.scene.scale.set(0.8,0.5,0.6);
            // obj.scene.position.x = x;
            // obj.scene.position.y = y;
            // obj.scene.position.z = z;
            // obj.scene.rotation.y += -1.2;
            // obj.scene.rotation.x += -0.4;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
        // var geometry = new THREE.BoxGeometry(1,1,1);
        // var material = new THREE.MeshBasicMaterial({color: 0xFFFFFFF, wireframe: true});
        // this.obj = new THREE.Mesh(geometry, material);
    }
}