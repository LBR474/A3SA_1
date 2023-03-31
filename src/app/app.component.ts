import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Scene } from './components/scene.component';
import { NgtCanvas } from 'angular-three';


import {
  FMopenClose,
  openClose,
  // logoOpenClose,
  rightOpenClose,
  teardropChangeColor,
} from './animations/animations';

import { gsap } from 'gsap';

@Component({
  selector: 'my-app',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="opener">
      <div
        class="left-withdraw"
        [@openClose]="isOpen ? 'closed' : 'open'"
      ></div>
      <div
        class="right-withdraw"
        [@rightOpenClose]="isOpen ? 'closed' : 'open'"
        (@rightOpenClose.start)="rightAnimDone($event)"
      ></div>
      <div class="teardrop">
        <svg height="160" width="300">
          <g id="Capa_1_group" transform="translate(135, 0)">
            <path
              [@teardropChangeColor]="TDisOpen ? 'closed' : 'open'"
              id="Capa_1"
              d="M 15 3 Q 18 14 25 18  A 12.8 12.8 0 1 1 6 18 Q 13 14 15 3 z"
              stroke="black"
              strokeWidth="3"
              fill="black"
            />
          </g>
          <g id="CapaLine1_group" transform="translate(135, 0)">
            <path
              [@teardropChangeColor]="TDisOpen ? 'closed' : 'open'"
              id="CapaLine_1"
              d="M 15 160 L 13 160"
              stroke="black"
              strokeWidth="4"
            />
          </g>
          <g id="CapaLine2_group" transform="translate(135, 0)">
            <path
              [@teardropChangeColor]="TDisOpen ? 'closed' : 'open'"
              id="CapaLine_2"
              d="M 15 160 L 17 160"
              stroke="black"
              strokeWidth="4"
            />
          </g>
        </svg>
      </div>
      <div class="titleDiv" [@FMopenClose]="FMisOpen ? 'open' : 'closed'">
        <h1>A digital design experience </h1>
      </div>
      <div class="canvasDiv" [@FMopenClose]="FMisOpen ? 'open' : 'closed'">
        <ngt-canvas
    [sceneGraph]="Scene"
    [camera]="{ far: 1000, near: 0.1, position: [0, 7, 50], zoom: 1 }"
    [style]="{
     
    }"
    
  />
   <!-- backgroundColor: 'darkgray' -->
      </div>
    </div>
  `,
  imports: [NgtCanvas],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    FMopenClose,
    // logoOpenClose,
    openClose,
    rightOpenClose,
    teardropChangeColor,
  ],
})
export class AppComponent implements OnInit {
  readonly Scene = Scene;

  isOpen = false;
  anim2 = false;
  logoisOpen = false;
  FMisOpen = false;
  TDisOpen = false;

  ngOnInit() {
    // ...

    setTimeout(() => {
      this.isOpen = true;
      this.FMisOpen = false;
      this.TDisOpen = true;
    }, 1500);
  }

  

  rightAnimDone(event: any) {
    if (event.fromState != 'void') {
      console.log(event.fromState);

      setTimeout(() => {
        this.FMisOpen = true;
        //this.TDisOpen = false;
      }, 5000);

      const tl = gsap.timeline({ delay: 1.0 });
      tl.to('.teardrop', { duration: 1.5, zIndex: -1 })

        .to(
          '#CapaLine_1',
          {
            duration: 1.5,
            ease: 'power2.out',
            attr: { d: 'M 15 160 L -150 160' },
          },
          '-=1'
        )
        .to(
          '#CapaLine_2',
          {
            duration: 1.5,
            ease: 'power2.out',
            attr: { d: 'M 15 160 L 165 160' },

            onComplete: () => {
              console.log(this.TDisOpen);
              const retractTl = gsap.timeline({ delay: 0.5 });
              retractTl
                .to('#CapaLine_1, #CapaLine_2', {
                  duration: 0.3,
                  ease: 'power2.out',
                  attr: { d: 'M 15 120 L 25 120' },
                })

                .to(
                  '#Capa_1',
                  {
                    duration: 0.3,
                    ease: 'power2.out',
                    attr: { d: 'M 15 120 L 25 120' },
                  },
                  '-=0.3'
                )
                .to('.teardrop', {
                  duration: 0,
                  ease: 'power2.in',
                  opacity: 0,
                  delay: 0.5,
                });
            },
          },
          '-=1.5'
        );
    }
  }
}
