import * as PIXI from 'pixi.js'
interface AnimationObject {
  graphic: PIXI.Graphics
  speed: {
    x: number
    y: number
  }
}
export interface TransactionAnimation extends AnimationObject{
  graphic: PIXI.Graphics
  initX: number
  initY: number
}

export interface BlockAnimation extends AnimationObject{
  number?: number,
  targetPositionX: number
  targetPositionY: number
  x: number
  y: number
  text: PIXI.Text,
  transactions: number | null
}
