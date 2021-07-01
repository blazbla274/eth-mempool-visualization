import { useEffect } from 'react'

import { useCurrentBlock } from 'hooks/useCurrentBlock'
import { useWeb3Context } from 'providers/Web3Provider'
import { Subscription } from 'types/web3'
import { pendingTransactionsSubscriptionFactory } from './pendingTransactions.utils'
import { pixiApp, transactions } from './PixiSpplication/PixiApplication'

const BlockBuildingStage = () => {
  const { web3Socket } = useWeb3Context()
  const block = useCurrentBlock()

  useEffect(() => {
    let web3SocketSubscription: Subscription | null = null
    if (web3Socket) {
      const anchor = document.getElementById('pixi-anchor')
      anchor?.appendChild(pixiApp.view)

      web3SocketSubscription = web3Socket.eth.subscribe(
        'pendingTransactions',
        pendingTransactionsSubscriptionFactory()
      )
    }

    return () => {
      if (web3SocketSubscription) {
        web3SocketSubscription.unsubscribe()
      }
    }
  }, [web3Socket])

  useEffect(() => {
    if(pixiApp) {
      transactions.forEach(child => {
        pixiApp.stage.removeChild(child.obj)
      })
      transactions.splice(0, transactions.length)
    }
  }, [block])

  return <div id="pixi-anchor"/>
}

export { BlockBuildingStage }
