import * as PIXI from 'pixi.js'
import { STAGE_PADDING } from 'constants/pixiStage'

export const pendingTransactionsSubscriptionFactory = (app: any, pushTr: any) =>
  (error: Error, transactionHash: string) => {
    if (!error) {
      const gr  = new PIXI.Graphics()
      const x = Math.floor(Math.random() * (app.current.screen.width - 2 * STAGE_PADDING + 1)) + STAGE_PADDING
      const y = Math.floor(Math.random() * (app.current.screen.height - 2 * STAGE_PADDING + 1)) + STAGE_PADDING

      //@ts-ignore
      gr.beginFill(0xffffff)
      gr.drawCircle(x, y, STAGE_PADDING / 2)
      gr.endFill()

      app.current.stage.addChild(gr)
      pushTr({ obj: gr, initX: x, initY: y })
    }
  }
