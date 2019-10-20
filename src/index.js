import './css/style.styl'

import './css/reset.styl'

import * as THREE from 'three'

import * as OBJECT from './Core/ThreeElements.js'


import * as DOM from './Core/data.js'

import CameraControls from 'camera-controls';

import LazyLoad from "vanilla-lazyload";

CameraControls.install( { THREE: THREE } );


let raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

const parent__container = document.querySelector('.content-container')
let dom = new DOM.Reader(parent__container)


document.addEventListener("DOMContentLoaded", function() {
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy" 
    });    
  });

const ctn_home = document.querySelector('.ctn-home')
const inner_text = document.querySelector('.txt-slider-ctn')
const contentManagerMotion = document.querySelectorAll('.content-manager-motion')
const contentManager3D = document.querySelectorAll('.content-manager-3d')
const contentManagerDev = document.querySelectorAll('.content-manager-dev')
const contentManagerDesign = document.querySelectorAll('.content-manager-design')
const numerotation = document.querySelectorAll('.nb-num')
const close_modal_btn = document.querySelectorAll('.cross-ctn')
const return_home = document.querySelectorAll('.return-home')
const modalsbtn = document.querySelectorAll('.video-modal')
const number_color = document.querySelectorAll('.big-nb')
const modalsctn = document.querySelectorAll('.modal-container')
const respo = document.querySelector('.responsive-msg')
const numerotation_bar = document.querySelectorAll('.num_bar')
numerotation[0].style.color = '#000000'

let selectedscene = firstscene
let contentSelected = contentManagerMotion

let intro_show = true

let menu_show = false

let scene_show = false

let modal_show = false


/**
 * Return home
 */

for (let i = 0; i < return_home.length; i++) {
    return_home[i].addEventListener('click', (_event) =>
    {
        returnFonction()

    })
 }
 function returnFonction(bool = false){

    setBoolEnvironnement(false, true, false, false)
    cameraControls.setLookAt(x/2.5, 0, 5, 10, 0, -115, true )
    clearEverythingSingle(contentSelected[indexElementMoving])

    if(!bool) {
        setTimeout(() => {
            ctn_home.style.display = 'flex'
        }, 1000);
        setTimeout(() => {
            ctn_home.style.opacity = 1
        }, 1050);
    }
 }
/**
 * Modals 
 */

 for (let i = 0; i < 1; i++) {
    modalsbtn[i].addEventListener('click', (_event) =>
    {   
        modal_show = true
        modalsctn[i].style.display = 'flex'
        setTimeout(() => {
            modalsctn[i].style.opacity = 1
        }, 50);
    })
    modalsbtn[i].addEventListener('touchstart', (_event) =>
    {
        modal_show = true
    })
 }

 for (let i = 0; i < close_modal_btn.length; i++) {
    modalsctn[i].addEventListener('click', (_event) =>
    {
        modal_show = false
        modalsctn[i].style.opacity = 0
        setTimeout(() => {
            modalsctn[i].style.display = 'none'
            
        }, 550);
    })
    modalsctn[i].addEventListener('touchend', (_event) =>
    {
        modal_show = false
    })
 }
 function closeModals(){
    modal_show = false
    for (let i = 0; i < modalsctn.length; i++) {
        modalsctn[i].style.opacity = 0
        setTimeout(() => {
            modalsctn[i].style.display = 'none'
        }, 550);
     }
 }

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = ( event.clientX / window.innerWidth ) * 2 - 1
    cursor.y = -( event.clientX / window.innerWidth ) * 2 - 1
})


/**
 * Btn home
 */
let x = 0
let y = 0


for (let i = 0; i < numerotation.length; i++) {
    numerotation[i].addEventListener('click', (_event) =>
    {
        changeNum(i)
    })
 }


