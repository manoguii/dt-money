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
  fetchTransactions: (search?: string) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionsContextsType)

export function TransactionsProvider({ children }: ContextProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  async function fetchTransactions(search?: string) {
    const url = new URL('http://localhost:3000/transactions')
    if (search) {
      url.searchParams.append('q', search)
    }

    const response = await fetch(url)
    const data = await response.json()

    setTransactions(data)
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
