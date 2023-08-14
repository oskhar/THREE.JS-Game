import * as THREE from 'three';

export class UserCamera extends THREE.PerspectiveCamera {
    constructor (fov, asp, near, far) {
        super(fov, asp, near, far);
    }
}