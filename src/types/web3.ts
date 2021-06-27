export interface BlockHeader {
  difficulty?: number
  extraData: string
  gasLimit: number
  gasUsed: number
  hash: string
  logsBloom: string
  miner: string
  mixHash?: string
  nonce: string
  number: number
  parentHash: string
  receiptsRoot?: string
  sha3Uncles: string
  size?: number
  stateRoot: string
  timestamp: string | number
  transactionsRoot?: string
  uncles?: Array<any>
}

export interface Transaction {
  blockHash: string | null
  blockNumber: number | null
  from: string
  gas: number
  gasPrice: string
  hash: string
  input: string
  nonce: number
  r?: string
  s?: string
  to: string | null
  transactionIndex: number | null
  type?: string | null
  v?: string
  value: string
}

export type Subscription = {
  unsubscribe: () => void
}