function transitionHome(index, orientation){
    if(orientation == 'right'){
        numerotation_bar[index].style.transformOrigin = 'right'
        numerotation_bar[index].style.transform = 'scaleX(1)'
        setTimeout(() => {
            numerotation_bar[index].style.transformOrigin = 'left'
            numerotation_bar[index].style.transform = 'scaleX(0)'
        }, 500)
    }
    if(orientation == 'left'){
        numerotation_bar[index].style.transformOrigin = 'left'
        numerotation_bar[index].style.transform = 'scaleX(1)'
        setTimeout(() => {
            numerotation_bar[index].style.transformOrigin = 'right'
            numerotation_bar[index].style.transform = 'scaleX(0)'
        }, 500)
    }

}
function changeNum(index){
        if(index == -10){
            x += 10
            y += 400
        }
        else if(index == 10){
            x -= 10
            y -= 400
        }
        else{
            x = index * 10
            y = 400 * index
        }
        if(x == -10){
            x = 30
            y = 400 * 3
        }
        else if(x == 40){
            x = 0
            y = 0
        }
        if(x == 0){
            resetColor(numerotation, '#aaaaaa')
            numerotation[0].style.color = '#000000'
            if (index == 10){
                transitionHome(0, 'right')
            } 
        }
        if(x == 10){
            resetColor(numerotation, '#aaaaaa')
            numerotation[1].style.color = '#000000'
            if(index == -10){
                transitionHome(0, 'left')
            }
            else if (index == 10){
                transitionHome(1, 'right')
            } 
        }
        if(x == 20){
            resetColor(numerotation, '#aaaaaa')
            numerotation[2].style.color = '#000000'
            if(index == -10){
                transitionHome(1, 'left')
            }
            else if (index == 10){
                transitionHome(2, 'right')
            } 
        }
        if(x == 30){
            resetColor(numerotation, '#aaaaaa')
            numerotation[3].style.color = '#000000'
            if(index == -10){
                transitionHome(2, 'left')
            }
        }

        returnFonction(true)

        inner_text.style.transform = `translateX(${-y}px)`
}
let screen = true


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
const ambientLight = new THREE.DirectionalLight(0xffffff, 1.2)
ambientLight.position.x = 0
ambientLight.position.y = 1
ambientLight.position.z = 1
scene.add(ambientLight)

var light = new THREE.AmbientLight( 0xffffff, 0.7 ); // soft white light
scene.add( light );

/**
 * Object
 */


/**
 * Menu object
 */
let cubeObj = new OBJECT.Element(0x7fff7f, scene, 'Monkey', 1, 1, 1, 1, 0, 0, 2)
let coneObj = new OBJECT.Element(0x3a82fa, scene, 'Cone', 0.5, 1.5, 320, 0, 4, 0, 2)
let dodeObj = new OBJECT.Element(0xfa1212, scene, 'Dodecahedron', 1, 1, 1, 1, 8, 0, 2)
let octaObj = new OBJECT.Element(0x3f42fa, scene, 'Octahedron', 0.5, 1, 0, 1, 12, 0, 2)


/**
 * Scene
 */
let sceneColor = new Array(0xffb3ba,0x4286f4,0x42f4a1,0xe8ca35,0xd1302e,0xb02ed1,0xe52993,0x27f3f7,0xbae1ff,0xed2939,0xffb3ba,0x4286f4,0x42f4a1,0xe8ca35,0xd1302e,0xb02ed1,0xe52993,0x27f3f7,0xbae1ff,0xed2939)
let firstscene = new OBJECT.Scene(scene, 0, 40, 25, contentManagerMotion.length, 'Cube',1,1,1,1, sceneColor)
let secondscene = new OBJECT.Scene(scene, 10, 60, 25, contentManager3D.length, 'Cone', 0.5, 1.5, 320, 0, sceneColor)
let thirdscene = new OBJECT.Scene(scene, 20, 30, 25, contentManagerDev.length, 'Dodecahedron', 0.5, 1.5, 1, 0, sceneColor)
let fourthscene = new OBJECT.Scene(scene, 30, 80, 25, contentManagerDesign.length, 'Octahedron', 0.5, 1, 0, 0, sceneColor)
let random = new OBJECT.RandomElement(scene, 0, 0, -50, 1000, 1, 1, 1, 1)

/**
 * Colors
 */
for (let index = 0; index < number_color.length; index++) {
   // number_color[index].style.color = `#${sceneColor[index].toString(16)}`
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height)
camera.position.z = 0
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * camera controls 
 */
const clock = new THREE.Clock();
const cameraControls = new CameraControls(camera, renderer.domElement, false);

cameraControls.dampingFactor = 0.05

/**
 * intro 
 */

const intro_container = document.querySelector('.intro__container')
let timeout_x = 0
let interval = setInterval(() => {
    timeout_x = timeout_x - 0.01
    cameraControls.rotateTo(timeout_x, 0, true)
}, 200);

