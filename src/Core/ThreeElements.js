import * as THREE from 'three'
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

export class Element{
    // Element(0xffffff, scene, 'Dodecahedron', 1, 1, 1, 1, 0, 0, 0)
    constructor(color, scene, type, radius, height, definition, size, posx, posy, posz, isObj = false){
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
        this.randforce = 0.001 + Math.random()/400
        this.smallElement = new Array()
        this.isObj = isObj
        this.time = 0
        this.isOn = false
        this.scale = 1

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
        else if(this.isObj){
            this.setObject(this.container)
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
    setCubes()
    {
        let random = 0.9
        this.element = {}
        this.element.geometry = new THREE.BoxBufferGeometry(this.size - random, this.size - random, this.size - random)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx + (-1 + Math.random() * 2)
        this.element.mesh.position.y = this.posy + (-1 + Math.random() * 2)
        this.element.mesh.position.z = this.posz + (-0.5 + Math.random())
        this.container.add(this.element.mesh)
        this.smallElement.push(this.element.mesh)
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

    setObject(container) {
        // instantiate a loader
        this.THREE = THREE;
        const objLoader = new this.THREE.OBJLoader();
        let color = this.color
        // load a resource
        objLoader.load(
            // resource URL
            `./obj/${this.type}.obj`,
            // called when resource is loaded
            function ( object ) {

                object.traverse( function ( child ) {

                    if ( child instanceof THREE.Mesh ) {
            
                        child.material =  new THREE.MeshStandardMaterial({
                            color: color, 
                            metalness: 0.5,
                            roughness: 1,
                        })
            
                    }
            
                } );

                container.add( object );
                

            },
            // called when loading is in progresses
            function ( xhr ) {

                //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }
        );

        this.setPositionContainer()
    }

    upDownAnimation(force, increment)
    {
        this.force += force
        this.element.mesh.position.y = this.posy + Math.sin(this.force)/increment
    }

    setPositionContainer() {
        this.container.position.x = this.posx
        this.container.position.y = this.posy
        this.container.position.z = this.posz
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
    setAnimation(force_up, force_rot, animationUp, animationX, animationY, animationZ,increment){
        if(animationUp)
            this.upDownAnimation(force_up,increment)
        if(animationX)
            this.rotateAnimationX(force_rot)
        if(animationY)
            this.rotateAnimationY(force_rot)
        if(animationZ)
            this.rotateAnimationZ(force_rot)
    }
    setAnimationRand(force_up, animationUp, animationX, animationY, animationZ,increment){
        if(animationUp)
            this.upDownAnimation(force_up,increment)
        if(animationX)
            this.rotateAnimationX(this.randforce)
        if(animationY)
            this.rotateAnimationY(this.randforce)
        if(animationZ)
            this.rotateAnimationZ(this.randforce)
    }

    animationObj(force) {
        this.force += 0.01
        this.container.position.y = this.posy + Math.sin(this.force)/4
    }
    setRandomAnimation(){
        for (let i = 0; i < this.smallElement.length; i++) {
            this.smallElement[i].rotation.x += 0.01
            //this.rotation_force = force_rotation
        }
    }
    setScene()
    {
        this.scene.add(this.container)  
    }

    easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    debug(time) {
        
        
        console.log(this.easeInOutQuad(time, 0, 1, 2));
        
    }

    isHovered(cursor, camera, raycaster, time) {

        
        raycaster.setFromCamera( cursor, camera );

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObject( this.element.mesh );
        
        //console.log(intersects);
        if(intersects.length === 0) {
            this.isOn = false
        }

        if(intersects.length === 0 && this.scale > 1) {
            this.scale -= 0.008
        }

        for ( var i = 0; i < intersects.length; i++ ) {

            if (this.scale < 1.1) {
                this.scale += 0.015
            }
            this.isOn = true
        }
        this.element.mesh.scale.set(this.scale,this.scale,this.scale);       
        
    }

    isHoveredObj(cursor, camera, raycaster, time) {

        
        raycaster.setFromCamera( cursor, camera );

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObject( this.container, true );
        
        //console.log(intersects);
        if(intersects.length === 0) {
            this.isOn = false
        }

        if(intersects.length === 0 && this.scale > 1) {
            this.scale -= 0.008
        }
        
        for ( var i = 0; i < intersects.length; i++ ) {

            if (this.scale < 1.1) {
                this.scale += 0.01
            }
            this.isOn = true
        }   
        this.container.scale.set(this.scale,this.scale,this.scale);            
        
    }

    isClicked(cursor, camera, raycaster, callback, index) {

        let force = 0.01 
        if(this.isOn) {
            callback(index)
            let interval = setInterval(() => {
                force *= 1.1
                //this.rotateAnimationY(force)  
            }, 100);
            setTimeout(() => {
                clearInterval(interval)
            }, 1000);
        }     
        else {

        }   
        
    }

    returnObj()
    {
        return this.container
    }
}


export class Scene{
    // Element(0xffffff, scene, 'Dodecahedron', 1, 1, 1, 1, 0, 0, 0)
    constructor(scene, posx, posy, posz, dom, type, radius, height, definition, size, color){
        this.scene = scene 
        this.type = type 
        this.color = color
        this.container = new THREE.Object3D()
        this.posx = 0
        this.posy = 0
        this.posz = 0
        this.elx = 0
        this.ely = 0
        this.elz = 0 
        this.radius = radius 
        this.height = height 
        this.definition = definition 
        this.size = size 
        this.dom = dom
        this.number = dom.length
        this.arrayElement = new Array()
        this.container.position.x = this.posx
        this.container.position.y = this.posy
        this.container.position.z = this.posz
        
        this.setColors()
        //this.setElements(this.number)
        this.setScene()
        this.setElementsRandom(this.number)
    }

    setColors() {
        this.dom.forEach(el => {
            const number_color = el.querySelector('.big-nb')
            number_color.style.color = `#${this.color.toString(16)}`
        });

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
    setElementsRandom(number){
        for (let index = 0; index < number; index++) {  
            let randomTy = this.randomType()
            let el = new Element(this.color, this.scene, randomTy, this.radius, this.height, this.definition, this.size, -100 + Math.random()* 200, -100 + Math.random()* 200, -Math.random()*100)
            this.arrayElement.push(el)
            
            this.container.add(this.arrayElement[index].returnObj())
        }
    }

    randomType(){
        let array = ['Cube','Tetrahedron','Octahedron','Dodecahedron']
        let random = Math.floor(Math.random() * array.length)
        return array[random]
    }
    
    
    setScene()
    {
        this.scene.add(this.container) 
    }

    setPosx(){

        
        if(x == 0){this.posx -= 5}else{this.posx += 5}
    }

    animationPlay(animationUp, animationX, animationY, animationZ)
    {
        //animationUp, animationX, animationY, animationZ
        for (let index = 0; index < this.arrayElement.length; index++) {  
            this.arrayElement[index].setAnimationRand(0.01, animationUp, animationX, animationY, animationZ,4)
        }
    }

    returnObj()
    {
        return this.container
    }
}


export class RandomElement{
    // Element(0xffffff, scene, 'Dodecahedron', 1, 1, 1, 1, 0, 0, 0)
    constructor(scene, posx, posy, posz, number, radius, height, definition, size, color){
        this.scene = scene  
        this.container = new THREE.Object3D()
        this.posx = posx 
        this.posy = posy
        this.posz = posz
        this.elx =  -50 + Math.random() * 100
        this.ely = 0
        this.elz = -(Math.random() * 100)
        this.color = color
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

            let vecpos = this.generateSphere()
            this.elx = vecpos.x
            this.ely = vecpos.y
            this.elz = vecpos.z
            
            let rType = this.randomType()
            let el = new Element(this.color[Math.floor(Math.random()* this.color.length)], this.scene, rType, this.radius, this.height, this.definition, this.size, this.elx, this.ely, this.elz)
            this.arrayElement.push(el)
            this.container.add(this.arrayElement[index].returnObj())
        }
    }
    

    generateRandom(min, max, spacingx, spacingy) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (num > spacingx && num < spacingy) ? this.generateRandom(min, max,spacingx, spacingy) : num;
    }

    generateSphere() {
        let vec = new THREE.Vector3(0,0,0)
        let vec2 = new THREE.Vector3(this.generateRandom(-300, 300, 0, 0),this.generateRandom(-300, 300, 0, 0), this.generateRandom(-300, 300, 0, 0))
        return (vec.distanceTo(vec2) < 60) ? this.generateSphere() : vec2;
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
         
        this.arrayElement[0].setAnimation(100, 0.002, true, true, true, false,4)
        
    }

    returnObj()
    {
        return this.container
    }
}
