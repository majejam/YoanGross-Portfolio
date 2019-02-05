import './css/style.styl'

import './css/reset.styl'

import * as THREE from 'three'


import CameraControls from 'camera-controls';

import Timer from 'tiny-timer'

 
let timer = new Timer()


CameraControls.install( { THREE: THREE } );

const ctn_home = document.querySelector('.ctn-home')
const home_btn = document.querySelector('.btn-home')
const inner_text = document.querySelector('.txt-slider-ctn')
const cursor_hold = document.querySelector('.cursor-hold')
const sml_bar = document.querySelector('.sml-bar')
const numerotation = document.querySelectorAll('.nb-num')
const numerotation_bar = document.querySelectorAll('.num_bar')
numerotation[0].style.color = '#000000'
const createFps = require('fps-indicator')
let fps = createFps()

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width 
    cursor.y = _event.clientY / sizes.height 
})

/**
 * Btn home
 */
let x = 0
let y = 0
let hold = false 
let timing = 0
let show_cursor = false
home_btn.addEventListener('click', () =>
{ 
    if(!hold){
        x += 10
        y += 400

        if(x == 50){
            x = 0
            y = 0
        }
        if(x == 0){
            resetColor(numerotation, '#aaaaaa')
            numerotation[0].style.color = '#000000'
        }
        if(x == 10){
            resetColor(numerotation, '#aaaaaa')
            numerotation[1].style.color = '#000000'
            numerotation_bar[0].style.transformOrigin = 'left'
            numerotation_bar[0].style.transform = 'scaleX(1)'
            setTimeout(() => {
                numerotation_bar[0].style.transformOrigin = 'right'
                numerotation_bar[0].style.transform = 'scaleX(0)'
            }, 500)
        }
        if(x == 20){
            resetColor(numerotation, '#aaaaaa')
            numerotation[2].style.color = '#000000'
            numerotation_bar[1].style.transformOrigin = 'left'
            numerotation_bar[1].style.transform = 'scaleX(1)'
            setTimeout(() => {
                numerotation_bar[1].style.transformOrigin = 'right'
                numerotation_bar[1].style.transform = 'scaleX(0)'
            }, 500)
        }
        if(x == 30){
            resetColor(numerotation, '#aaaaaa')
            numerotation[3].style.color = '#000000'
            numerotation_bar[2].style.transformOrigin = 'left'
            numerotation_bar[2].style.transform = 'scaleX(1)'
            setTimeout(() => {
                numerotation_bar[2].style.transformOrigin = 'right'
                numerotation_bar[2].style.transform = 'scaleX(0)'
            }, 500)
        }
        if(x == 40){
            resetColor(numerotation, '#aaaaaa')
            numerotation[4].style.color = '#000000'
            numerotation_bar[3].style.transformOrigin = 'left'
            numerotation_bar[3].style.transform = 'scaleX(1)'
            setTimeout(() => {
                numerotation_bar[3].style.transformOrigin = 'right'
                numerotation_bar[3].style.transform = 'scaleX(0)'
            }, 500)
        }
    
        cameraControls.moveTo(x,0,0,true )
        inner_text.style.transform = `translateX(${-y}px)`
    }

})
home_btn.addEventListener('mousedown', () =>
{ 
    setTimeout(() => {
        hold = true 
    }, 100);
    
})

home_btn.addEventListener('mouseover', () =>
{ 
   show_cursor = true 
})
home_btn.addEventListener('mouseout', () =>
{ 
   show_cursor = false 
})
home_btn.addEventListener('mouseup', () =>
{ 
    setTimeout(() => {
        hold = false 
    }, 100);
    timing = 0
})
function resetColor(el, color){
    for (let index = 0; index < el.length; index++) {
        el[index].style.color = color
    }
}
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
const ambientLight = new THREE.DirectionalLight(0xffffff, 2)
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
    roughness: 1,
})
globe.mesh = new THREE.Mesh(globe.geometry, globe.material)
globe.mesh.position.x = 19
globe.mesh.position.y = 0
globe.mesh.position.z = -4
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
let octa = {}
octa.geometry = new THREE.OctahedronBufferGeometry( 0.5, 0 );
octa.material = new THREE.MeshStandardMaterial({
    color: 0x3f42fa, 
    flatShading: true,
    metalness: 0.5,
    roughness: 1,
})
octa.mesh = new THREE.Mesh(octa.geometry, octa.material)
octa.mesh.position.x = 29
octa.mesh.position.y = 0
octa.mesh.position.z = -2.5
octa.mesh.rotation.x = 0.5
scene.add(octa.mesh)

let tetra = {}
tetra.geometry = new THREE.TetrahedronBufferGeometry( 0.5, 0 );
tetra.material = new THREE.MeshStandardMaterial({
    color: 0x8842fa, 
    flatShading: true,
    metalness: 0.5,
    roughness: 1
})
tetra.mesh = new THREE.Mesh(tetra.geometry, tetra.material)
tetra.mesh.position.x = 39
tetra.mesh.position.y = 0
tetra.mesh.position.z = -2.5
tetra.mesh.rotation.x = 0.5
scene.add(tetra.mesh)


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

let cube2 = {}
cube2.mesh = new THREE.Mesh(cube.geometry, cube.material)
cube2.mesh.position.x = 0
cube2.mesh.position.y = 40
cube2.mesh.position.z = 25
cube2.mesh.rotation.x = 0
scene.add(cube2.mesh)

let cube3 = {}
cube3.mesh = new THREE.Mesh(cube.geometry, cube.material)
cube3.mesh.position.x = 10
cube3.mesh.position.y = 40
cube3.mesh.position.z = 25
cube3.mesh.rotation.x = 0
scene.add(cube3.mesh)

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
    cube2.mesh.rotation.x += 0.001
    cube2.mesh.rotation.y += 0.001
    cube2.mesh.position.y = 40 + Math.sin(nb)/4
    // Renderer40 + 
    renderer.render(scene, camera)
    if(hold){
        timing += 1
        
        if(timing > 30){
            ctn_home.style.opacity = 0 
            setTimeout(() => {
                cameraControls.moveTo(x,0,30,true) 
                
            }, 500);
            setTimeout(() => {
                cameraControls.moveTo(x+1,40,30,true) 

            }, 1000);
            setTimeout(() => {
                ctn_home.style.opacity = 1 
            }, 2000);
        }
        else{
            sml_bar.style.transform = `scaleX(${timing/30})`
        }
            
    }
    else 
    sml_bar.style.transform = `scaleX(0)`
    if(show_cursor){
        cursor_hold.style.opacity = '1'
        cursor_hold.style.left = `${(cursor.x*100)+1.5}%`
        cursor_hold.style.top = `${(cursor.y*100)+2}%`
    }
    else 
        cursor_hold.style.opacity = '0'

    

}
loop()

console.log('nathan dent');


function floating(el, nb){

}   