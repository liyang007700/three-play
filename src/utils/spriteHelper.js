/* eslint-disable */
import TextHelper from './textHelper';
import {
  FrontSide,
  DoubleSide,
  InstancedMesh,
  TextureLoader,
  Mesh,
  MeshPhysicalMaterial,
  PlaneBufferGeometry,
  Sprite,
  Group
} from 'three';
import girl from '../assets/girl.png'
import girl1 from '../assets/girl1.png'
import girl2 from '../assets/girl2.png'
import girl3 from '../assets/girl3.png'
import girl4 from '../assets/girl4.png'
import girl5 from '../assets/girl5.png'
import girl6 from '../assets/girl6.png'
const girl0Texture = new TextureLoader().load(girl);
const girl1Texture = new TextureLoader().load(girl1);
const girl2Texture = new TextureLoader().load(girl2);
const girl3Texture = new TextureLoader().load(girl3);
const girl4Texture = new TextureLoader().load(girl4);
const girl5Texture = new TextureLoader().load(girl5);
const girl6Texture = new TextureLoader().load(girl6);
const iconConfig = {
  scale: {
    x: 5,
    y: 5,
    z: 5
  },
  pos: {
    x: 0,
    y: -6,
    z: 0
  },
  animate: true
}
const textConfig = {
  text: '',
  transY: 0,
  scale: {
    x: 25,
    y: 25,
    z: 25
  },
  pos: {
    x: 0,
    y: -2.5,
    z: 0
  },
}
const icon0Material = new MeshPhysicalMaterial({
  map: girl0Texture,
  depthTest: false,
  transparent: true
})
const icon1Material = new MeshPhysicalMaterial({
  map: girl1Texture,
  depthTest: false,
  transparent: true
})
const icon2Material = new MeshPhysicalMaterial({
  map: girl2Texture,
  depthTest: false,
  transparent: true
})
const icon3Material = new MeshPhysicalMaterial({
  map: girl3Texture,
  depthTest: false,
  transparent: true
})
const icon4Material = new MeshPhysicalMaterial({
  map: girl4Texture,
  depthTest: false,
  transparent: true
})
const icon5Material = new MeshPhysicalMaterial({
  map: girl5Texture,
  depthTest: false,
  transparent: true
})
const icon6Material = new MeshPhysicalMaterial({
  map: girl6Texture,
  depthTest: false,
  transparent: true
})
const materialArr = [icon0Material, icon1Material, icon2Material, icon3Material, 
  icon4Material, icon5Material, icon6Material]
export default class SpriteHelper {
  createBoard(textObj, iconObj) {
    const boardGroup = new Group();
    const iconMesh = this._createIconMesh({...iconConfig, ...iconObj});
    iconMesh.name = 'image'
    const textMesh = this._createTextMesh({...textConfig, ...textObj});
    console.log(textMesh, 'testMesh')
    textMesh.name = textObj.text
    textObj && textObj.text && boardGroup.add(textMesh)
    iconObj && boardGroup.add(iconMesh);
    return boardGroup
  }
  _createIconMesh(config, order) {
    const mesh = this._createMesh(new PlaneBufferGeometry(1, 1), materialArr[Math.floor(Math.random() * 7)], 10, config)
    return mesh;
  }
  _createTextMesh(textObj, order) {
    const textHelper = new TextHelper()
    const texture = textHelper.createTextTexture(textObj.text || '', {
      fontsize: 18,
      fontweight: 'normal'
    });
    const textMaterial = new MeshPhysicalMaterial({
      side: FrontSide,
      transparent: true,
      map: texture,
      depthTest: false
    });
    const ratio = (0.008) * (2 / window.devicePixelRatio);
    const textPlane = new PlaneBufferGeometry(
      texture.scaleX * ratio,
      texture.scaleY * ratio
    );
    const textMesh = new Mesh(textPlane, textMaterial);
    textMesh.position.y = textObj.transY;
    textMesh.scale.set(textObj.scale.x || 1, textObj.scale.y || 1, 1)
    textMesh.renderOrder = 5;
    textMesh.name = textObj.text;
    return textMesh;
  }
  _createMesh(geo, mat, renderOrder, config) {
    const { scale, rot, pos } = config;
    const mesh = new Mesh(geo, mat);
    scale && mesh.scale.set(scale.x, scale.y, scale.z);
    pos && mesh.position.set(pos.x, pos.y, pos.z);
    rot && mesh.rotation.set(rot.x ,rot.y, rot.z);
    mesh.renderOrder = renderOrder;
    return mesh;
  }
}