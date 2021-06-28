import { useEffect } from 'react'
import * as PIXI from 'pixi.js'

import { usePendingTransactions } from 'hooks/pixiStage/usePendingTransactions'
import { useRef } from 'react'
import { useCurrentBlock } from 'hooks/useCurrentBlock'
import { useWeb3Context } from 'providers/Web3Provider'
import { Subscription } from 'types/web3'
// import { pendingTransactionsSubscriptionFactory } from './pendingTransactions.utils'
import { STAGE_PADDING } from 'constants/pixiStage'
import { pendingTransactionsSubscriptionFactory } from './pendingTransactions.utils'

const BlockBuildingStage = () => {
  const { web3Socket } = useWeb3Context()
  const appRef = useRef<PIXI.Application | null>(null)
  const block = useCurrentBlock()
  // const s = usePendingTransactions(appRef)
  // console.log('appRef', appRef.current)

  useEffect(() => {
    const transactions: { obj: any, initX: number, initY: number }[] = []

    const pushTr = (x: any) => {
      transactions.push(x)
    }

    const gameLoop = () => {
      transactions.forEach(({ obj, initX }) => {
        obj.x = obj.x + initX > window.innerWidth / 2
          ? obj.x - 0.5
          : obj.x + 0.5
      })
    }
    if (appRef.current || !web3Socket) {
      return
    }

    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight / 2,
      // transparent: true
    })
    appRef.current = app
    const anchor = document.getElementById('pixi-anchor')
    anchor?.appendChild(app.view)

    const listener = (event: any) => {
      app.view.style.width = `${window.innerWidth}px`
      app.view.style.height = `${window.innerHeight / 2}px`
      app.resize()
    }

    let web3SocketSubscription: Subscription | null = null
    if (web3Socket) {
      web3SocketSubscription = web3Socket.eth.subscribe(
        'pendingTransactions',
        pendingTransactionsSubscriptionFactory(appRef, pushTr)
      )
    }
    app.ticker.add(gameLoop)

    // for(let x = 0; x < 100; x++) {
    //   const gr  = new PIXI.Graphics()
    //   const x = Math.floor(Math.random() * (app.screen.width - 2 * STAGE_PADDING + 1)) + STAGE_PADDING
    //   const y = Math.floor(Math.random() * (app.screen.height - 2 * STAGE_PADDING + 1)) + STAGE_PADDING

    //   gr.beginFill(0xffffff)
    //   gr.drawCircle(x, y, STAGE_PADDING / 2)
    //   gr.endFill()

    //   app.stage.addChild(gr)
    //   blobs.push({ obj: gr, initX: x, initY: y })
    // }

    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener)
      if (web3SocketSubscription) {
        web3SocketSubscription.unsubscribe()
      }
    }
  }, [web3Socket])

  useEffect(() => {
    const app = appRef.current
    if(app) {
      app.stage.removeChildren()
    }
  }, [block])

  return <div id="pixi-anchor"/>
}

export { BlockBuildingStage }
