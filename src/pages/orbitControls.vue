<template>
  <div class="flex">
    <div id="container"></div> 
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let camera, controls, scene, renderer, el;
export default {
  mounted() {
    el = document.getElementById('container')
    this.init()
  },
  data() {
    return {
      base64: ''
    }
  },
  methods: {
    init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xcccccc );
      scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      el.appendChild( renderer.domElement );

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.set( 400, 200, 0 );
      
      controls = new OrbitControls( camera, renderer.domElement ); 
      
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.05;

      controls.screenSpacePanning = false;

      controls.minDistance = 100;
      controls.maxDistance = 500;

      controls.maxPolarAngle = Math.PI / 2;

      const geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

      for (let i = 0; i < 500; i ++) {
        const mesh = new THREE.Mesh( geometry, material)
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        // mesh.matrixAutoUpdate = false;
        scene.add(mesh);
      }

      const dirLight1 = new THREE.DirectionalLight(0xffffff);
      dirLight1.position.set(1, 1, 1);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x002288);
      dirLight2.position.set( - 1, - 1, - 1 );
      scene.add( dirLight2 );

      const ambientLight = new THREE.AmbientLight( 0x222222 );
      scene.add( ambientLight );

      window.addEventListener( 'resize', this.onWindowResize );
      const axesHelper = new THREE.AxesHelper( 5000 );
      scene.add( axesHelper );
      this.animate();
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      requestAnimationFrame(this.animate);
      controls.update();
      renderer.render(scene, camera);
    }
  },
} 
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
  background: #F5F5F5;
  height: 100%;
  overflow: scroll;
}
#container {
  width: 100%;
  height: 100%;
}
</style>