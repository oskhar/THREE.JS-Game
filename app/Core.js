import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import * as CANNON from 'cannon-es';
import { PointerLockControlsCannon } from "./PointerLockControlsCannon.js";
import { UserCamera } from './UserCamera.js';
import { WorldScene } from './WorldScene.js';
import { WorldPhysics } from './WorldPhysics.js';

export class Core extends THREE.WebGLRenderer{
    constructor () {

        // Set renderer (This class)
        super({ antialias: true });

        // Initial perspective camera
        this.camera = new UserCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Initial scene world
        this.scene = new WorldScene();
        this.world = new WorldPhysics();

        this.setSize(window.innerWidth, window.innerHeight);
        this.setClearColor(this.scene.fog.color);
        this.shadowMap.enabled = true;
        this.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.domElement);

        this.timeStep = 1 / 60;
        this.lastCallTime = performance.now();
        this.boxes = [];
        this.boxMeshes = [];
        this.instructions = document.getElementById('instructions');

        // Runing setter method
        this.setControls();
        this.setListener();
        this.setObjectBlender();
        this.animate();
    }

    setControls () {
        this.controls = new PointerLockControlsCannon(this.camera, this.world.sphereBody);
        this.scene.add(this.controls.getObject());
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.setSize(window.innerWidth, window.innerHeight);
    }

    onClick () {
        this.controls.lock();
    }

    onLock () {
        this.controls.enabled = true;
        this.instructions.style.display = 'none';
    }

    onUnlock () {
        this.controls.enabled = false;
        this.instructions.style.display = null;
    }

    setListener () {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.instructions.addEventListener('click', this.onClick.bind(this));
        this.controls.addEventListener('lock', this.onLock.bind(this));
        this.controls.addEventListener('unlock', this.onUnlock.bind(this));
    }

    setObjectBlender () {
        // Add normal boxes
        const halfExtents = new CANNON.Vec3(1, 1, 1)
        const boxShape = new CANNON.Box(halfExtents)
        const boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2)

        for (let i = 0; i < 7; i++) {
            const boxBody = new CANNON.Body({ mass: 5 })
            boxBody.addShape(boxShape)
            const boxMesh = new THREE.Mesh(boxGeometry, this.scene.materialA)

            const x = (Math.random() - 0.5) * 20
            const y = (Math.random() - 0.5) * 1 + 1
            const z = (Math.random() - 0.5) * 20

            boxBody.position.set(x, y, z)
            boxMesh.position.copy(boxBody.position)

            boxMesh.castShadow = true
            boxMesh.receiveShadow = true

            this.world.addBody(boxBody)
            this.scene.add(boxMesh)
            this.boxes.push(boxBody)
            this.boxMeshes.push(boxMesh)
        }

        // Add linked boxes
        const size = 0.5
        const mass = 0.3
        const space = 0.1 * size
        const N = 5
        const halfExtents2 = new CANNON.Vec3(size, size, size * 0.1)
        const boxShape2 = new CANNON.Box(halfExtents2)
        const boxGeometry2 = new THREE.BoxGeometry(halfExtents2.x * 2, halfExtents2.y * 2, halfExtents2.z * 2)

        let last
        for (let i = 0; i < N; i++) {
            // Make the fist one static to support the others
            const boxBody = new CANNON.Body({ mass: i === 0 ? 0 : mass })
            boxBody.addShape(boxShape2)
            const boxMesh = new THREE.Mesh(boxGeometry2, this.scene.materialA)
            boxBody.position.set(5, (N - i) * (size * 2 + 2 * space) + size * 2 + space, 0)
            boxBody.linearDamping = 0.01
            boxBody.angularDamping = 0.01

            boxMesh.castShadow = true
            boxMesh.receiveShadow = true

            this.world.addBody(boxBody)
            this.scene.add(boxMesh)
            this.boxes.push(boxBody)
            this.boxMeshes.push(boxMesh)

            if (i > 0) {
            // Connect the body to the last one
            const constraint1 = new CANNON.PointToPointConstraint(
                boxBody,
                new CANNON.Vec3(-size, size + space, 0),
                last,
                new CANNON.Vec3(-size, -size - space, 0)
            )
            const constranit2 = new CANNON.PointToPointConstraint(
                boxBody,
                new CANNON.Vec3(size, size + space, 0),
                last,
                new CANNON.Vec3(size, -size - space, 0)
            )
            this.world.addConstraint(constraint1)
            this.world.addConstraint(constranit2)
            }

            last = boxBody
        }
    }

    animate () {
        requestAnimationFrame(this.animate.bind(this));
    
        const time = performance.now() / 1000;
        const dt = time - this.lastCallTime;
        this.lastCallTime = time;
    
        if (this.controls.enabled) {
            this.world.step(this.timeStep, dt);
    
            // Update box positions
            for (let i = 0; i < this.boxes.length; i++) {
                this.boxMeshes[i].position.copy(this.boxes[i].position);
                this.boxMeshes[i].quaternion.copy(this.boxes[i].quaternion);
            }
        }
    
        this.controls.update(dt);
        this.render(this.scene, this.camera);
    }
}

const run = new Core();