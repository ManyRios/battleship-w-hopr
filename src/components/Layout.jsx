import {NavMenu, Footer } from './index'

import {Container} from 'react-bootstrap'

const Layout = ({children}) => {
  return (
    <Container>
        <NavMenu/>
        {children}
        <Footer/>
    </Container>
  )
}

export default Layout