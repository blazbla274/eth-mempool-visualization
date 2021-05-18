import React from 'react'
import { useWeb3Context } from 'providers/Web3Provider'

const GasPrices = () => {
  const { web3Instance } = useWeb3Context()
  console.log('useWeb3Context', web3Instance)

  return null
}

export { GasPrices }
