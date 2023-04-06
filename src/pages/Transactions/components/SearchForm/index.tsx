import * as z from 'zod'
import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../../../contexts/TransactionsContexts'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = z.object({
  search: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.fetchTransactions
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInput) {
    await fetchTransactions(data.search)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque uma transação"
        {...register('search')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        buscar
      </button>
    </SearchFormContainer>
  )
}
