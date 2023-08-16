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
        role: 'finish',
        positionX: -10,
        positionY: 20,
        positionZ: -70,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 10,
        mass: 0,
        material: materialSkyBlue,
    },
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
        positionZ: -15,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 15,
        mass: 0,
        material: materialBlue,
    },
    {
        positionX: 0,
        positionY: 16,
        positionZ: -12,
        scaleX: 2,
        scaleY: 2,
        scaleZ: 2,
        mass: 0,
        material: materialGreen,
    },
    {
        positionX: 0,
        positionY: 17,
        positionZ: -15,
        scaleX: 2,
        scaleY: 4.5,
        scaleZ: 2,
        mass: 0,
        material: materialYellow,
    },
    {
        positionX: 0,
        positionY: 16,
        positionZ: -20,
        scaleX: 2,
        scaleY: 2,
        scaleZ: 2,
        mass: 0,
        material: materialGreen,
    },
    {
        positionX: 0,
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
        positionX: -20,
        positionY: 10,
        positionZ: -40,
        rotationZ: Math.PI / 4,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 10,
        mass: 0,
        material: materialBlue,
    },
    {
        positionX: -10,
        positionY: 10,
        positionZ: -60,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 15,
        mass: 0,
        material: materialBlue,
    },
    {
        positionX: -10,
        positionY: 16,
        positionZ: -57,
        scaleX: 2,
        scaleY: 2,
        scaleZ: 2,
        mass: 0,
        material: materialGreen,
    },
    {
        positionX: -10,
        positionY: 18,
        positionZ: -62,
        scaleX: 2,
        scaleY: 6,
        scaleZ: 2,
        mass: 0,
        material: materialRed,
    },
];
const listSphere = [
];
const nextLevel = "Level_2.html";

const play = new Core(listBox, listSphere, nextLevel);