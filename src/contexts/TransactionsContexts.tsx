import { createContext, ReactNode, useEffect, useState } from 'react'

interface TransactionsType {
  category: string
  created_at: string
  description: string
  id: number
  price: number
  type: 'income' | 'outcome'
}

interface ContextProps {
  children: ReactNode
}

interface TransactionsContextsType {
  transactions: TransactionsType[]
}

export const TransactionContext = createContext({} as TransactionsContextsType)

export function TransactionsProvider({ children }: ContextProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  )
}
