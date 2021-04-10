class Star{
    constructor(scene, x, y, z){
        this.initRenderData(scene, x, y, z);
    }
    
    initRenderData(scene, x, y, z){
        var loader = new THREE.OBJLoader();
        loader.load("src/models/star.obj", (obj) => {
            obj.scale.set(0.05,0.05,0.05);
            obj.rotation.z += 1;
            obj.position.x += x;
            obj.position.y = y;
            obj.position.z = z;
            this.obj = obj;
            scene.add(obj);
        });
    }
}