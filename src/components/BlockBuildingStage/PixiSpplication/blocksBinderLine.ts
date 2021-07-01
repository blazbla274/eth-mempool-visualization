import * as PIXI from 'pixi.js'
import { pixiApp } from './PixiApplication'
import { transactionsBlocks } from './transactionsBlocks'

const blockBinderLine = new PIXI.Graphics()
const LINE_WIDTH = 8
const LINECOLOR = 0x4a4a5d

export const setupBinderLine = () => {
  blockBinderLine.lineStyle(LINE_WIDTH, LINECOLOR)
  blockBinderLine.position.x = 0
  blockBinderLine.position.y = 0

  pixiApp.stage.addChild(blockBinderLine)
}

export const lineBinderLoop = () => {
  blockBinderLine.clear()
  blockBinderLine.lineStyle(LINE_WIDTH, LINECOLOR)
  transactionsBlocks.forEach((block, index) => {
    if (index) {
      const prevBlock = transactionsBlocks[index - 1]
      blockBinderLine.moveTo(prevBlock.x, prevBlock.y)
      blockBinderLine.lineTo(block.x, block.y)
    }
  })
  blockBinderLine.endFill()
}
