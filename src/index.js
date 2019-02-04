import './css/style.styl'

import './css/reset.styl'

import * as THREE from 'three'


import CameraControls from 'camera-controls';
CameraControls.install( { THREE: THREE } );

const home_btn = document.querySelector('.btn-home')
const createFps = require('fps-indicator');
let fps = createFps();


/**
 * Btn home
 */
let x = 0
home_btn.addEventListener('click', () =>
{ 
    x += 10
    if(x == 30)
        x = 0
    cameraControls.moveTo(x,0,0,true )

})
/**
 * Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xffffff )
/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update
    renderer.setSize(sizes.width, sizes.height)
})
/**
 * Light 
 */
const ambientLight = new THREE.DirectionalLight(0xffffff, 3)
ambientLight.position.x = 0
ambientLight.position.y = 1
ambientLight.position.z = 1
scene.add(ambientLight)

var light = new THREE.AmbientLight( 0xffffff, 0.7 ); // soft white light
scene.add( light );
/**
 * Object
 */
let globe = {}
globe.geometry = new THREE.DodecahedronBufferGeometry(1, 1)
globe.material = new THREE.MeshStandardMaterial({
    color: 0xfa1212, 
    flatShading: true,
    metalness: 0.5,
    roughness: 0,
})
globe.mesh = new THREE.Mesh(globe.geometry, globe.material)
globe.mesh.position.x = 19
globe.mesh.position.y = 0
globe.mesh.position.z = -3.5
scene.add(globe.mesh)

let cone = {}
cone.geometry = new THREE.ConeBufferGeometry( 0.5, 1.5, 320 );
cone.material = new THREE.MeshStandardMaterial({
    color: 0x3a82fa, 
    flatShading: true,
    metalness: 0.5,
    roughness: 1,
})
cone.mesh = new THREE.Mesh(cone.geometry, cone.material)
cone.mesh.position.x = 9
cone.mesh.position.y = 0
cone.mesh.position.z = -2.5
cone.mesh.rotation.x = 0.5
scene.add(cone.mesh)


let cube = {}
cube.geometry = new THREE.BoxBufferGeometry( 1, 1, 1 )
cube.material = new THREE.MeshStandardMaterial({
    color: 0x3a8410, 
    flatShading: true,
    metalness: 0.5,
    roughness: 1,
})
cube.mesh = new THREE.Mesh(cube.geometry, cube.material)
cube.mesh.position.x = -1
cube.mesh.position.y = 0
cube.mesh.position.z = -2.5
cube.mesh.rotation.x = -0.5
scene.add(cube.mesh)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height)
camera.position.z = 0
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * camera controls 
 */
const clock = new THREE.Clock();
const cameraControls = new CameraControls(camera, renderer.domElement, false);

cameraControls.dampingFactor = 0.05

let nb = 0
/**
 * Loop
 */
const loop = () =>
{

    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update( delta );
    window.requestAnimationFrame(loop)
    
    globe.mesh.rotation.y += 0.001
    nb += 0.01
    globe.mesh.position.y = Math.sin(nb)/4

    cone.mesh.rotation.y += 0.001
    cone.mesh.position.y = -Math.sin(nb)/4
    cube.mesh.rotation.y -= 0.001
    cube.mesh.position.y = Math.sin(nb)/4
    // Renderer
    renderer.render(scene, camera)
    
}
loop()

console.log('nathan dent');


function floating(el, nb){

}   