import * as THREE from 'three';
import { Core } from "../Core.js";

const materialBlue = new THREE.MeshStandardMaterial({ color: 0x00ffff });
const materialRed = new THREE.MeshStandardMaterial({ color: 0xE42E22 });
const materialGreen = new THREE.MeshStandardMaterial({ color: 0x67F15B });
const materialYellow = new THREE.MeshStandardMaterial({ color: 0xE4BA22 });
const materialDarkBlue = new THREE.MeshStandardMaterial({ color: 0x1868A1 });
const materialSkyBlue = new THREE.MeshStandardMaterial({ color: 0x92C8EF });

const listBox = [
    {
        role: 'finish',
        positionX: 0,
        positionY: 20,
        positionZ: -80,
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
        positionZ: -12,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 10,
        mass: 0,
        material: materialBlue,
    },
    {
        positionX: 2,
        positionY: 20,
        positionZ: -12,
        scaleX: 2,
        scaleY: 2,
        scaleZ: 2,
        mass: 100,
        material: materialGreen,
    },
    {
        positionX: -2,
        positionY: 40,
        positionZ: -16,
        scaleX: 2,
        scaleY: 6,
        scaleZ: 2,
        mass: 100,
        material: materialRed,
    },
    {
        positionX: 0,
        positionY: 24,
        positionZ: -35,
        scaleX: 5,
        scaleY: 1,
        scaleZ: 5,
        damping: 0.999999,
        mass: 100,
        material: materialBlue,
    },
    {
        positionX: 0,
        positionY: 10,
        positionZ: -60,
        scaleX: 10,
        scaleY: 10,
        scaleZ: 30,
        mass: 0,
        material: materialBlue,
    },
    {
        positionX: 2,
        positionY: 40,
        positionZ: -73,
        scaleX: 2,
        scaleY: 2,
        scaleZ: 2,
        mass: 100,
        damping: 0.9,
        material: materialGreen,
    },
    {
        positionX: -2,
        positionY: 60,
        positionZ: -70,
        scaleX: 2,
        scaleY: 6,
        scaleZ: 2,
        mass: 100,
        damping: 0.9,
        material: materialRed,
    },
    {
        positionX: 0,
        positionY: 40,
        positionZ: -60,
        scaleX: 10,
        scaleY: 8,
        scaleZ: 10,
        damping: 0.99999,
        mass: 10000,
        material: materialRed,
    },
];
const listSphere = [
];
const nextLevel = "Level_4.html";

const play = new Core(listBox, listSphere, nextLevel);