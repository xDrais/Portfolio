import {AfterViewInit, Component} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  providers: [
    {provide: Window, useValue: window}
  ]
})
export class MainPage implements AfterViewInit {
  constructor(private window: Window) {
  }

  ngAfterViewInit() {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const geometryTwo = new THREE.TorusGeometry(10, 3, 16, 100);
    const materialTwo = new THREE.MeshStandardMaterial({color: 0x00ff00});
    const torus = new THREE.Mesh(geometryTwo, materialTwo);
    scene.add(torus);


    // point light
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // light helper to show the light positon
    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper);

    // grid helper for the pov
    const gridHelper = new THREE.GridHelper(200, 5);
    scene.add(gridHelper);


    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 50;

    function animate() {
      // requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      controls.update();
      renderer.render(scene, camera);
    }
  }
}
