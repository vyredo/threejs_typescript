// add styles
import './style.css'
// three.js
import * as THREE from 'three'

function init(){
	let scene = new THREE.Scene();
		scene.background = new THREE.Color(0xababab);

		// create and locate the camera
	
	let camera = new THREE.PerspectiveCamera(30,
		window.innerWidth / window.innerHeight, 
		1, 1000);
		camera.position.z = 5;

	let renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
	
	document.body.appendChild(renderer.domElement);

	return { renderer, camera, scene };
}

let { renderer, camera, scene } = init();

let mainLoop = function(){
	type createCubeT = (x:number, y:number, z:number, color: string) => THREE.Mesh; 
	let createCube:createCubeT = function(x:number, y:number, z:number, color: string){

		let geometry = new THREE.BoxGeometry(x,y,z);
		let material = new THREE.MeshBasicMaterial({ color });
	}
	
	scene.add()
	renderer.render(scene, camera);
	requestAnimationFrame(mainLoop);	
}

init();
mainLoop();