import { useWeb3Context } from "providers/Web3Provider"
import { useEffect, useState } from "react"

const useGasPrice = (): string | null => {
  const { web3 } = useWeb3Context()
  const [gasPrice, setGasPrice] = useState<string | null>(null)

  useEffect(() => {
    const fetchGasPrice = async () => {
      if (web3) {
        const gasPriceInWei = await web3.eth.getGasPrice()
        setGasPrice(web3.utils.fromWei(gasPriceInWei, 'gwei'))
      }
    }

    fetchGasPrice()
  }, [web3])

  return gasPrice
}

export { useGasPrice }
