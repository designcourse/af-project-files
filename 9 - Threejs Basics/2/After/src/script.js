import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap' 

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshToonMaterial()
material.color = new THREE.Color(0xffcc00)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
sphere.position.z = -3
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Dat.GUI

const ringFolder = gui.addFolder('Ring')
ringFolder.add(sphere.position, 'x').min(-7).max(7).step(0.01)
ringFolder.add(sphere.position, 'y').min(-3).max(3).step(0.01)
ringFolder.add(sphere.position, 'z').min(-3).max(3).step(0.01)

let canvasEl = document.querySelector('canvas')
let isZPositive = false
const colorObject = { color: '#ffcc00'}

canvasEl.addEventListener('click', () => {
    const targetZ = isZPositive ? -3 : 1.78;
    const changeColor = isZPositive ? '#ffcc00' : 'red';
    gsap.to(sphere.position, { z: targetZ, duration: 2, ease: 'power3.inOut'})
    gsap.to(colorObject, {
        color: changeColor,
        duration: 2,
        ease: 'power3.inOut',
        onUpdate: () => {
            sphere.material.color.set(colorObject.color)
        }
    })
    isZPositive = !isZPositive;
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()