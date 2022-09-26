import { HeaderContainer, HeaderContent, NewTranslationButton } from './styles'
import logoDT from '../../assets/logoDT.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoDT} alt="" />
        <NewTranslationButton>Nova transação</NewTranslationButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
