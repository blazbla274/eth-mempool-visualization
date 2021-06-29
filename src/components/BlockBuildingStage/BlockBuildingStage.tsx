import { useEffect } from 'react'
import * as PIXI from 'pixi.js'

import { useRef } from 'react'
import { useCurrentBlock } from 'hooks/useCurrentBlock'
import { useWeb3Context } from 'providers/Web3Provider'
import { Subscription } from 'types/web3'
import { pendingTransactionsSubscriptionFactory } from './pendingTransactions.utils'

export interface TransactionAnimationObject {
  obj: any
  initX: number
  initY: number
  speed: {
    x: number
    y: number
  }
}

const transactions: TransactionAnimationObject[] = []


const BlockBuildingStage = () => {
  const { web3Socket } = useWeb3Context()
  const appRef = useRef<PIXI.Application | null>(null)
  const block = useCurrentBlock()

  useEffect(() => {
    if (appRef.current || !web3Socket) {
      return
    }

    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight / 2,
      transparent: true
    })
    appRef.current = app
    const anchor = document.getElementById('pixi-anchor')
    anchor?.appendChild(app.view)

    const pushTransaction = (x: TransactionAnimationObject) => {
      transactions.push(x)
    }

    const appCenterPoint = {
      x: app.screen.width / 2,
      y: app.screen.height / 2
    }

    const transactionBlockCircle  = new PIXI.Graphics()
    transactionBlockCircle.beginFill(0x2976f2)
    transactionBlockCircle.drawCircle(appCenterPoint.x, appCenterPoint.y, 20)
    transactionBlockCircle.endFill()
    transactionBlockCircle.zIndex = 22
    app.stage.addChild(transactionBlockCircle)

    const text = new PIXI.Text('0', {
      fontSize: 24,
      fill : 0xffffff,
      align : 'center'
    })
    text.x = appCenterPoint.x - text.width / 2
    text.y = appCenterPoint.y - text.height / 2

    app.stage.addChild(text)

    const gameLoop = (delta: number) => {
      transactions.forEach(({ obj, initX, initY, speed }) => {
        obj.x = obj.x + initX > appCenterPoint.x
          ? obj.x - speed.x * delta
          : obj.x + speed.x * delta

        obj.y = obj.y + initY > appCenterPoint.y
          ? obj.y - speed.y * delta
          : obj.y + speed.y * delta
      })

      const transactionBlockCircleScale = 1 + (transactions.length / 100)
      transactionBlockCircle.clear()
      transactionBlockCircle.beginFill(0x2976f2)
      transactionBlockCircle.drawCircle(appCenterPoint.x, appCenterPoint.y, 20 * transactionBlockCircleScale)
      transactionBlockCircle.endFill()

      text.text = transactions.length.toString()
      text.x = appCenterPoint.x - text.width / 2
      text.y = appCenterPoint.y - text.height / 2
    }

    const listener = (event: any) => {
      app.view.style.width = `${window.innerWidth}px`
      app.view.style.height = `${window.innerHeight / 2}px`
      app.resize()
    }

    let web3SocketSubscription: Subscription | null = null
    if (web3Socket) {
      web3SocketSubscription = web3Socket.eth.subscribe(
        'pendingTransactions',
        pendingTransactionsSubscriptionFactory(appRef, pushTransaction)
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
      transactions.forEach(child => {
        app.stage.removeChild(child.obj)
      })
      transactions.splice(0, transactions.length)
    }
  }, [block])

  return <div id="pixi-anchor"/>
}

export { BlockBuildingStage }
