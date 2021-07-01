import * as PIXI from 'pixi.js'
import { STAGE_PADDING } from 'constants/pixiStage'
import { pixiApp } from './PixiSpplication/PixiApplication'
import { pushTransaction } from './PixiSpplication/transactions'

export const pendingTransactionsSubscriptionFactory = () =>
  (error: Error, transactionHash: string) => {
    if (!error && pixiApp) {
      const x = Math.floor(Math.random() * (pixiApp.screen.width - 2 * STAGE_PADDING + 1)) + STAGE_PADDING
      const y = Math.floor(Math.random() * (pixiApp.screen.height - 2 * STAGE_PADDING + 1)) + STAGE_PADDING

      const transaction  = new PIXI.Graphics()
      //@ts-ignore
      transaction.beginFill(0x73b6ff)
      transaction.drawCircle(x, y, STAGE_PADDING / 2)
      transaction.endFill()
      transaction.zIndex = 1
      pixiApp.stage.addChildAt(transaction, 0)

      const speed = {
        x: Math.abs(window.innerWidth / 2 - x) / 100,
        y: Math.abs(window.innerHeight / 2 / 2 - y) / 100
      }

      pushTransaction({
        graphic: transaction,
        initX: x,
        initY: y,
        speed
      })
    }
  }
