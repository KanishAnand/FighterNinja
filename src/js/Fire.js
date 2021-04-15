class Fire{
    constructor(scene, camera, renderer, vertShader, fragShader, x, y, z){
        this.SPEEDY = 0.02;
        this.uniforms;
        this.mesh;
        this.composer;
        this.initRenderData(scene, camera, renderer, vertShader, fragShader, x, y, z);
    }
    
    initRenderData(scene, camera, renderer, vertShader, fragShader, x, y, z){
        const textureLoader = new THREE.TextureLoader();
        this.uniforms = {
            "fogDensity": { value: 0.45 },
            "fogColor": { value: new THREE.Vector3(0, 0, 0)},
            "time": { value: 1.0 },
            "uvScale": { value: new THREE.Vector2(3.0, 1.0)},
            "texture1": { value: textureLoader.load('src/img/cloud.png')},
            "texture2": { value: textureLoader.load('src/img/lavatile.jpg')}
        };

        this.uniforms[ "texture1" ].value.wrapS = this.uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
        this.uniforms[ "texture2" ].value.wrapS = this.uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

        const size = 0.35;

        const material = new THREE.ShaderMaterial( {
            uniforms: this.uniforms,
            vertexShader: vertShader,
            fragmentShader: fragShader
        } );

        this.mesh = new THREE.Mesh( new THREE.SphereGeometry(size, 30, 30 ), material);
        this.mesh.position.x = x;
        this.mesh.position.y = y + 2;
        this.mesh.position.z = z + 1;
        scene.add( this.mesh );

        const renderModel = new THREE.RenderPass(scene, camera);
        const effectBloom = new THREE.BloomPass( 1.25 );
        const effectFilm = new THREE.FilmPass( 0.35, 0.95, 2048, false );

        this.composer = new THREE.EffectComposer(renderer);

        this.composer.addPass(renderModel);
        this.composer.addPass(effectBloom);
        this.composer.addPass(effectFilm);
    }
    
}