introduction()

selectedscene = firstscene

function introduction() {
    ctn_home.style.display = "none"
    ctn_home.style.opacity = "0"
    cameraControls.setLookAt(0, 0, 0, 0, 0, 0, false)
    cameraControls.dolly( 200, false )

    const launch = document.querySelector('.launch_btn')

    launch.addEventListener('click', () => {
        animationStart(interval, intro_container)
    })
}

function animationStart(interval, intro_container) {

    let timeout_y = 0
    let interval_y 

    setTimeout(() => {
        //returnFonction()
        clearInterval(interval);
        cameraControls.setTarget(0, 0, -100, true)
        cameraControls.dolly( 200, true )
        intro_container.style.transform = "translate(-50%, -50%) scale(0)"
        intro_container.style.opacity = "0"
        setTimeout(() => {    
            intro_container.style.display = "none"
        }, 600);

        interval_y = setInterval(() => {
            timeout_y = timeout_y - 0.01
            cameraControls.rotate(timeout_y, 0, true)  
        }, 100);
    }, 0);


    setTimeout(() => {
        returnFonction()
        clearInterval(interval_y);
        setBoolEnvironnement(false, true, false, false)
    }, 3000);
}

/**
 * Hide one element of scene
 */
function clearEverythingSingle(el){
    el.style.opacity = 0
    el.style.transform = `rotate3d(0,1,0,3deg) translateZ(${500*moving}px)`
        setTimeout(() => {
            el.style.display = 'none'
        }, 250);
}

/**
 * Show one element of scene
 */
function showEl(el){
    el[indexElementMoving].style.display = 'flex'
    el[indexElementMoving].style.transform = `rotate3d(0,1,0,3deg) translateZ(0px)`
    respo.style.display = 'block'
    setTimeout(() => {
        el[indexElementMoving].style.opacity = 1
    }, 1000);
}

/**
 * Hide Main Navigation Menu
 */
function hideMenu() {
    ctn_home.style.opacity = '0'

    setTimeout(() => {
        ctn_home.style.display = 'none'
    }, 1050); 
}

/**
 * On click menu go to first element
 */
function seeMenu(){
    setBoolEnvironnement(false, false, true, false)
    indexElementMoving = 0

    if(x == 0){
        selectedscene = firstscene
        contentSelected = contentManagerMotion

        hideMenu()

        setTimeout(() => {
            moveBetweenElements(0)
        }, 1000);
    }
    else if(x == 10){
        selectedscene = secondscene
        contentSelected = contentManager3D
        hideMenu()
        setTimeout(() => {
            moveBetweenElements(0)
        }, 1000);
    }
    else if(x == 20){
        selectedscene = thirdscene
        contentSelected = contentManagerDev

        hideMenu()

        setTimeout(() => {
            moveBetweenElements(0)
        }, 1000);
    }
    else if(x == 30){
        selectedscene = fourthscene
        contentSelected = contentManagerDesign

        hideMenu()

        setTimeout(() => {
            moveBetweenElements(0)
        }, 1000);
    }
    else{
        ctn_home.style.color = 'red'
        setTimeout(() => {
            ctn_home.style.color = 'black'
        }, 700);

        setBoolEnvironnement(false, true, false, true)
    }
}

/**
 * Scroll handlers
 */
let movingScroll = true
window.addEventListener( 'wheel', onMouseWheel, false );
window.addEventListener( 'scroll', onMouseWheel, false );

function onMouseWheel( ) {
    if(scene_show)
        moveCamera(0,selectedscene)
};

/**
 * Key Handlers
 */
window.addEventListener('keydown', function(event) {
    const key = event.key;
    if (scene_show) {
        moveCamera(key,selectedscene)
    }
    if(key === "Escape" && scene_show)
        returnFonction()
    else if(key === "ArrowLeft" && menu_show){
        changeNum(10)
    }
    else if (key === "ArrowRight" && menu_show){
        changeNum(-10)
    }
    else if (key === "Enter" && menu_show){
        seeMenu()
        console.log('noo');
        
    }
    else if (key === "Enter" && intro_show){
        animationStart(interval, intro_container)
    }
});


/**
 * Responsive on touch 
 */
