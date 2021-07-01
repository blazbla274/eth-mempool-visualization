import * as PIXI from 'pixi.js'
import { appCenterPoint, pixiApp } from './PixiApplication'
import { transactions } from './transactions'

import { BlockAnimation } from './types'

const MAX_BLOCK_TRANSLATE = 170
const MIN_BLOCK_TRANSLATE = 110
let lastBlockYTranslationFactor = 1

export const transactionsBlocks: BlockAnimation[] = []

export const updateBlocksTargetPositions = () => {
  const blockTranslationDistance = Math.floor(
    Math.random() * (MAX_BLOCK_TRANSLATE - MIN_BLOCK_TRANSLATE + 1) + MIN_BLOCK_TRANSLATE
  )

  transactionsBlocks.forEach((transaction) => {
    transaction.targetPositionX = transaction.targetPositionX - blockTranslationDistance
  }, [])

  if (transactionsBlocks.length) {
    const lastBlock = transactionsBlocks[transactionsBlocks.length - 1]
    lastBlock.targetPositionY = lastBlock.targetPositionY + lastBlockYTranslationFactor * blockTranslationDistance
    lastBlockYTranslationFactor = lastBlockYTranslationFactor * -1
  }
}

export const saveLastBlockTransactionsCount = () => {
  if (transactionsBlocks.length) {
    transactionsBlocks[transactionsBlocks.length - 1].transactions =   transactions.length
  }
}

export const spawnNewBlock = () => {
  updateBlocksTargetPositions()
  const transactionBlock  = new PIXI.Graphics()
  transactionBlock.beginFill(0x2976f2)
  transactionBlock.drawCircle(appCenterPoint.x, appCenterPoint.y, 20)
  transactionBlock.endFill()

  const text = new PIXI.Text('0', {
    fontSize: 24,
    fill : 0xffffff,
    align : 'center'
  })
  text.x = appCenterPoint.x - text.width / 2
  text.y = appCenterPoint.y - text.height / 2

  pixiApp.stage.addChild(transactionBlock)
  pixiApp.stage.addChild(text)

  transactionsBlocks.push({
    graphic: transactionBlock,
    targetPositionX: appCenterPoint.x,
    targetPositionY: appCenterPoint.y,
    text,
    x: appCenterPoint.x,
    y: appCenterPoint.y,
    speed: {
      x: 1,
      y: 1
    },
    transactions: 0
  })
}

export const blocksLoop = () => {
  transactionsBlocks.forEach((block) => {
    const { graphic, text, targetPositionX, targetPositionY, x, y } = block
    const transactionsCount = block.transactions || transactions.length

    const transactionBlockCircleScale = 1 + (transactionsCount / 250)
    if (x > targetPositionX) {
      block.x = block.x - block.speed.x
    }

    if (y > targetPositionY) {
      block.y = block.y - block.speed.y
    } else {
      block.y = block.y + block.speed.y
    }

    graphic.clear()
    graphic.beginFill(0x2976f2)
    graphic.drawCircle(x, y, 20 * transactionBlockCircleScale)
    graphic.endFill()

    text.text = transactionsCount.toString()
    text.x = x - text.width / 2
    text.y = y - text.height / 2
  })
}
