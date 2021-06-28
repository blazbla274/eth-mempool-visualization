import { useEffect, useState } from "react"

import { useWeb3Context } from "providers/Web3Provider"
import { BlockHeader, Subscription } from "types/web3"

const UNKNOWN_BLOCK: BlockHeader = {
  difficulty: 0,
  extraData: 'unknown',
  gasLimit: 0,
  gasUsed: 0,
  hash: 'unknown',
  logsBloom: 'unknown',
  miner: 'unknown',
  mixHash: 'unknown',
  nonce: 'unknown',
  number: 0,
  parentHash: 'unknown',
  receiptsRoot: 'unknown',
  sha3Uncles: 'unknown',
  size: 0,
  stateRoot: 'unknown',
  timestamp: 'unknown',
  transactionsRoot: 'unknown',
  uncles: []
}

const useCurrentBlock = (): BlockHeader => {
  const { web3, web3Socket } = useWeb3Context()
  const [block, setBlock] = useState<BlockHeader>(UNKNOWN_BLOCK)

  useEffect(() => {
    let subscriptionInstance: Subscription | null = null
    const init = async () => {
      if (web3 && web3Socket) {
        const currentBlockNumber = await web3.eth.getBlockNumber()
        const block = await web3.eth.getBlock(currentBlockNumber)
        setBlock(block)

        subscriptionInstance = web3Socket.eth.subscribe('newBlockHeaders', function(error, result) {
          if (!error) {
            setBlock(result)
          }
        })
      }
    }
    init()

    return () => {
      if (subscriptionInstance) {
        subscriptionInstance.unsubscribe()
      }
    }
  }, [web3, web3Socket])

  return block
}

export { useCurrentBlock }
