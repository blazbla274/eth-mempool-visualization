import { useEffect } from 'react'

import { useWeb3Context } from "providers/Web3Provider"

const usePendingTransactions = () => {
  const { web3Socket } = useWeb3Context()

  useEffect(() => {
    if (web3Socket) {
      var subscription = web3Socket.eth.subscribe('pendingTransactions', function(error, result) {
        // console.log(error, result);
      })
    }
  }, [])

  return null
}

export { usePendingTransactions }
