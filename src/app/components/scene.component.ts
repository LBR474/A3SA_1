import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';

import {
  extend,
  injectNgtLoader,
  NgtArgs,
  NgtPush,
  NgtBeforeRenderEvent,
  NgtStore,
  createAttachFunction,
} from 'angular-three';

import { map } from 'rxjs';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



import * as THREE from 'three';
import { OBJLoader, OrbitControls } from 'three-stdlib';






extend(THREE);
extend({ OrbitControls });

@Component({
  standalone: true,
  template: `
    <ngt-primitive
      *args="[model$ | ngtPush]"
      [scale]="9.2"
      [position]="[0, 0, 0]"
      
      (beforeRender)="onBeforeRender($any($event))"
      (ready)="this.create_sound()"
    />
    
    <ngt-orbit-controls
      *args="[camera, glDom]"
      [enableDamping]="true"
      (beforeRender)="$any($event).object.update()"
    />
  `,
  imports: [NgtPush, NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Scene {
  private readonly store = inject(NgtStore);
  readonly camera = this.store.get('camera');

  readonly glDom = this.store.get('gl', 'domElement');

  readonly events = this.store.get('events');

  constructor() {
    this.create_sound();
    
  }
  // readonly model$ = injectNgtLoader(
  //   () => GLTFLoader,
  //   'assets/gem_object_1.glb'
  // ).pipe(map((model) => model.scene));

  readonly model$ = injectNgtLoader(
    () => OBJLoader,
    'assets/SRC/gem_object_1.obj'
  ).pipe(
    map((object) => {
      const mesh = object.children.find((child) => child instanceof THREE.Mesh);

      const pic_im_using = 'nz_10.png';
      const urls = [
        'SRC/' + pic_im_using,
        'SRC/' + pic_im_using,
        'SRC/' + pic_im_using,
        'SRC/' + pic_im_using,
        'SRC/' + pic_im_using,
        'SRC/' + pic_im_using,
      ];

      const envMap = new THREE.CubeTextureLoader()
        .setPath('assets/')
        .load(urls, (texture) => {
          texture.mapping = THREE.CubeReflectionMapping;
          texture.encoding = THREE.sRGBEncoding;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(10, 10);
        });

      const material = new THREE.MeshStandardMaterial({
        envMap: envMap,
        metalness: 1,
        roughness: 0,
        side: THREE.DoubleSide,
        envMapIntensity: 0.7,
      });

      if (mesh instanceof THREE.Mesh) {
        mesh.material = material;
      }

      return mesh;
    })
  );

  onBeforeRender(event: NgtBeforeRenderEvent<THREE.Mesh>) {
    event.object.rotation.y += 0.001;
  }

  create_sound = () => {
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('../assets/sounds/358232_j_s_song.ogg', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      setTimeout(() => {
        sound.play();
      }, 5000);
    });
  };
}
