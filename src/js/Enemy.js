class Enemy{
    constructor(scene, x, y, z){
        this.AngularVelocity = 0.05;
        this.healthChange = -10;
        this.initRenderData(scene, x, y, z);
    }
    
    initRenderData(scene, x, y, z){
        var loader = new THREE.GLTFLoader();
        loader.load("src/models/enemy.glb", (obj) => {
            obj.scene.scale.set(0.15,0.15,0.15);
            obj.scene.position.x = x;
            obj.scene.position.y = y - 0.5;
            obj.scene.position.z = z;
            obj.scene.rotation.x += -0.1;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}