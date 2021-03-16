<template>
  <div class="flex">
    <div id="container">
      <button class="button1" @click="captureImage">拍照</button>
      <button class="button2" @click="downloadImage">下载</button>
    </div>
    <div class="image">
      <p>图片</p>
      <img v-if="base64" :src="base64">
    </div>    
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import FileSaver from 'file-saver';
let el
let renderer = null
let scene = null
let camera = null
let rt = null
let composer1, fxaaPass;
export default {
  mounted() {
    el = document.getElementById('container')
    this.initThree()
  },
  data() {
    return {
      base64: ''
    }
  },
  methods: {
    initThree() {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 1, 1000)
      camera.position.set(0, 5, 20)
      scene.add(camera)
      renderer = new THREE.WebGLRenderer();
      renderer.physicallyCorrectLights = true;
      renderer.setClearColor(0xcccccc)
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setSize( el.clientWidth, el.clientHeight );

      el.appendChild(renderer.domElement);
      // 轨道控制器
      var controls = new OrbitControls( camera, renderer.domElement );

      const loader = new GLTFLoader();
      loader.load(
        '/F-16D.gltf',
        ( gltf ) => {
          this.gltf = gltf.scene
          scene.add( this.gltf );
        },
        // called while loading is progressing
        ( xhr ) => {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        }
      );

      // add lights
      const light2  = new THREE.DirectionalLight(0xffffff, Math.PI);
      light2.position.set(0.5, 0, 0.866); // ~60º
      light2.name = 'main_light';
      camera.add(light2)

      const light = new THREE.AmbientLight( 0xffffff, .5 ); // soft white light
      camera.add( light );
      this.addSkyBox();

      function animate() {    

        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
      }
      animate();
    },
    addSkyBox() {
      const loader = new THREE.CubeTextureLoader();
      loader.setPath( 'cubeSky/' );

      let textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
      textureCube.encoding = THREE.sRGBEncoding;
      scene.background = textureCube;
    },
    captureImage(type) {
      rt = new THREE.WebGLRenderTarget(el.clientWidth * 4, el.clientHeight * 4, {
        encoding: THREE.sRGBEncoding
      })
      
      const renderPass = new RenderPass( scene, camera );

      fxaaPass = new ShaderPass( FXAAShader );
      const pixelRatio = renderer.getPixelRatio();
      const pass = new SMAAPass( el.clientWidth * pixelRatio, el.clientHeight * pixelRatio );

      fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( el.offsetWidth * pixelRatio );
      fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( el.offsetHeight * pixelRatio );

      composer1 = new EffectComposer( renderer, rt );
      composer1.addPass( renderPass );
      composer1.addPass( fxaaPass );
      composer1.addPass( pass );
      
      composer1.renderToScreen = false
      composer1.render()

      const canvas2d = document.createElement('canvas')
      document.body.appendChild(canvas2d);
      const width = el.clientWidth * 4
      const height = el.clientHeight * 4
      const preview = canvas2d;
      preview.width = width
      preview.height = height
      const ctx = preview.getContext('2d');
      const buffer = new Uint8Array(width * height * 4);
      const clamped = new Uint8ClampedArray(buffer.buffer);
      const reversed = []

      composer1.renderer.readRenderTargetPixels(rt, 0, 0, width, height, buffer); // 读取像素到 buffer

      const imageData = new ImageData(clamped, width, height); // 创建可供 canvas 使用的图像数据类型
      ctx.putImageData(imageData, 0, 0);
      // 图片输出前上下镜像，three的坑
      for (let i = height - 1; i >= 0; i--) {
        reversed.push(...clamped.slice(width * 4 * i, width * 4 * (i + 1)))
      }
      const imageDataFliped = new ImageData(new Uint8ClampedArray(reversed), width, height)
      ctx.putImageData(imageDataFliped, 0, 0);
      this.base64 = preview.toDataURL();
      if (type === 'download') {
        canvas2d.toBlob((blob) => {
          FileSaver.saveAs(blob, 'pretty image.png')
        })
      }
      document.body.removeChild(canvas2d);
    },
    downloadImage() {
      this.captureImage('download')
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
  height: 500px;
}
p {
  text-align: center;
  padding: 0;
  margin: 0;
}
img {
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  border-top: 1px solid palegoldenrod;
}
.button1 {
  position: absolute;
  top: 0px;
}
.button2 {
  position: absolute;
  top: 30px;
}
</style>