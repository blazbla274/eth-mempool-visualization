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

export type Subscription = {
  unsubscribe: () => void
}