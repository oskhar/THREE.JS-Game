import * as THREE from 'three';

// (main) Class
class Core extends THREE.WebGLRenderer {

    // Fungsi yang otomatis dijalankan
    constructor () {

        // Atribute
        super();
        this.dunia = new World();
        this.mata = new User(45, innerWidth / innerHeight, 1, 500);
        this.keyboard = [];
        this.lantai = this.mata.position.y;

        // Membuat latar
        this.latar = document.createElement("div");
        this.latar.id = "latar";
        this.latar.position = "absolute";
        this.latar.top = "0";
        this.latar.width = innerWidth + "px";
        this.latar.height = innerHeight + "px";

        // Merender
        this.setSize(innerWidth, innerHeight);
        this.latar.appendChild(this.domElement);
        document.body.appendChild(this.latar);
        this.draw();

    }

    // Method
    draw () {

        // this.action();
        this.render(this.dunia, this.mata);
        requestAnimationFrame(this.draw.bind(this));

    }

}

// Class
class World extends THREE.Scene {

    // Fungsi yang otomatis dijalankan
    constructor () {

        super();
        this.skybox = new THREE.CubeTextureLoader();
        this.skybox = this.skybox.load([
            "./assets/images/skybox/px.png",
            "./assets/images/skybox/nx.png",
            "./assets/images/skybox/py.png",
            "./assets/images/skybox/ny.png",
            "./assets/images/skybox/pz.png",
            "./assets/images/skybox/nz.png",
        ]);
        this.background = this.skybox;
        
    }

}

// Class
class User extends THREE.PerspectiveCamera {

    // Fungsi yang otomatis dijalankan
    constructor (fov, asp, near, far) {

        super(fov, asp, near, far);
        this.position.y = 3;

    }   

}

let run = new Core();
window.onkeydown = function (event) {
    run.keyboard[event.key] = true;
}
window.onkeyup = function (event) {
    run.keyboard[event.key] = false;
}