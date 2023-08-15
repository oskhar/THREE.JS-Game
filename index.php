<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="layout/main.css">
    <title>Game</title>
</head>

<body>
    <!-- https://unpkg.com/three@0.122.0/build/three.module.js -->
    <!-- ./node_modules/three/build/three.module.js -->
    <script type="importmap">{ "imports": {
            "three": "https://unpkg.com/three@0.122.0/build/three.module.js",
            "PointerLockControls": "./node_modules/three/examples/jsm/controls/PointerLockControls.js",
            "cannon-es": "./node_modules/cannon-es/dist/cannon-es.js",
            "three-stats": "./node_modules/three/examples/jsm/libs/stats.module.js"
    }}</script>
    <div id="instructions">
        <span>Klik untuk bermain</span>
        <br />
        (W,A,S,D = Bergerak, SPACE = Lompat, MOUSE = Mengalihkan pandangan)
    </div>
    <!-- <script type="module" src="app/PointerLockControlsCannon.js"></script> -->
    <script type="module" src="app/Core.js"></script>
</body>

</html>