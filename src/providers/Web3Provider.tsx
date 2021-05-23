import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react'
import Web3 from 'web3'

interface Web3ContextState {
  web3: Web3 | null
  web3Socket: Web3 | null
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
  const [web3SocketInstance, setWeb3SocketInstance] = useState<Web3 | null>(null)

  useEffect(() => {
    const infraNodeEndpoint = process.env.REACT_APP_INFURA_ENDPOINT
    const infraNodeWebSocket = process.env.REACT_APP_INFURA_WEBSOCKET

    if (infraNodeEndpoint && infraNodeWebSocket) {
      const web3 = new Web3(infraNodeEndpoint)
      const web3socket = new Web3(new Web3.providers.WebsocketProvider(infraNodeWebSocket, {
        reconnect: {
            auto: true,
            delay: 5000,
            maxAttempts: 5,
            onTimeout: false
        }
      }))

      setWeb3Instance(web3)
      setWeb3SocketInstance(web3socket)
    } else {
      throw new Error('ETH node endpoint must be seted.')
    }
  }, [])

  const contextValue = useMemo(() => ({
    web3: web3Instance,
    web3Socket: web3SocketInstance
  }), [web3Instance, web3SocketInstance])

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
