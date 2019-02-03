import './css/style.styl'

import './css/reset.styl'

import * as THREE from 'three'

const createFps = require('fps-indicator');
let fps = createFps();

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
const ambientLight = new THREE.DirectionalLight(0xffffff, 1)
ambientLight.position.x = 0
ambientLight.position.y = 1
ambientLight.position.z = 0.5
scene.add(ambientLight)
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
globe.mesh.position.x = 0
globe.mesh.position.y = 0
globe.mesh.position.z = 0

scene.add(globe.mesh)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    globe.mesh.rotation.y += 0.001


    // Renderer
    renderer.render(scene, camera)
    
}
loop()

