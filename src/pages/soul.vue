<template>
  <div class="flex">
    <div style="position: absolute; display: flex; justify-content: center; top: 20px; font-size: 18px;"><span style="color: rgb(37 212 208); text-align: center;margin: 0 auto;width: 100vw">跟随灵魂找到你</span></div>
    <div id="container"></div> 
    <div style="display: flex; justify-content: center; font-size: 12px;"><span style="margin: 0 auto;color: white;">当前<span style="color: rgb(37 212 208)">12987530</span>在线</span></div>
    <div style="display: flex; flex-wrap: nowrap; overflow: scroll;margin-top: 20px">
      <div v-for="item in imgs" :key="item" style="width: 80px; margin: 10px; box-sizing: border-box;">
        <div 
          :style="{'width': '80px', 'height': '80px', 'background-image': `url(${item})`, 'background-repeat': 'no-repeat', 'background-size': 'cover'}"></div>
        <div style="color: white;text-align: center;margin-top: 10px;">{{table[Math.floor(Math.random() * table.length)]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import SpriteHelper from '../utils/spriteHelper'
import girl from '../assets/girl.png'
import girl1 from '../assets/girl1.png'
import girl2 from '../assets/girl2.png'
import girl3 from '../assets/girl3.png'
import girl4 from '../assets/girl4.png'
import girl5 from '../assets/girl5.png'
import girl6 from '../assets/girl6.png'
let camera, controls, scene, renderer, el;
let girls = []
let light
let ambientLight
let container
export default {
  mounted() {
    el = document.getElementById('container')
    container = document.getElementById('container')
    console.log(container.clientWidth, container.clientHeight)
    this.init()
  },
  data() {
    return {
      base64: '',
      imgs: [girl, girl1, girl2, girl3, girl4, girl5, girl6],
      table: ["安妮","海瑟薇","霉霉","布兰妮","凯瑟琳","戴安娜",
      "赵露思","安妮","海瑟薇","霉霉","布兰妮","凯瑟琳","戴安娜",
      "赵露思", "安妮","海瑟薇","霉霉","布兰妮","凯瑟琳","戴安娜",
      "赵露思", "安妮","海瑟薇","霉霉","布兰妮","凯瑟琳","戴安娜", "赵露思"]
    }
  },
  methods: {
    init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x000000 );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( container.clientWidth, container.clientHeight );
      el.appendChild( renderer.domElement );

      camera = new THREE.PerspectiveCamera( 60, container.clientWidth / container.clientHeight, 1, 10000 );
      camera.position.set( 0, 0, 100 );
      light = new THREE.PointLight(0xffffff, 1, 400)
      ambientLight = new THREE.AmbientLight(0xffffff, .5)
      light.position.set(0, 0, 200)

      scene.add(light, ambientLight)
      
      controls = new OrbitControls( camera, renderer.domElement ); 
      
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.enableZoom = true;
      controls.dampingFactor = 0.05;

      controls.minDistance = 250;
      controls.maxDistance = 300;
      controls.autoRotate = true
      controls.enablePan = false

      const table = ["安妮","海瑟薇","霉霉","布兰妮","凯瑟琳","戴安娜",
      "赵露思","安妮","海瑟薇","霉霉","布兰妮","凯瑟琳","戴安娜",
      "赵露思", "安妮","海瑟薇","霉霉","布兰妮","凯瑟琳","戴安娜",
      "赵露思", "安妮","海瑟薇","霉霉","布兰妮","凯瑟琳","戴安娜", "赵露思"];
      const spriteHelper = new SpriteHelper()
      for ( let i = 0; i < table.length; i ++ ) {
        let text = table[i]
        const phi = Math.acos( - 1 + ( 2 * i ) / table.length );
        const theta = Math.sqrt( table.length * Math.PI ) * phi;
        const object = spriteHelper.createBoard({text}, {});
        object.position.setFromSphericalCoords( 80, phi, theta );
        girls.push(object)
        scene.add(object)
      }
      // const geometry = new THREE.PlaneGeometry( 100000, 100000, 32 );
      // const material = new THREE.MeshBasicMaterial( {color: 0x999999, transparent: true, opacity: .5, depthTest: false} );
      // scene.add(new THREE.Mesh(geometry, material))
      this.animate()
      document.addEventListener('resize', this.onWindowResize)
    },
    onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    },
    animate() {
      light.position.copy(camera.position)
      requestAnimationFrame(this.animate);
      girls.forEach(item => item.lookAt(camera.position))
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
  background: #000000;
  height: 100%;
  overflow: scroll;
}
#container {
  width: 100%;
  height: 70vh;
}
</style>