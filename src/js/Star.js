class Star{
    constructor(scene, x, y, z){
        this.AngularVelocity = 0.05;
        this.scoreInc = 1;
        this.initRenderData(scene, x, y, z);
    }
    
    initRenderData(scene, x, y, z){
        var loader = new THREE.GLTFLoader();
        loader.load("src/models/star.glb", (obj) => {
            obj.scene.scale.set(0.1,0.1,0.1);
            obj.scene.position.x = x;
            obj.scene.position.y = y;
            obj.scene.position.z = z;
            obj.scene.rotation.y += -1.2;
            obj.scene.rotation.x += -0.4;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}