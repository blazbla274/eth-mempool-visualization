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

export const transactionsLoop = (delta: number) => {
  transactions.forEach(({ graphic, initX, initY, speed }) => {
    graphic.x = graphic.x + initX > pixiApp.screen.width / 2
      ? graphic.x - speed.x * delta
      : graphic.x + speed.x * delta

    graphic.y = graphic.y + initY > pixiApp.screen.height / 2
      ? graphic.y - speed.y * delta
      : graphic.y + speed.y * delta
  })
}
