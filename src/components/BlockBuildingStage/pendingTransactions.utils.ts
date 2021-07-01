import * as PIXI from 'pixi.js'
import { STAGE_PADDING } from 'constants/pixiStage'
import { pixiApp, pushTransaction } from './PixiSpplication/PixiApplication'

export const pendingTransactionsSubscriptionFactory = () =>
  (error: Error, transactionHash: string) => {
    if (!error && pixiApp) {
      const gr  = new PIXI.Graphics()
      const x = Math.floor(Math.random() * (pixiApp.screen.width - 2 * STAGE_PADDING + 1)) + STAGE_PADDING
      const y = Math.floor(Math.random() * (pixiApp.screen.height - 2 * STAGE_PADDING + 1)) + STAGE_PADDING

      //@ts-ignore
      gr.beginFill(0x73b6ff)
      gr.drawCircle(x, y, STAGE_PADDING / 2)
      gr.endFill()
      gr.zIndex = 1
      pixiApp.stage.addChildAt(gr, 0)

      const speed = {
        x: Math.abs(window.innerWidth / 2 - x) / 100,
        y: Math.abs(window.innerHeight / 2 / 2 - y) / 100
      }

      pushTransaction({
        obj: gr,
        initX: x,
        initY: y,
        speed
      })
    }
  }
