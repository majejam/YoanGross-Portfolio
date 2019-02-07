import * as THREE from 'three'

export default class Element{
    constructor(_options){

        this.container = new THREE.Object3D()
        this.posx = 0
        this.posy = 0 
        this.posz = 0 
        this.setDodecahedron()
        this.setAnimation()
        
    }

    setDodecahedron(){
        this.element = {}

        this.element.geometry = new THREE.DodecahedronBufferGeometry(1, 1)
        this.element.material = new THREE.MeshStandardMaterial({
            color: 0xfa1212, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = 19
        this.element.mesh.position.y = 0
        this.element.mesh.position.z = -4
        this.container.add(this.element.mesh)
    }
    

    setAnimation()
    {
        
    }
}
