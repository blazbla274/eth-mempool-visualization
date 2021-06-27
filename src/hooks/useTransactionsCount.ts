import { useWeb3Context } from "providers/Web3Provider"
import { useEffect, useState } from "react"

type UseBlockNumberState = number | null

const useTransactionsCount = (blocksCount: number): UseBlockNumberState => {
  const { web3 } = useWeb3Context()
  const [count, setCount] = useState<UseBlockNumberState>(null)

  useEffect(() => {
    const fetchGasPrice = async () => {
      if (web3) {
        const currentBlocakNumber = await web3.eth.getBlockNumber()

        const block = await web3.eth.getBlock(currentBlocakNumber)
        console.log(block)
        //web3.eth.subscribe('newBlockHeaders' [, callback]);
        //      var subscription = web3Socket.eth.subscribe('pendingTransactions', function(error, result) {
        // console.log(error, result);
        //})
        // setBlockNumber(fetchedBlockNumber)
      }
    }

    fetchGasPrice()
  }, [web3])

  return count
}

export { useTransactionsCount }
