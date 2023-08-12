import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { PointerLockControls } from 'PointerLockControls';
import { Stats } from 'three-stats';

class Core {
    constructor() {
        this.scene = new WorldScene();
        this.camera = new UserCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.keyboard = {};
        this.canJump = true;

        this.setupControls();
        this.setupScene();
        this.setupRenderer();
        this.setupListeners();
        this.setupPhysics();
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

    setupPhysics() {
        // Inisialisasi dunia fisika Cannon.js
        this.world = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.82, 0)
        });

        // Integrasi body untuk objek kotak
        const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        this.boxBody = new CANNON.Body({ mass: 1, shape: boxShape });
        this.boxBody.type = CANNON.Body.DYNAMIC;
        this.boxBody.position.set(1, 20, -15); // Set posisi sama dengan mesh Three.js
        this.world.addBody(this.boxBody); // Tambahkan body ke dalam dunia Cannon.js
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
        const delta = (time - this.prevTime) / 1000; // Bagi dengan 1000 untuk mendapatkan delta dalam detik
        this.world.step(1 / 60, delta, 3);

        const moveForward = this.keyboard['w'] || false;
        const moveBackward = this.keyboard['s'] || false;
        const moveLeft = this.keyboard['a'] || false;
        const moveRight = this.keyboard['d'] || false;
        const spaceKeyPressed = this.keyboard[' ']; // Tombol spasi ditekan

        // Handle movement directions
        if (moveForward) this.controls.moveForward(30 * delta);
        if (moveBackward) this.controls.moveForward(-30 * delta);
        if (moveLeft) this.camera.rotation.y += 0.02;
        if (moveRight) this.camera.rotation.y -= 0.02;

        // Lompat hanya jika bisa lompat
        if (spaceKeyPressed && this.canJump) {
            this.canJump = false;
        }


        // Update fisika Cannon.js dan rendering Three.js
        console.log(this.boxBody.position);
        
        this.scene.boxMesh.position.copy(this.boxBody.position); // Update posisi kotak dalam Three.js
        this.scene.boxMesh.quaternion.copy(this.boxBody.quaternion);

        // Perbarui posisi dan rotasi kamera berdasarkan PointerLockControls
        this.camera.position.copy(this.controls.getObject().position);
        this.camera.rotation.copy(this.controls.getObject().rotation);

        this.renderer.render(this.scene, this.camera);
        this.prevTime = time;

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
        const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
        this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        this.boxMesh.position.set(0, 0, 5); // Set posisi sama dengan mesh Three.js
        this.add(this.boxMesh);
    }

}

const core = new Core();
