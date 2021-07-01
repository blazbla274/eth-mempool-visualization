import * as PIXI from 'pixi.js'
import { lineBinderLoop, setupBinderLine } from './blocksBinderLine'
import { transactionsLoop } from './transactions'
import { blocksLoop } from './transactionsBlocks'

export const pixiApp = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight / 2,
  transparent: true
})

setupBinderLine()

const gameLoop = (delta: number) => {
  transactionsLoop(delta)
  blocksLoop()
  lineBinderLoop()
}

const listener = (event: any) => {
  pixiApp.view.style.width = `${window.innerWidth}px`
  pixiApp.view.style.height = `${window.innerHeight / 2}px`
  pixiApp.resize()
}

pixiApp.ticker.add(gameLoop)
window.addEventListener('resize', listener)