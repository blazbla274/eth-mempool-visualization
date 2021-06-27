import { useEffect, useState } from "react"

import { useWeb3Context } from "providers/Web3Provider"

const useGasPrice = (): number => {
  const { web3 } = useWeb3Context()
  const [gasPrice, setGasPrice] = useState<number | null>(null)

  useEffect(() => {
    const fetchGasPrice = async () => {
      if (web3) {
        const gasPriceInWei = await web3.eth.getGasPrice()
        setGasPrice(parseInt(gasPriceInWei, 10))
      }
    }

    fetchGasPrice()
  }, [web3])

  return gasPrice ?? 0
}

export { useGasPrice }
