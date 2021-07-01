import { useEffect } from 'react'

import { useCurrentBlock } from 'hooks/useCurrentBlock'
import { useWeb3Context } from 'providers/Web3Provider'
import { Subscription } from 'types/web3'
import { pendingTransactionsSubscriptionFactory } from './pendingTransactions.utils'
import { pixiApp } from './PixiSpplication/PixiApplication'
import { clearTransactions } from './PixiSpplication/transactions'
import { saveLastBlockTransactionsCount, spawnNewBlock } from './PixiSpplication/transactionsBlocks'

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
    if(pixiApp && block.number) {
      saveLastBlockTransactionsCount()
      clearTransactions()
      spawnNewBlock()
    }
  }, [block])

  return <div id="pixi-anchor"/>
}

export { BlockBuildingStage }
