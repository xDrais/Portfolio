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

    // render three canvas element to a specific div
    const container = document.querySelector('.three-container') as HTMLElement;
    container.appendChild(renderer.domElement);

    // render three canvas element on default div
    // document.body.appendChild(renderer.domElement);

    // adding cube to the scene center
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

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
    // const gridHelper = new THREE.GridHelper(200, 5);
    // scene.add(gridHelper);


    const controls = new OrbitControls(camera, renderer.domElement);
    // camera.position.z = 50;


    // Adding stars to the scene
    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({color: 0xffffff});
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3).fill(100).map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(200).fill(200).forEach(() => addStar());


    // add scene background image
    // const spaceTexture = new THREE.TextureLoader().load('space2.jpg');
    // scene.background = spaceTexture;
    scene.background = new THREE.TextureLoader().load('space2.jpg');

    // avatar
    const yassineTexture = new THREE.TextureLoader().load('photo.png');
    const yassine = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({map: yassineTexture})
    )
    scene.add(yassine);



    // camera on scroll
    function moveCamera(){
      // const t = document.body.getBoundingClientRect().top;
      const t = window.scrollY;
      yassine.rotation.x += 0.01;
      yassine.rotation.y += 0.01;

      camera.position.z = -50  + t * -0.01;
      camera.position.x = t * -0.002;
      camera.rotation.y = t * -0.01;
    }

    // document.body.onscroll = moveCamera;
    window.addEventListener('scroll', moveCamera);

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
