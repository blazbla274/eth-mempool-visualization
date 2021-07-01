import { useEffect, useState } from 'react'

import { useCurrentBlock } from 'hooks/useCurrentBlock'
import { useWeb3Context } from 'providers/Web3Provider'
import { Subscription } from 'types/web3'
import { BlockDialog, BlockDialogState } from 'components/BlockDialog/BlockDialog'
import { pendingTransactionsSubscriptionFactory } from './pendingTransactions.utils'
import { pixiApp } from './PixiApplication/PixiApplication'
import { clearTransactions } from './PixiApplication/transactions'
import { saveLastBlockData, spawnNewBlock } from './PixiApplication/transactionsBlocks'

const BlockBuildingStage = () => {
  const { web3Socket } = useWeb3Context()
  const block = useCurrentBlock()
  const [dialogState, setDialogState] = useState<BlockDialogState>(() => ({ isOpen: false }))

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
      saveLastBlockData(block.number)
      clearTransactions()
      spawnNewBlock({
        number: block.number,
        onClick: (number) => {
          setDialogState({
            isOpen: true,
            blockNumber: number
          })
        },
      })
    }
  }, [block])

  return (
    <>
      <div id="pixi-anchor"/>
      <BlockDialog
        state={dialogState}
        onClose={() => setDialogState({ isOpen: false })}
      />
    </>
  )
}

export { BlockBuildingStage }