document.addEventListener('touchstart', () =>
{     
    if(scene_show)
        moveCamera('ArrowUp',selectedscene)
})


/**
 * Evironnement Handlers
 */
function setBoolEnvironnement(intro, menu, scene, modal) {

    intro_show = intro
    menu_show = menu
    scene_show = scene
    modal_show = modal
 
}

function evironnement(refresh) {
 setInterval(() => {
     
     if (intro_show) {
        console.log("Your current evironnement is : INTRODUCTION");
     } 

     if (menu_show) {
        console.log("Your current evironnement is : MENU");
     }

     if (scene_show) {
        console.log("Your current evironnement is : SCENE");
     }

     if(modal_show) {
        console.log("Your current evironnement is : MODAL");
     }
     
 }, refresh);   
}

/**
 * DEBUG
 */
evironnement(1000)



/**
 * Move between elements in scene
 */
let moving = 1
let indexElementMoving = 0
function moveCamera(key = 0, scene){
    closeModals() 
    if(key != 39 || key != 37){
        if((((event.deltaY/100) < -0.8) || key === 'ArrowUp') && movingScroll){
            clearEverythingSingle(contentSelected[indexElementMoving])
            moving = 1
            indexElementMoving += 1
            if(indexElementMoving > selectedscene.arrayElement.length-1){
                indexElementMoving = 0
            }

            moveBetweenElements(150)

        } 
        if((((event.deltaY/100) > 0.8) || key === 'ArrowDown') && movingScroll){
            clearEverythingSingle(contentSelected[indexElementMoving])
            moving = -1
            indexElementMoving -= 1
            if(indexElementMoving < 0){
                indexElementMoving = selectedscene.arrayElement.length - 1
            }
            
            moveBetweenElements(150)
        } 
    }
}

function moveBetweenElements(timeout) {
    let cameraPos = cameraControls.getPosition()
    let distance = cameraPos.distanceTo(selectedscene.arrayElement[indexElementMoving].element.mesh.position)
    cameraControls.setTarget(selectedscene.arrayElement[indexElementMoving].posx,selectedscene.arrayElement[indexElementMoving].posy,selectedscene.arrayElement[indexElementMoving].posz-2,true)
    cameraControls.dolly(-distance + 3, true)
    movingScroll = false
    setTimeout(() => {
        movingScroll = true
        showEl(contentSelected)
    }, timeout);
}


/**
 * Loop
 */

const loop = () =>
{

    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update( delta );
    window.requestAnimationFrame(loop)
    
    cubeObj.animationObj()
    coneObj.setAnimation(0.01, 0.002, true, true, true, false,4)
    dodeObj.setAnimation(0.01, 0.002, true, true, true, false,4)
    octaObj.setAnimation(0.01, 0.002, true, true, true, false,4)
    firstscene.animationPlay(true, true, true, true)
    secondscene.animationPlay(true, true, true, false)
    thirdscene.animationPlay(true, true, true, true)
    fourthscene.animationPlay(true, true, true, true)

    cubeObj.isHoveredObj(mouse, camera, raycaster)
    coneObj.isHovered(mouse, camera, raycaster)
    dodeObj.isHovered(mouse, camera, raycaster)
    octaObj.isHovered(mouse, camera, raycaster)
 
    random.animationPlay()

    renderer.render(scene, camera)

}

window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', () => {
    cubeObj.isClicked(cursor, camera, raycaster, seeMenu)
    coneObj.isClicked(cursor, camera, raycaster, seeMenu)
    dodeObj.isClicked(cursor, camera, raycaster, seeMenu)
    octaObj.isClicked(cursor, camera, raycaster, seeMenu)
});
loop()

/**
 * To do : 
 * Responsive touch X
 * Dom generation
 * Better scroll with trackpad X
 * Key control (up/down arrow) X
 * JSON implementation (lol flemme)
 * Lazy load X
 * IMPORTANT // PROTOTYPE 
 * Responsive ready X
 * Implement content X
 * Block other content not implemented (warning message) X
 * See for video optimization (youtube a/o something else) X
 * re order content 
 * add dev content 
 * see for scroll 
 * intro
 * 
 */


function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 500);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id) {
    document.getElementById(id).style.opacity = "0"

    setTimeout(() => {
        document.getElementById(id).style.display = 'none'
    }, 550);

}

onReady(function () {
    show('loading', false);
});