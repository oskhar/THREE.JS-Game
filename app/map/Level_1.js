import { Core } from "../Core";

const listBox = [
    {
        positionX: 0,
        positionY: 10,
        positionZ: 0,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 10,
        mass: 0,
        material: this.scene.materialDarkBlue,
    },
    {
        positionX: 0,
        positionY: 10,
        positionZ: -20,
        rotationZ: Math.PI / 4,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 10,
        mass: 0,
        material: this.scene.materialBlue,
    },
    {
        positionX: -20,
        positionY: 10,
        positionZ: -30,
        rotationZ: Math.PI / 4,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 10,
        mass: 0,
        material: this.scene.materialBlue,
    },
    {
        positionX: -5,
        positionY: 30,
        positionZ: -25,
        scaleX: 10,
        scaleY: 2,
        scaleZ: 10,
        mass: 3,
        material: this.scene.materialGreen,
        gravity: 10,
    },
    {
        positionX: 0,
        positionY: 13,
        positionZ: 1,
        scaleX: 2,
        scaleY: 2,
        scaleZ: 2,
        mass: 0.2,
    },
]

const play = new Core(listBox);