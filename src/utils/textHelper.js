/* eslint-disable */
import { Sprite, SpriteMaterial, Texture } from "three"

export default class TextHelper {
  createTextSprite(text, options, materialOptions) {
    const canvas = document.createElement('canvas')
    this.setCanvas(canvas, text, options);
    const texture = new Texture();
    this.setTextTexture(texture, canvas);
    const material = new SpriteMaterial({
      transparent: false,
      map: texture,
      ...materialOptions
    });
    const sprite = new Sprite(material)
    this.setTextSpriteScale(sprite, options);
    sprite.renderOrder = 10;
    sprite.name = 'text'
    return sprite;
  }
  setCanvas(canvas, text, style) {
    const fontface = 'PingFangSC'
    const fontweight = 'normal'
    const fontsize = 18
    const textMargin = 0
    const borderThickness = 0;
    const borderColor = {r: 255, g: 255, b: 255, a: 1}
    const backgroundColor = {r: 255, g: 255, b: 255, a: 1}
    const textColor = {r: 255, g: 255, b: 255, a: 1}
    const cornerWidth = 0;
    const ctx = canvas.getContext('2d')
    ctx.font = `normal lighter ${fontsize}px ${fontface}`;
    const width = ctx.measureText(text).width;
    const height = fontsize;
    canvas.height = height
    canvas.width = width
    ctx.fillStyle = this.rgbaColorToString(backgroundColor);
    ctx.strokeStyle = this.rgbaColorToString(borderColor);
    ctx.font = `${fontweight} ${fontsize}px ${fontface}`
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.lineWidth = borderThickness;
    ctx.fillStyle = this.rgbaColorToString(textColor);
    ctx.strokeStyle = this.rgbaColorToString(textColor);
    ctx.fillText(text, width / 2, height / 2)
  }
  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  setTextTexture(texture, canvas) {
    texture.image = canvas
    texture.needsUpdate = true
    texture.scaleX = canvas.width
    texture.scaleY = canvas.height
  }
  setTextSpriteScale(sprite, options) {
    const texture = sprite.material.map;
    const spriteScale = options.spriteScale / window.devicePixelRatio;
    sprite.scale.set(texture.scaleX * spriteScale, texture.scaleY * spriteScale, 1);
    sprite.defaultScale = sprite.scale.clone();
  }
  rgbaColorToString(e) {
    return `rgba(${e.r},${e.g},${e.b},${e.a})`;
  }
  createTextTexture(text, option) {
    const canvas = document.createElement('canvas');
    this.updateAccordingDPR(option);
    this.setCanvas(canvas, text, option);
    const texture = new Texture();
    this.setTextTexture(texture, canvas);
    return texture;
  }
  updateAccordingDPR(option) {
    if (window.devicePixelRatio) {
      for (let op in option) {
        if (typeof option[op] === 'number') {
          option[op] *= window.devicePixelRatio;
        }
      }
    }
  }
}