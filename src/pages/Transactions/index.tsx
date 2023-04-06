import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../contexts/TransactionsContexts'
import { dateFormatted, priceFormatted } from '../../utils/Formatter'
import { SearchForm } from './components/SearchForm'
import { useContextSelector } from 'use-context-selector'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatted.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatted.format(new Date(transaction.created_at))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
