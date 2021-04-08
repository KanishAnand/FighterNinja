class Cube{
    constructor(){
        this.VELOCITY = 10;
        this.initRenderData();
    }
    
    initRenderData(){
        var geometry = new THREE.BoxGeometry(1,1,1);
        var material = new THREE.MeshBasicMaterial({color: 0xFFFFFFF, wireframe: true});
        this.obj = new THREE.Mesh(geometry, material);
    }

    drawCube(){
    }
}