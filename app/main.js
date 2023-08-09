import * as THREE from 'three';
import { PointerLockControls } from 'PointerLockControls';
import * as CANNON from 'cannon-es';

class Core {
    constructor() {
        this.scene = new WorldScene();
        this.camera = new UserCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        this.renderer = new THREE.WebGLRenderer();
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0); // Set gravity
        this.keyboard = {};

        this.setupControls();
        this.setupScene();
        this.setupRenderer();
        this.setupCamera();
        this.setupListeners();
        this.animate();
    }

    setupControls() {
        this.controls = new PointerLockControls(this.camera, document.body);
    }

    setupScene() {
        this.skyboxTexture = new THREE.CubeTextureLoader().load([
            './assets/images/skybox/px.png',
            './assets/images/skybox/nx.png',
            './assets/images/skybox/py.png',
            './assets/images/skybox/ny.png',
            './assets/images/skybox/pz.png',
            './assets/images/skybox/nz.png',
        ]);
        this.scene.background = this.skyboxTexture;
    }

    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    setupListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(event) {
        this.keyboard[event.key] = true;
    }

    onKeyUp(event) {
        this.keyboard[event.key] = false;
    }

    onWindowResize() {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(newWidth, newHeight);
    }

    animate() {

        const time = performance.now();
        const delta = (time - this.prevTime) / 1000;

        const velocity = new THREE.Vector3();
        const direction = new THREE.Vector3();

        const moveForward = this.keyboard['w'] || false;
        const moveBackward = this.keyboard['s'] || false;
        const moveLeft = this.keyboard['a'] || false;
        const moveRight = this.keyboard['d'] || false;

        // Handle movement directions
        if (moveForward) {
            velocity.z -= 1;
            direction.z = Number(moveForward) - Number(moveBackward);
            direction.normalize();
            this.controls.moveForward(direction.z * delta);
        };
        if (moveBackward) {
            velocity.z += 1;
            direction.z = Number(moveForward) - Number(moveBackward);
            direction.normalize();
            this.controls.moveForward(direction.z * delta);
        };

        // Rotate camera based on 'A' and 'D' keys
        if (moveLeft) this.camera.rotation.y += 0.02;
        if (moveRight) this.camera.rotation.y -= 0.02;
        console.log(this.camera.position.x +" - "+ this.camera.position.z);

        // ... calculate other movements ...

        // this.controls.getObject().position.copy(this.controls.getObject().position);

        // Update other animations or logic here

        this.prevTime = time;

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }
}

class UserCamera extends THREE.PerspectiveCamera {
    constructor(fov, aspect, near, far) {
        super(fov, aspect, near, far);
        this.position.y = 3;
    }
}

class WorldScene extends THREE.Scene {
    constructor()
    {
        super();

        this.setupSkybox(); // Add Skybox
        this.setupFloor(); // Add Floor
        this.setupBlenderObject(); // Add blender Object
    }

    setupSkybox ()
    {
        this.skyboxTexture = new THREE.CubeTextureLoader().load([
            './assets/images/skybox/px.png',
            './assets/images/skybox/nx.png',
            './assets/images/skybox/py.png',
            './assets/images/skybox/ny.png',
            './assets/images/skybox/pz.png',
            './assets/images/skybox/nz.png',
        ]);
        this.background = this.skyboxTexture;
    }

    setupFloor ()
    {
        const floorGeometry = new THREE.PlaneGeometry(100, 100);
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
        const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.rotation.x = -Math.PI / 2; // Rotate to make it a floor
        this.add(floorMesh);
    }

    setupBlenderObject ()
    {
        const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
        const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        this.add(this.boxMesh);
    }

}

const core = new Core();
