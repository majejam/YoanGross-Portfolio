import * as THREE from 'three'

export class Element{
    // Element(0xffffff, scene, 'Dodecahedron', 1, 1, 1, 1, 0, 0, 0)
    constructor(color, scene, type, radius, height, definition, size, posx, posy, posz){
        this.scene = scene 
        this.container = new THREE.Object3D()
        this.posx = posx
        this.posy = posy
        this.posz = posz
        this.size = size
        this.radius = radius
        this.height = height 
        this.definition = definition
        this.color = color 
        this.type = type 
        this.force = 0
        this.rotation_force = 0 
        this.increment = 4 
        this.setMesh()
        this.setScene()
    }
    setMesh()
    {
        if(this.type == 'Dodecahedron'){
            this.setDodecahedron()
        }
        else if(this.type == 'Cone'){
            this.setCone()
        }
        else if(this.type == 'Octahedron'){
            this.setOctahedron()
        }
        else if(this.type == 'Tetrahedron'){
            this.setTetrahedron()
        }
        else if(this.type == 'Cube'){
            this.setCube()
        }

    }
    setOctahedron()
    {
        this.element = {}
        this.element.geometry = new THREE.OctahedronBufferGeometry(this.radius, this.definition)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }
    setDodecahedron()
    {
        this.element = {}
        this.element.geometry = new THREE.DodecahedronBufferGeometry(this.radius, this.definition)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }
    setCone()
    {
        this.element = {}

        this.element.geometry = new THREE.ConeBufferGeometry(this.radius, this.height, this.definition)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }
    setCube()
    {
        this.element = {}

        this.element.geometry = new THREE.BoxBufferGeometry(this.size, this.size, this.size)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }
    setTetrahedron()
    {
        this.element = {}
        this.element.geometry = new THREE.TetrahedronBufferGeometry(this.radius, this.definition)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })
        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }

    upDownAnimation(force, increment)
    {
        this.force += force
        this.element.mesh.position.y = this.posy + Math.sin(this.force)/increment
    }

    rotateAnimationX(force_rotation)
    {
        this.rotation_force = force_rotation
        this.element.mesh.rotation.x += this.rotation_force
    }
    rotateAnimationY(force_rotation)
    {
        this.rotation_force = force_rotation
        this.element.mesh.rotation.y += this.rotation_force
    }
    rotateAnimationZ(force_rotation)
    {
        this.rotation_force = force_rotation
        this.element.mesh.rotation.z += this.rotation_force
    }
    setAnimation(force_up,force_rot, animationUp, animationX, animationY, animationZ,increment){
        if(animationUp)
            this.upDownAnimation(force_up,increment)
        if(animationX)
            this.rotateAnimationX(force_rot)
        if(animationY)
            this.rotateAnimationY(force_rot)
        if(animationZ)
            this.rotateAnimationZ(force_rot)
    }

    setScene()
    {
        this.scene.add(this.container)  
    }

    returnObj()
    {
        return this.container
    }
}


export class Scene{
    // Element(0xffffff, scene, 'Dodecahedron', 1, 1, 1, 1, 0, 0, 0)
    constructor(scene, posx, posy, posz, number, type, radius, height, definition, size){
        this.scene = scene 
        this.type = type 
        this.color = 0xff0000
        this.container = new THREE.Object3D()
        this.posx = posx
        this.posy = posy
        this.posz = posz
        this.elx = 0
        this.ely = 0
        this.elz = 0 
        this.radius = radius 
        this.height = height 
        this.definition = definition 
        this.size = size 
        this.number = number
        this.arrayElement = new Array()
        this.container.position.x = this.posx
        this.container.position.y = this.posy
        this.container.position.z = this.posz
        this.setElements(this.number)
        this.setScene()
    }
    setElements(number){
        for (let index = 0; index < number; index++) {  
            let modulo = index % 2
            if(modulo == 0){
                let el = new Element(this.color, this.scene, this.type, this.radius, this.height, this.definition, this.size, this.elx+3, this.ely, this.elz - (index * 10))
                this.arrayElement.push(el)
            }
            else{
                let el = new Element(this.color, this.scene, this.type, this.radius, this.height, this.definition, this.size, this.elx+3, this.ely, this.elz - (index * 10))
                this.arrayElement.push(el)
            }
            this.container.add(this.arrayElement[index].returnObj())
        }
    }

    
    setScene()
    {
        console.log('scene set to container');
        this.scene.add(this.container) 
    }

    setPosx(){

        
        if(x == 0){this.posx -= 5}else{this.posx += 5}
    }

    animationPlay()
    {
        for (let index = 0; index < this.arrayElement.length; index++) {  
            this.arrayElement[index].setAnimation(0.01, 0.002, true, true, true, true,4)
        }
    }

    returnObj()
    {
        return this.container
    }
}


export class RandomElement{
    // Element(0xffffff, scene, 'Dodecahedron', 1, 1, 1, 1, 0, 0, 0)
    constructor(scene, posx, posy, posz, number, radius, height, definition, size){
        this.scene = scene  
        this.container = new THREE.Object3D()
        this.posx = posx 
        this.posy = posy
        this.posz = posz
        this.elx =  -50 + Math.random() * 100
        this.ely = 0
        this.elz = -(Math.random() * 100)
        this.color = new Array(0xffb3ba,0x4286f4,0x42f4a1,0xe8ca35,0xd1302e,0xb02ed1,0xe52993,0x27f3f7,0xbae1ff)
        this.radius = radius 
        this.height = height 
        this.definition = definition 
        this.size = size 
        this.number = number
        this.arrayElement = new Array()
        this.setElements(this.number)
        this.container.position.x = this.posx
        this.container.position.y = this.posy
        this.container.position.z = this.posz
        this.setScene()
        
    }

    setElements(number){
        for (let index = 0; index < number; index++) { 
            this.elx =  -300 + Math.random() * 600
            this.ely = -150 + Math.random() * 300
            this.elz = -(Math.random() * 100) 
            let rType = this.randomType()
            let el = new Element(this.color[Math.floor(Math.random()* this.color.length)], this.scene, rType, this.radius, this.height, this.definition, this.size, this.elx, this.ely, this.elz)
            this.arrayElement.push(el)
            this.container.add(this.arrayElement[index].returnObj())
        }
    }

    randomType(){
        let array = ['Cube','Cone','Tetrahedron','Octahedron','Dodecahedron']
        let random = Math.floor(Math.random() * array.length)
        return array[random]
    }
    setScene()
    {
        this.scene.add(this.container) 
    }
    animationPlay()
    {
        for (let index = 0; index < this.arrayElement.length; index++) {  
            this.arrayElement[index].setAnimation(0.01, 0.005, true, true, true, false,4)
        }
    }
    animationPlays()
    {
         
        this.arrayElement[0].setAnimation(0.01, 0.002, true, true, true, false,4)
        
    }

    returnObj()
    {
        return this.container
    }
}
