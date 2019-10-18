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

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

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
const home_btn = document.querySelector('.btn-home')
const inner_text = document.querySelector('.txt-slider-ctn')
const cursor_hold = document.querySelector('.cursor-hold')
const sml_bar = document.querySelector('.sml-bar')
const dumb_btn = document.querySelector('.dumb-btn')
const contentManagerMotion = document.querySelectorAll('.content-manager-motion')
const contentManager3D = document.querySelectorAll('.content-manager-3d')
const contentManagerDev = document.querySelectorAll('.content-manager-dev')
const contentManagerDesign = document.querySelectorAll('.content-manager-design')
const numerotation = document.querySelectorAll('.nb-num')
const close_modal_btn = document.querySelectorAll('.cross-ctn')
const return_home = document.querySelectorAll('.return-home')
const modalsbtn = document.querySelectorAll('.video-modal')
const number_color = document.querySelectorAll('.big-nb')
const see_more = document.querySelectorAll('.see-more')
const modalsctn = document.querySelectorAll('.modal-container')
const modalsctn3d = document.querySelectorAll('.modal-container')
const respo = document.querySelector('.responsive-msg')
const numerotation_bar = document.querySelectorAll('.num_bar')
numerotation[0].style.color = '#000000'
const createFps = require('fps-indicator')
//let fps = createFps()
let selectedscene = firstscene
let print_content = true
let contentSelected = contentManagerMotion




console.log(modalsctn);

/**
 * Return home
 */

for (let i = 0; i < return_home.length; i++) {
    return_home[i].addEventListener('click', (_event) =>
    {
        returnFonction()

    })
 }
 function returnFonction(decal = 0){
    cursor_selected = false 
    timing = 0
    cameraControls.setLookAt( (x + decal) /2.5, 0, 5, 10, 0, -115, true )
    clearEverythingSingle(contentSelected[indexElementMoving])
    //cameraControls.moveTo(x,0,0,true)
    setTimeout(() => {
        ctn_home.style.display = 'flex'
    }, 1000);
    setTimeout(() => {
        ctn_home.style.opacity = 1
    }, 1050);
 }
/**
 * Modals 
 */
