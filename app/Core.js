import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { PointerLockControlsCannon } from "./PointerLockControlsCannon.js";
import { UserCamera } from './UserCamera.js';
import { WorldScene } from './WorldScene.js';
import { WorldPhysics } from './WorldPhysics.js';

export class Core extends THREE.WebGLRenderer{
    constructor (listBox) {

        // Set renderer (This class)
        super({ antialias: true });

        // Initial perspective camera
        this.camera = new UserCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Initial scene world
        this.scene = new WorldScene();
        this.world = new WorldPhysics(20);

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
        this.setObjectBlender(listBox);
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

    setObjectBlender (listBox) {

        for (let i = 0; i < listBox.length; i++) {
            this.createBox(listBox[i]);
        }
        // Add linked boxes
        const size = 0.5
        const mass = 0.1
        const space = 0.01 * size
        const N = 5
        const halfExtents2 = new CANNON.Vec3(size, size, size * 0.1)
        const boxShape2 = new CANNON.Box(halfExtents2)
        const boxGeometry2 = new THREE.BoxGeometry(halfExtents2.x * 2, halfExtents2.y * 2, halfExtents2.z * 2)

        let last
        for (let i = 0; i < N; i++) {
            // Make the fist one static to support the others
            const boxBody = new CANNON.Body({ mass: i === 0 || i === N-1 ? 0 : mass })
            boxBody.addShape(boxShape2)
            const boxMesh = new THREE.Mesh(boxGeometry2, this.scene.materialA)
            boxBody.position.set((N - i) * (size * 2 + 2 * space) + size * 2 + space, 5, 0)
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

    // create
    createBox (paramObject) {
        // Set default parameter
        const defaultParam = {
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scaleX: 2,
            scaleY: 2,
            scaleZ: 2,
            mass: 5,
            material: this.scene.materialA,
            gravity: -9.81,
        }
        const fixParam = Object.assign(defaultParam, paramObject);
        
        // Add normal boxes
        const halfExtents = new CANNON.Vec3(0.5 * fixParam.scaleX, 0.5 * fixParam.scaleY, 0.5 * fixParam.scaleZ)
        const boxShape = new CANNON.Box(halfExtents)
        const boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2)
        const boxBody = new CANNON.Body({ mass: fixParam.mass })
        boxBody.addShape(boxShape);
        const boxMesh = new THREE.Mesh(boxGeometry, fixParam.material)

        // Set position
        boxBody.position.set(
            fixParam.positionX,
            fixParam.positionY,
            fixParam.positionZ
        );
        const customGravity = new CANNON.Vec3(0, -0.01, 0); // Ubah kecepatan jatuh sesuai dengan kebutuhan Anda
        boxBody.applyForce(customGravity, boxBody.position);
        boxMesh.position.copy(boxBody.position);

        const rotationQuaternion = new CANNON.Quaternion();
        rotationQuaternion.setFromAxisAngle(new CANNON.Vec3(
            fixParam.rotationX,
            fixParam.rotationY,
            fixParam.rotationZ
        ), Math.PI / 4);
        boxBody.quaternion.copy(rotationQuaternion);
        boxMesh.quaternion.copy(boxBody.quaternion);

        boxMesh.castShadow = true
        boxMesh.receiveShadow = true

        this.world.addBody(boxBody)
        this.scene.add(boxMesh)
        this.boxes.push(boxBody)
        this.boxMeshes.push(boxMesh)
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
            if (this.controls.cannonBody.position.y < 2) {
                this.controls.unlock();
                alert('game_over');
                window.location.href = "";
            }
        }
    
        this.controls.update(dt);
        this.render(this.scene, this.camera);
    }
}