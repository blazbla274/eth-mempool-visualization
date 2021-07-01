import { useEffect, useState } from "react"

import { useWeb3Context } from "providers/Web3Provider"
import { BlockHeader } from "types/web3"

type UseBlockState = [BlockHeader | null, boolean]

const useBlock = (blockNumber?: number): UseBlockState => {
  const { web3 } = useWeb3Context()
  const [block, setBlock] = useState<BlockHeader | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchGasPrice = async () => {
      if (web3 && blockNumber) {
        setIsLoading(true)
        const block = await web3.eth.getBlock(blockNumber)
        setBlock(block)
        setIsLoading(false)
      }
    }

    fetchGasPrice()
  }, [web3, blockNumber])

  return [block, isLoading]
}

export { useBlock }
