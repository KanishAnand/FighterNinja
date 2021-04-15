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
        loader.load("src/models/planePrev.glb", (obj) => {
            obj.scene.scale.set(0.8,0.5,0.6);
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}