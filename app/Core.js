import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import * as CANNON from 'cannon-es';
import { PointerLockControlsCannon } from "./PointerLockControlsCannon.js";
import { UserCamera } from './UserCamera.js';
import { WorldScene } from './WorldScene.js';

export class Core extends THREE.WebGLRenderer{
    constructor () {

        super({ antialias: true });
        this.setSize(window.innerWidth, window.innerHeight)
        this.setClearColor(scene.fog.color)

        this.shadowMap.enabled = true
        this.shadowMap.type = THREE.PCFSoftShadowMap

        document.body.appendChild(this.domElement)
        // three.js variables
        this.camera = new UserCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene = new WorldScene();
        this.materialA = new THREE.MeshStandardMaterial({ color: 0x00ffff })

        // cannon.js variables
        this.world
        this.controls
        this.timeStep = 1 / 60
        this.lastCallTime = performance.now()
        this.sphereShape
        this.sphereBody
        this.physicsMaterial
        this.boxes = []
        this.boxMeshes = []
    }
}