let modal_show = false
 for (let i = 0; i < 1; i++) {
    modalsbtn[i].addEventListener('click', (_event) =>
    {
        console.log(i);
        
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

const touchpos = {}
touchpos.x = 0
touchpos.y = 0
window.addEventListener('touchestart', (_event) =>
{
    touchpos.x = _event.touches[0].clientX/sizes.width ;
    touchpos.y = _event.touches[0].clientY/ sizes.height;    
})
window.addEventListener('touchmove', (_event) =>
{
    touchpos.x = _event.touches[0].clientX/sizes.width ;
    touchpos.y = _event.touches[0].clientY/ sizes.height;    
})

/**
 * Btn home
 */
let x = 0
let y = 0
let hold = false 
let timing = 0
let show_cursor = false

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
    if(!hold){
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
        //cameraControls.moveTo(x,0,-10,true)
        //cameraControls.dolly(0,false)
        returnFonction()
        inner_text.style.transform = `translateX(${-y}px)`
    }
}
let screen = true

/*
dumb_btn.addEventListener('click', () => {
    seeMenu()
})
home_btn.addEventListener('mousedown', () =>
{ 
    setTimeout(() => {
        hold = true 
    }, 100);
})
home_btn.addEventListener('touchstart', () =>
{ 
    screen = false
    show_cursor = true 
    setTimeout(() => {
        hold = true 
    }, 100);
})
home_btn.addEventListener('mouseover', () =>
{ 
   screen = true
   show_cursor = true 
})
home_btn.addEventListener('mouseout', () =>
{ 
   show_cursor = false 
})
home_btn.addEventListener('touchleave', () =>
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
home_btn.addEventListener('touchend', () =>
{ 
    show_cursor = false 
    setTimeout(() => {
        hold = false 
    }, 100);
    timing = 0
})
*/
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
//scene.add(octa.mesh)

/**
 * Menu object
 */
let cubeObj = new OBJECT.Element(0x7fff7f, scene, 'Cube', 1, 1, 1, 1, 0, 0, 2)
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

console.log(firstscene.arrayElement[0].posx);

for (let index = 0; index < number_color.length; index++) {
    number_color[index].style.color = `#${sceneColor[index].toString(16)}`
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
ctn_home.style.display = "none"
ctn_home.style.opacity = "0"
cameraControls.setLookAt(0, 0, 0, 0, 0, 0, false)
cameraControls.dolly( 200, false )

let intro_container = document.querySelector('.intro__container')

let launch = document.querySelector('.launch_btn')

let timeout_x = 0
let interval = setInterval(() => {
    timeout_x = timeout_x - 0.01
    cameraControls.rotateTo(timeout_x, 0, true)
}, 200);

launch.addEventListener('click', () => {
    animationStart()
})



function animationStart() {

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
        //cameraControls.setLookAt(0, 0, 0, 0, 0, -100, false)
    }, 0);


    setTimeout(() => {
        returnFonction()
        clearInterval(interval_y);
        //cameraControls.setLookAt(0, 0, 0, 0, 0, -100, false)
    }, 3000);
}





//cameraControls.rotate( 180, 0, true )



function clearEverything(els){
    for (let index = 0; index < els.length; index++) {
        els[index].style.opacity = 0
        els[index].style.transform = `rotate3d(0,1,0,3deg) translateZ(${500*moving}px)`
        setTimeout(() => {
            els[index].style.display = 'none'
        }, 250);
        
    }
    
}
function clearEverythingSingle(el){
    el.style.opacity = 0
    el.style.transform = `rotate3d(0,1,0,3deg) translateZ(${500*moving}px)`
        setTimeout(() => {
            el.style.display = 'none'
        }, 250);
        
    
    
}
function showEl(el){
    el[indexElementMoving].style.display = 'flex'
    el[indexElementMoving].style.transform = `rotate3d(0,1,0,3deg) translateZ(0px)`
    respo.style.display = 'block'
    setTimeout(() => {
        el[indexElementMoving].style.opacity = 1
    }, 1000);
}

function getAppear(scene, content) {

    clearEverything(content)

    console.log(indexElementMoving);
    

    if(print_content){
        hold = false 
        content[indexElementMoving].style.display = 'flex'
        content[indexElementMoving].style.transform = `rotate3d(0,1,0,3deg) translateZ(0px)`
        respo.style.display = 'block'
        console.log("appear");
        setTimeout(() => {
            content[indexElementMoving].style.opacity = 1
        }, 250);
    }
    else{
        for (let index = 0; index < scene.arrayElement.length; index++) {
            content[index].style.opacity = 0
            content[index].style.transform = `rotate3d(0,1,0,3deg) translateZp${500*moving}px)`
            setTimeout(() => {
                content[index].style.display = 'none'
                respo.style.display = 'none'
            }, 250);
        }
    }
}
let cursor_selected = false
selectedscene = firstscene 
function seeMenu(){
    if(x == 0 && !cursor_selected){
        ctn_home.style.opacity = '0'
        cursor_hold.style.opacity = '0'
        selectedscene = firstscene
        contentSelected = contentManagerMotion
        indexElementMoving = 0
        max_len = -50
        min_len = 30
        setTimeout(() => {
            let distance = cameraControls.object.position.distanceTo(selectedscene.arrayElement[indexElementMoving].element.mesh.position)
            cameraControls.setTarget(selectedscene.arrayElement[indexElementMoving].posx,selectedscene.arrayElement[indexElementMoving].posy,selectedscene.arrayElement[indexElementMoving].posz-2,true)
            setTimeout(() => { 
                cameraControls.dolly(-distance + 2, true)
            }, 0);
            showEl(contentSelected)
            posc = firstscene.posz + 5
            setTimeout(() => {
                ctn_home.style.display = 'none'
            }, 50);
            setTimeout(() => {
                cursor_hold.style.opacity = '0'
            }, 4000);
            cursor_selected = true 
        }, 1000);
    }
    else if(x == 10 && !cursor_selected){
        ctn_home.style.opacity = '0'
        cursor_hold.style.opacity = '0'
        selectedscene = secondscene
        contentSelected = contentManager3D
        max_len = 10
        min_len = 30
        setTimeout(() => {
            let distance = cameraControls.object.position.distanceTo(selectedscene.arrayElement[indexElementMoving].element.mesh.position)
            cameraControls.setTarget(selectedscene.arrayElement[indexElementMoving].posx,selectedscene.arrayElement[indexElementMoving].posy,selectedscene.arrayElement[indexElementMoving].posz-2,true)
            setTimeout(() => { 
                cameraControls.dolly(-distance + 2, true)
            }, 0);
            showEl(contentSelected)
            posc = secondscene.posz + 5
            setTimeout(() => {
                ctn_home.style.display = 'none'
            }, 50);
            setTimeout(() => {
                cursor_hold.style.opacity = '0'
            }, 4000);
            cursor_selected = true 
        }, 1000);
    }
    else if(x == 20 && !cursor_selected){
        ctn_home.style.opacity = '0'
        cursor_hold.style.opacity = '0'
        selectedscene = thirdscene
        contentSelected = contentManagerDev
        max_len = -20
        min_len = 30
        setTimeout(() => {
            let distance = cameraControls.object.position.distanceTo(selectedscene.arrayElement[indexElementMoving].element.mesh.position)
            cameraControls.setTarget(selectedscene.arrayElement[indexElementMoving].posx,selectedscene.arrayElement[indexElementMoving].posy,selectedscene.arrayElement[indexElementMoving].posz-2,true)
            setTimeout(() => { 
                cameraControls.dolly(-distance + 2, true)
            }, 0);
            showEl(contentSelected)
            posc = thirdscene.posz + 5
            setTimeout(() => {
                ctn_home.style.display = 'none'
            }, 50);
            setTimeout(() => {
                cursor_hold.style.opacity = '0'
            }, 4000);
            cursor_selected = true 
        }, 1000);
    }
    else if(x == 30 && !cursor_selected){
        ctn_home.style.opacity = '0'
        cursor_hold.style.opacity = '0'
        selectedscene = fourthscene
        contentSelected = contentManagerDesign
        max_len = -20
        min_len = 30
        setTimeout(() => {
            let distance = cameraControls.object.position.distanceTo(fourthscene.arrayElement[indexElementMoving].element.mesh.position)
            cameraControls.setTarget(fourthscene.arrayElement[indexElementMoving].posx,fourthscene.arrayElement[indexElementMoving].posy,fourthscene.arrayElement[indexElementMoving].posz-2,true)
            setTimeout(() => { 
                cameraControls.dolly(-distance + 2, true)
            }, 0);
            showEl(contentSelected)
            posc = fourthscene.posz + 5
            setTimeout(() => {
                ctn_home.style.display = 'none'
            }, 50);
            setTimeout(() => {
                cursor_hold.style.opacity = '0'
            }, 4000);
            cursor_selected = true 
        }, 1000);
    }
    else{
        ctn_home.style.color = 'red'
        setTimeout(() => {
            ctn_home.style.color = 'black'
        }, 700);
    }
}
function holdMouse(){
    if(hold){
        timing += 1
        if(timing > 30){
            seeMenu()
        }
        else{
            sml_bar.style.transform = `scaleX(${timing/30})`
        }
            
    }
    else 
        sml_bar.style.transform = `scaleX(0)`
    if(show_cursor){
        cursor_hold.style.opacity = '1'
        if(screen){
            cursor_hold.style.left = `${(cursor.x*100)+1.5}%`
            cursor_hold.style.top = `${(cursor.y*100)+2}%`
        }
        else{
            cursor_hold.style.left = `${(touchpos.x*100)-10}%`
            cursor_hold.style.top = `${(touchpos.y*100)-10}%`
        }
        
    }
    else 
        cursor_hold.style.opacity = '0'
}
let posc = 10
let resetCamera = true
let movingScroll = true
window.addEventListener( 'wheel', onMouseWheel, false );
window.addEventListener( 'scroll', onMouseWheel, false );
function onMouseWheel( event ) {
    //event.preventDefault();
    if(posc != camera.position.z && resetCamera){
        //posc = camera.position.z
        resetCamera = false 
    }
    //posc += event.deltaY * 0.003;
    moveCamera(0,selectedscene)
};

window.addEventListener('keydown', function(event) {
    const key = event.key;
    moveCamera(key,selectedscene)
    if(key === "Escape")
        returnFonction()
    else if(key === "ArrowLeft" && !cursor_selected){
        changeNum(10)
    }
    else if (key === "ArrowRight" && !cursor_selected){
        changeNum(-10)
    }
    else if (key === "Enter"){
        seeMenu()
    }
});
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        seeMenu()
    }
}
document.addEventListener('touchstart', () =>
{     
    if(!modal_show)
        moveCamera('ArrowUp',selectedscene)
})
let max_len = -50
let min_len = 30
let moving = 1
let indexElementMoving = 0

