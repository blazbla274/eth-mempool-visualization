import * as PIXI from 'pixi.js'
import { STAGE_PADDING } from 'constants/pixiStage'
import { TransactionAnimationObject } from './BlockBuildingStage'

export const pendingTransactionsSubscriptionFactory = (
  app: React.MutableRefObject<PIXI.Application | null>,
  pushTransaction: (x: TransactionAnimationObject) => void
) =>
  (error: Error, transactionHash: string) => {
    if (!error && app.current) {
      const gr  = new PIXI.Graphics()
      const x = Math.floor(Math.random() * (app.current.screen.width - 2 * STAGE_PADDING + 1)) + STAGE_PADDING
      const y = Math.floor(Math.random() * (app.current.screen.height - 2 * STAGE_PADDING + 1)) + STAGE_PADDING

      //@ts-ignore
      gr.beginFill(0x73b6ff)
      gr.drawCircle(x, y, STAGE_PADDING / 2)
      gr.endFill()
      gr.zIndex = 1
      app.current.stage.addChildAt(gr, 0)

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
