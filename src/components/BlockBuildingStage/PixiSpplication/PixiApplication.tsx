import * as PIXI from 'pixi.js'
import { transactions } from './transactions'
import { blocksLoop } from './transactionsBlocks'

export const pixiApp = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight / 2,
  transparent: true
})

export const appCenterPoint = {
  x: pixiApp.screen.width / 2,
  y: pixiApp.screen.height / 2
}

const gameLoop = (delta: number) => {
  transactions.forEach(({ graphic, initX, initY, speed }) => {
    graphic.x = graphic.x + initX > appCenterPoint.x
      ? graphic.x - speed.x * delta
      : graphic.x + speed.x * delta

    graphic.y = graphic.y + initY > appCenterPoint.y
      ? graphic.y - speed.y * delta
      : graphic.y + speed.y * delta
  })

  blocksLoop()
}

const listener = (event: any) => {
  pixiApp.view.style.width = `${window.innerWidth}px`
  pixiApp.view.style.height = `${window.innerHeight / 2}px`
  pixiApp.resize()
}
pixiApp.ticker.add(gameLoop)
window.addEventListener('resize', listener)