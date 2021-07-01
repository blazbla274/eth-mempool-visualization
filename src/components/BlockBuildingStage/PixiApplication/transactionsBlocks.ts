import * as PIXI from 'pixi.js'
import { pixiApp } from './PixiApplication'
import { transactions } from './transactions'

import { BlockAnimation } from './types'

const MAX_X_BLOCK_TRANSLATE = 170
const MIN_X_BLOCK_TRANSLATE = 110

const MAX_Y_BLOCK_TRANSLATE = 180
const MIN_Y_BLOCK_TRANSLATE = 40

let lastBlockYTranslationFactor = 1

export const transactionsBlocks: BlockAnimation[] = []

export const updateBlocksTargetPositions = () => {
  const blockTranslationXDistance = Math.floor(
    Math.random() * (MAX_X_BLOCK_TRANSLATE - MIN_X_BLOCK_TRANSLATE + 1) + MIN_X_BLOCK_TRANSLATE
  )
  const blockTranslationYDistance = Math.floor(
    Math.random() * (MAX_Y_BLOCK_TRANSLATE - MIN_Y_BLOCK_TRANSLATE + 1) + MIN_Y_BLOCK_TRANSLATE
  )

  transactionsBlocks.forEach((transaction) => {
    transaction.targetPositionX = transaction.targetPositionX - blockTranslationXDistance
  }, [])

  if (transactionsBlocks.length) {
    const lastBlock = transactionsBlocks[transactionsBlocks.length - 1]

    lastBlock.targetPositionY = lastBlock.targetPositionY + lastBlockYTranslationFactor * blockTranslationYDistance
    lastBlockYTranslationFactor = lastBlockYTranslationFactor * -1
  }
}

export const saveLastBlockData = (number: number) => {
  if (transactionsBlocks.length) {
    const lastBlock = transactionsBlocks[transactionsBlocks.length - 1]
    lastBlock.transactions =   transactions.length
    lastBlock.number = number
  }
}

interface SpawnNewBlockProps {
  number: number
  onClick?: (blockNumber: number) => void
}

export const spawnNewBlock = ({ onClick, number }: SpawnNewBlockProps) => {
  updateBlocksTargetPositions()
  const appCenterPoint = {
    x: pixiApp.screen.width / 2,
    y: pixiApp.screen.height / 2
  }
  const transactionBlock  = new PIXI.Graphics()
  transactionBlock.beginFill(0x2976f2)
  transactionBlock.drawCircle(appCenterPoint.x, appCenterPoint.y, 20)
  transactionBlock.endFill()

  transactionBlock.interactive = true
  transactionBlock.cursor = 'pointer'

  transactionBlock.on('mouseover', () => {
    transactionBlock.alpha = 0.8
  })
  transactionBlock.on('mouseout', () => {
    transactionBlock.alpha = 1
  })
  transactionBlock.on('click', () => onClick && onClick(number))

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
      x: 0.6,
      y: 0.6
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
    graphic.lineStyle(2, 0xFFFFFF, 1)
    graphic.beginFill(0x2976f2)
    graphic.drawCircle(x, y, 20 * transactionBlockCircleScale)
    graphic.hitArea = new PIXI.Circle(x, y, 20 * transactionBlockCircleScale)
    graphic.endFill()

    text.text = transactionsCount.toString()
    text.x = x - text.width / 2
    text.y = y - text.height / 2
  })
}
