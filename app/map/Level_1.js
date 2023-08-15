import * as THREE from 'three';
import { Core } from "../Core.js";

const materialBlue = new THREE.MeshStandardMaterial({ color: 0x7777ff });
const materialRed = new THREE.MeshStandardMaterial({ color: 0xE42E22 });
const materialGreen = new THREE.MeshStandardMaterial({ color: 0x67F15B });
const materialYellow = new THREE.MeshStandardMaterial({ color: 0xE4BA22 });
const materialDarkBlue = new THREE.MeshStandardMaterial({ color: 0x1868A1 });
const materialSkyBlue = new THREE.MeshStandardMaterial({ color: 0x92C8EF });

const listBox = [
    {
        positionX: 0,
        positionY: 10,
        positionZ: 0,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 10,
        mass: 0,
        material: materialDarkBlue,
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
        material: materialBlue,
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
        material: materialBlue,
    },
    {
        positionX: -5,
        positionY: 30,
        positionZ: -25,
        scaleX: 10,
        scaleY: 2,
        scaleZ: 10,
        mass: 3,
        material: materialGreen,
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