class Plane{
    constructor(scene){
        this.flag = 0;
        this.VELOCITY = 10;
        this.initRenderData(scene);
    }
    
    
    initRenderData(scene){
        var loadedObj;
        var loader = new THREE.OBJLoader();
        loader.load(
            "src/models/star.obj",
            function(obj){
                loadedObj = obj;
                scene.add(obj);
            },
        );
        this.obj = loadedObj;
        // var geometry = new THREE.BoxGeometry(1,1,1);
        // var material = new THREE.MeshBasicMaterial({color: 0xFFFFFFF, wireframe: true});
        // this.obj = new THREE.Mesh(geometry, material);
    }


    drawPlane(){
    }
}