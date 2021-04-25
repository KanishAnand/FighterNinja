class Enemy{
    constructor(scene, x, y, z){
        this.flag = 0;
        this.SPEEDX = 0.08;
        this.SPEEDY = 0;
        this.SPEEDZ = 0.2;
        this.healthChange = -10;
        this.bulletInterval = 0;
        this.bulletThreshold = 50;
        this.initRenderData(scene, x, y, z);
    }
    
    initRenderData(scene, x, y, z){
        var loader = new THREE.GLTFLoader();
        loader.load("src/models/enemy.glb", (obj) => {
            obj.scene.scale.set(0.05,0.05,0.05);
            obj.scene.position.x = x;
            obj.scene.position.y = y;
            obj.scene.position.z = z;
            obj.scene.rotation.z += -Math.PI/4;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}