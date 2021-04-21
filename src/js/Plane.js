class Plane{
    constructor(scene){
        this.dist = 0;
        this.score = 0;
        this.health = 100;
        this.time = 50;
        this.VELOCITY = 1;
        this.initRenderData(scene);
    }
    
    initRenderData(scene){
        var loader = new THREE.GLTFLoader();
        loader.load("src/models/planeSimple.glb", (obj) => {
            obj.scene.scale.set(0.1,0.1,0.1);
            obj.scene.rotation.y += Math.PI;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}