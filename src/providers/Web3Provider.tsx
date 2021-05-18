import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react'
import Web3 from 'web3'

interface Web3ContextState {
  web3Instance: any
}

const Web3Context = createContext<Web3ContextState | null>(null)

const useWeb3Context = (): Web3ContextState => {
  const contextValue = useContext(Web3Context)

  if (contextValue === null) {
    throw new Error('useWeb3Context must be used within a Web3Provider')
  }
  return contextValue
}

const Web3Provider: React.FC = ({ children }) => {
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null)

  useEffect(() => {
    const infraNodeEndpoint = process.env.REACT_APP_INFURA_ENDPOINT

    if (infraNodeEndpoint) {
      const web3 = new Web3(infraNodeEndpoint)
      setWeb3Instance(web3)
    } else {
      throw new Error('ETH node endpoint must be seted.')
    }
  }, [])

  const contextValue = useMemo(() => ({
    web3Instance
  }), [web3Instance])

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  )
}

export {
  Web3Provider,
  Web3Context,
  useWeb3Context
}
