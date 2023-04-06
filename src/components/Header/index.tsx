import { HeaderContainer, HeaderContent, NewTranslationButton } from './styles'
import logoDT from '../../assets/logoDT.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionsModal } from '../NewTransactionsModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoDT} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTranslationButton>Nova transação</NewTranslationButton>
          </Dialog.Trigger>

          <NewTransactionsModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
