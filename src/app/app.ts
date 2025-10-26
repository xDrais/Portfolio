import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    { provide: Window, useValue: window}
  ]
})
export class App implements AfterViewInit{
  protected readonly title = signal('portfolio');
  constructor(private window: Window){

  }

  ngAfterViewInit(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );
    renderer.setAnimationLoop( animate );
    
    document.body.appendChild( renderer.domElement );

    function animate( time: number ) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render( scene, camera );
    }
  }
}
