import * as PIXI from 'pixi.js'
import { TransactionAnimationObject } from './types'

export const transactions: TransactionAnimationObject[] = []

export const pixiApp = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight / 2,
  transparent: true
})

export const pushTransaction = (x: TransactionAnimationObject) => {
  transactions.push(x)
}

const appCenterPoint = {
  x: pixiApp.screen.width / 2,
  y: pixiApp.screen.height / 2
}

const transactionBlockCircle  = new PIXI.Graphics()
transactionBlockCircle.beginFill(0x2976f2)
transactionBlockCircle.drawCircle(appCenterPoint.x, appCenterPoint.y, 20)
transactionBlockCircle.endFill()
transactionBlockCircle.zIndex = 22
pixiApp.stage.addChild(transactionBlockCircle)

const text = new PIXI.Text('0', {
  fontSize: 24,
  fill : 0xffffff,
  align : 'center'
})
text.x = appCenterPoint.x - text.width / 2
text.y = appCenterPoint.y - text.height / 2

pixiApp.stage.addChild(text)

const gameLoop = (delta: number) => {
  transactions.forEach(({ obj, initX, initY, speed }) => {
    obj.x = obj.x + initX > appCenterPoint.x
      ? obj.x - speed.x * delta
      : obj.x + speed.x * delta

    obj.y = obj.y + initY > appCenterPoint.y
      ? obj.y - speed.y * delta
      : obj.y + speed.y * delta
  })

  const transactionBlockCircleScale = 1 + (transactions.length / 100)
  transactionBlockCircle.clear()
  transactionBlockCircle.beginFill(0x2976f2)
  transactionBlockCircle.drawCircle(appCenterPoint.x, appCenterPoint.y, 20 * transactionBlockCircleScale)
  transactionBlockCircle.endFill()

  text.text = transactions.length.toString()
  text.x = appCenterPoint.x - text.width / 2
  text.y = appCenterPoint.y - text.height / 2
}

const listener = (event: any) => {
  pixiApp.view.style.width = `${window.innerWidth}px`
  pixiApp.view.style.height = `${window.innerHeight / 2}px`
  pixiApp.resize()
}
pixiApp.ticker.add(gameLoop)
window.addEventListener('resize', listener)