// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import { MeshBasicMaterial } from 'three';

function init(){
	let scene = new THREE.Scene();
		scene.background = new THREE.Color(0xababab);

		// create and locate the camera
	
	let camera = new THREE.PerspectiveCamera(100,
		window.innerWidth / window.innerHeight, 
		1, 1000);
		camera.position.z = 10;
		camera.position.y = -2;

	let renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
	
	document.body.appendChild(renderer.domElement);

	return { renderer, camera, scene };
}

let { renderer, camera, scene } = init();

function generateGeometries(){
	type createCubeT = (x:number, y:number, z:number, option:THREE.MeshBasicMaterialParameters) => THREE.Mesh; 
	let createCube:createCubeT = function(x, y, z, option){
		let geometry = new THREE.BoxGeometry(x,y,z);
		let material = new THREE.MeshBasicMaterial(option);
		return new THREE.Mesh(geometry, material);
	}

	

	const cube1 = createCube(1,1,1,{color: 0Xc9b92b});
	cube1.position.z = -6;
	cube1.position.y = -5; 

	const cube2 = createCube(3,3,3,{color: 0Xff0040, transparent: true, opacity: 0.8})
	cube2.position.z = 6;
	cube2.position.y = -5; 

	const plane = new THREE.Mesh(
		new THREE.PlaneGeometry(1000,1000,50,50),
		new THREE.MeshBasicMaterial({color: 0Xa6f995, wireframe: true})
	);
	plane.rotation.x = Math.PI / 2;
	plane.position.y = -100;
	return { cube1, cube2, plane };
}

let { cube1, cube2, plane } = generateGeometries();

let state = {
	cube1: 'left' as dir,
	cube2: 'right' as dir
}

type dir = 'left' | 'right';

const moveCubeByDirection = (cube:THREE.Mesh, dir: dir) => {
	if(dir === 'left'){
		cube.position.x += 0.1;
	} else {
		cube.position.x -= 0.1;
	}
	return cube;
}

let mainLoop = function(state){
	
	cube1 = moveCubeByDirection(cube1, state.cube1);
	cube2 = moveCubeByDirection(cube2, state.cube2);
	console.log('cube1', cube1.position)
	console.log('cube2', cube2.position)

	if(cube1.position.x >= 1000 || cube1.position.x <= 0){
		state.cube1 = state.cube1 === 'left' ? 'right' : 'left';
	} 
	if(cube2.position.x >= 1000 || cube2.position.x <= 0) {
		state.cube2 = state.cube2 === 'left' ? 'right' : 'left';
	}



	scene.add(plane);
	scene.add(cube1);
	scene.add(cube2);

	renderer.render(scene, camera);
	requestAnimationFrame(mainLoop.bind(null,state));	
}

init();
mainLoop(state);