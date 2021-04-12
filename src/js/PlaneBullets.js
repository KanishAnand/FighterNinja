class PlaneBullets{
    constructor(scene, x, y, z){
        this.VELOCITY = -1.3;
        this.dist = 0;
        this.firedScore = 10;
        this.initRenderData(scene, x, y, z);
    }
    
    initRenderData(scene, x, y, z){
        var loader = new THREE.GLTFLoader();
        loader.load("src/models/missile.glb", (obj) => {
            obj.scene.scale.set(0.05,0.05,0.05);
            obj.scene.position.x = x;
            obj.scene.position.y = y;
            obj.scene.position.z = z;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}