function moveCamera(key = 0, scene){
    closeModals() 
    if(key != 39 || key != 37){
        if((((event.deltaY/100) < -0.8) || key === 'ArrowUp') && movingScroll){
            console.log('scrool ?')
            clearEverythingSingle(contentSelected[indexElementMoving])
            moving = 1
            indexElementMoving += 1
            if(indexElementMoving > selectedscene.arrayElement.length-1){
                indexElementMoving = 0
            }
            let distance = cameraControls.object.position.distanceTo(selectedscene.arrayElement[indexElementMoving].element.mesh.position)
            cameraControls.setTarget(selectedscene.arrayElement[indexElementMoving].posx,selectedscene.arrayElement[indexElementMoving].posy,selectedscene.arrayElement[indexElementMoving].posz-2,true)
            setTimeout(() => { 
                cameraControls.dolly(-distance + 3, true)
            }, 0);
            movingScroll = false
            setTimeout(() => {
                movingScroll = true
                showEl(contentSelected)
            }, 150);
        } 
        if((((event.deltaY/100) > 0.8) || key === 'ArrowDown') && movingScroll){
            clearEverythingSingle(contentSelected[indexElementMoving])
            moving = -1
            indexElementMoving -= 1
            if(indexElementMoving < 0){
                indexElementMoving = selectedscene.arrayElement.length - 1
            }
            
            let distance = cameraControls.object.position.distanceTo(selectedscene.arrayElement[indexElementMoving].element.mesh.position)
            cameraControls.setTarget(selectedscene.arrayElement[indexElementMoving].posx,selectedscene.arrayElement[indexElementMoving].posy,selectedscene.arrayElement[indexElementMoving].posz,true)
            setTimeout(() => { 
                cameraControls.dolly(-distance + 3, true)
            }, 1000);
            movingScroll = false
            setTimeout(() => {
                movingScroll = true
                showEl(contentSelected)
            }, 1200);
        } 
    }
}


/**
 * Loop
 */
let nb = 0

//console.log(scene.children[3].children, camera, cursor);

const loop = () =>
{

    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update( delta );
    window.requestAnimationFrame(loop)
    
    nb += 0.01
    cubeObj.setAnimation(0.01, 0.002, true, true, true, false,4)
    coneObj.setAnimation(0.01, 0.002, true, true, true, false,4)
    dodeObj.setAnimation(0.01, 0.002, true, true, true, false,4)
    octaObj.setAnimation(0.01, 0.002, true, true, true, false,4)
    firstscene.animationPlay(true, true, true, true)
    secondscene.animationPlay(true, true, true, false)
    thirdscene.animationPlay(true, true, true, true)
    fourthscene.animationPlay(true, true, true, true)

    //cubeObj.debug(nb)
    cubeObj.isHovered(mouse, camera, raycaster)
    coneObj.isHovered(mouse, camera, raycaster)
    dodeObj.isHovered(mouse, camera, raycaster)
    octaObj.isHovered(mouse, camera, raycaster)
 
    random.animationPlay()
    holdMouse()
    renderer.render(scene, camera)
    //console.log(selectedscene);
    
    //getAppear(selectedscene, contentSelected)
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