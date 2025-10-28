import {AfterViewInit, Component} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  providers: [
  { provide: Window, useValue: window}
]
})
export class MainPage implements AfterViewInit{
  constructor(private window: Window){}

  ngAfterViewInit(){
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    // const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
    // camera.position.z = 1;

    // const scene = new THREE.Scene();

    // const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    // const material = new THREE.MeshNormalMaterial();

    // const mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );

    // const renderer = new THREE.WebGLRenderer( { antialias: true } );
    // renderer.setSize( width, height );
    // renderer.setAnimationLoop( animate );

    // document.body.appendChild( renderer.domElement );

    // function animate( time: number ) {
    //   mesh.rotation.x = time / 2000;
    //   mesh.rotation.y = time / 1000;

    //   renderer.render( scene, camera );
    // }


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 10;

    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }
  }
}
