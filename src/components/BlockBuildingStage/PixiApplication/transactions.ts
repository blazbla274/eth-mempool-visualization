import { pixiApp } from "./PixiApplication"
import { TransactionAnimation } from "./types"

export const transactions: TransactionAnimation[] = []

export const pushTransaction = (transaction: TransactionAnimation) => {
  transactions.push(transaction)
}

export const clearTransactions = () => {
  transactions.forEach(child => {
    pixiApp.stage.removeChild(child.graphic)
  })
  transactions.splice(0, transactions.length)
}