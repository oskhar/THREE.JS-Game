import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';

export class UserCamera extends THREE.PerspectiveCamera {
    constructor (fov, asp, near, far) {
        super(fov, asp, near, far);
    }
}