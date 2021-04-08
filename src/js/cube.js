class cube{
    constructor(){
        this.initRenderData();
    }
    
    initRenderData(){
        var geometry = new THREE.BoxGeometry(1,1,1);
        var material = new THREE.MeshBasicMaterial({color: 0xFFFFFFF, wireframe: true});
        this.obj = new THREE.Mesh(geometry, material);
    }

    drawCube(){
    }

    rotate(){
        this.obj.rotation.x += 0.01;
        this.obj.rotation.y += 0.01;
        this.obj.rotation.z += 0.01;
    }
}