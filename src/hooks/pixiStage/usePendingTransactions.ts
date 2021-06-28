import { MutableRefObject, useEffect } from 'react'
import * as PIXI from 'pixi.js'

import { useWeb3Context } from "providers/Web3Provider"
import { Subscription } from 'types/web3'
import { STAGE_PADDING } from 'constants/pixiStage'

const usePendingTransactions = (appRef: MutableRefObject<PIXI.Application | null>) => {
  const { web3Socket } = useWeb3Context()

  useEffect(() => {
    let subscription: Subscription | null = null

    if (web3Socket) {
      subscription = web3Socket.eth.subscribe('pendingTransactions', function(error, result) {
        if (!error && appRef?.current) {
          const app = appRef.current
          const gr  = new PIXI.Graphics()
          const x = Math.floor(Math.random() * (app.screen.width - 2 * STAGE_PADDING + 1)) + STAGE_PADDING
          const y = Math.floor(Math.random() * (app.screen.height - 2 * STAGE_PADDING + 1)) + STAGE_PADDING

          gr.beginFill(0xffffff)
          gr.drawCircle(x, y, STAGE_PADDING / 2)
          gr.endFill()
          app.stage.addChild(gr)
        }
      })
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [web3Socket])

  return null
}

export { usePendingTransactions }
