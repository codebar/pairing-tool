import React from 'react'
import styled from '@emotion/styled'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import smallLogo from './logo200.png'

const NavBar = styled.div`
  padding: 5px 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: #1b1e21;
  color: white;
  border-bottom: 1px solid grey;
  box-shadow: 2px 2px 2px 2px lightgrey;
`
const LeftNav = styled.div`
  img {
    width: 50px;
    height: 50px;
  }
`
const MiddleNav = styled.div`
  span {
    font-size: 24px;
    font-weight: bold;
    font-family: Roboto, serif;
  }
`
const RightNav = styled.div`
  svg {
    font-size: 40px;
    color: white;
    padding-right: 10px;
  }
`

const UserManualLink = (props) =>
  <a
    href='https://github.com/codebar/pairing-tool/blob/main/doc/UserManual.md'
    target='_blank'
    rel='noreferrer'
  >
    {props.children}
  </a>

const FeedbackLink = (props) =>
  <a
    href='https://github.com/codebar/pairing-tool/issues/new/choose'
    target='_blank'
    rel='noreferrer'
  >
    {props.children}
  </a>

export const NavigationBar = () =>
  <NavBar>
    <LeftNav>
      <img alt='Codebar' src={smallLogo} />
    </LeftNav>
    <MiddleNav>
      <span>Pairing Tool</span>
    </MiddleNav>
    <RightNav>
      <UserManualLink>
        <MenuBookIcon/>
      </UserManualLink>
      <FeedbackLink>
        <ContactSupportIcon/>
      </FeedbackLink>
    </RightNav>
  </NavBar>
