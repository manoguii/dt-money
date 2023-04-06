import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface TransactionsType {
  category: string
  created_at: string
  description: string
  id: number
  price: number
  type: 'income' | 'outcome'
}

interface CreateTransactionType {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface ContextProps {
  children: ReactNode
}

interface TransactionsContextsType {
  transactions: TransactionsType[]
  fetchTransactions: (search?: string) => Promise<void>
  createTransactions: (data: CreateTransactionType) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionsContextsType)

export function TransactionsProvider({ children }: ContextProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  const fetchTransactions = useCallback(async (search?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'created_at',
        _order: 'desc',
        q: search,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransactions = useCallback(
    async (data: CreateTransactionType) => {
      const response = await api.post('/transactions', {
        description: data.description,
        price: data.price,
        category: data.category,
        type: data.type,
        created_at: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
