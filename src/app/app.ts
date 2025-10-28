import { Component, signal } from '@angular/core';
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
export class App {
  protected readonly title = signal('portfolio');

}
