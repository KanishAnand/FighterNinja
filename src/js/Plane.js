class Plane{
    constructor(){
        this.dist = 0;
        this.score = 0;
        this.health = 100;
        this.VELOCITY = 1;
        this.initRenderData();
    }
    
    initRenderData(){
        var geometry = new THREE.BoxGeometry(1,1,1);
        var material = new THREE.MeshBasicMaterial({color: 0xFFFFFFF, wireframe: true});
        this.obj = new THREE.Mesh(geometry, material);
    }
}