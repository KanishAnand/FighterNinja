class Scenery{
    constructor(){
        this.initRenderData();
    }
    
    initRenderData(){
        var geometry = new THREE.CubeGeometry(1000,1000,1000);
        var cubeMaterials = [
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/img/scenery/front.png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/img/scenery/back.png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/img/scenery/up.png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/img/scenery/down.png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/img/scenery/right.png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/img/scenery/left.png"), side: THREE.DoubleSide})
        ];

        var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
        this.obj = new THREE.Mesh(geometry, cubeMaterial);
    }

    // drawCube(){
    // }
}