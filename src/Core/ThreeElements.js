import * as THREE from 'three'

export default class Element{
    constructor(color, scene, type){
        this.scene = scene 
        this.container = new THREE.Object3D()
        this.posx = 0
        this.posy = 0 
        this.posz = 0 
        this.color = color 
        this.type = type 
        this.setMesh()
        this.upDownAnimation()

        
        
    }
    setMesh()
    {
        if(this.type == 'Dodecahedron'){
            this.setDodecahedron()
        }
        else if(this.type == 'Cone'){

        }
        else if(this.type == 'Octahedron'){
            
        }
        else if(this.type == 'Tetrahedron'){
            
        }
        else if(this.type == 'Dodecahedron'){
            
        }
        else if(this.type == 'Dodecahedron'){
            
        }
        else if(this.type == 'Dodecahedron'){
            
        }
    }
    setDodecahedron()
    {
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
    

    upDownAnimation(increment, force)
    {
        this.element.mesh.position.y = Math.sin(increment)/force
    }

    rotateAnimation(force, axis)
    {
        if(axis == rotation.y)
            this.element.mesh.rotation.y += force/1000
        else if(axis == rotation.x)
            this.element.mesh.rotation.y += force/1000
        else if(axis == rotation.z)
            this.element.mesh.rotation.y += force/1000
    }

    setScene()
    {
        this.scene.add(this.container)
    }
}
