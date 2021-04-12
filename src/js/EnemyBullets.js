class EnemyBullets{
    constructor(scene, x, y, z){
        this.VELOCITY = 0.3;
        this.healthChange = -2;
        this.initRenderData(scene, x, y, z);
    }
    
    initRenderData(scene, x, y, z){
        var loader = new THREE.GLTFLoader();
        loader.load("src/models/enemyBullet.glb", (obj) => {
            obj.scene.scale.set(0.05,0.05,0.05);
            obj.scene.position.x = x;
            obj.scene.position.y = y;
            obj.scene.position.z = z;
            obj.scene.rotation.x = 3;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}