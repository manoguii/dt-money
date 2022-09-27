import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

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
  fetchTransactions: (search?: string) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionsContextsType)

export function TransactionsProvider({ children }: ContextProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  async function fetchTransactions(search?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: search,
      },
    })
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  )
}
