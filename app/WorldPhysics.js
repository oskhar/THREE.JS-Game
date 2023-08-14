import * as CANNON from 'cannon-es';

export class WorldPhysics extends CANNON.World {
    constructor (paramY) {
        super();
        // Tweak contact properties.
        // Contact stiffness - use to make softer/harder contacts
        this.defaultContactMaterial.contactEquationStiffness = 1e9;
    
        // Stabilization time in number of timesteps
        this.defaultContactMaterial.contactEquationRelaxation = 4;
    
        const solver = new CANNON.GSSolver();
        solver.iterations = 7;
        solver.tolerance = 0.1;
        this.solver = new CANNON.SplitSolver(solver);
        // use this to test non-split solver
        // this.solver = solver
    
        this.gravity.set(0, -20, 0);

        this.physicsMaterial = new CANNON.Material('physics');
        this.sphereBody = new CANNON.Body({ mass: 5, material: this.physicsMaterial });
        
        // Runing setter method
        this.setSlipperyMaterial();
        this.setUserCollision(paramY);
        this.setGroundPlane();
    }

    setSlipperyMaterial () {
        // friction coefficient = 0.0
        const physics_physics = new CANNON.ContactMaterial(this.physicsMaterial, this.physicsMaterial, {
            friction: 0.0,
            restitution: 0.3,
        });

        // We must add the contact materials to the world
        this.addContactMaterial(physics_physics);
    }

    setUserCollision (paramY) {
        const radius = 1.3;
        const sphereShape = new CANNON.Sphere(radius);
        this.sphereBody.addShape(sphereShape);
        this.sphereBody.position.set(0, paramY, 0);
        this.sphereBody.linearDamping = 0.9;
        this.addBody(this.sphereBody);
    }

    setGroundPlane () {
        const groundShape = new CANNON.Plane();
        const groundBody = new CANNON.Body({ mass: 0, material: this.physicsMaterial });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.addBody(groundBody);
    }



}