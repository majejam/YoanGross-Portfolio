import * as THREE from 'three'

export default class Element{
    constructor(_options){

        this.container = new THREE.Object3D()

        this.setGlobe()
        this.setAnimation()
        
    }

    setGlobe(){
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(1, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(globeDiffuseSource),
            normalMap: this.textureLoader.load(globeNormalSource),
            metalnessMap: this.textureLoader.load(globeRoughtnessSource),
            roughnessMap: this.textureLoader.load(globeRoughtnessSource) 
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.container.add(this.globe.mesh)
    }
    

    setAnimation()
    {
        
    }
}
