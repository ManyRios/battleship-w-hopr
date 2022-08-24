import {useState} from 'react'
import {Navbar, Nav, Container, Form, Button } from 'react-bootstrap'
import { AiFillSetting } from 'react-icons/ai'
import { GrConnect } from 'react-icons/gr'
import { useStateContext } from '../context/StateContext'

import {ModalDialog, ModalConnect} from './'

const NavMenu = () => {
 
  const {handleModalConnect, handleModal, address, sendMessage, enemyAddress} = useStateContext()
  return (
    <Navbar bg="light" variant="light">
      <ModalConnect/>
      <ModalDialog/>
        <Container>
          <Navbar.Brand href="/" className="font-weight-bold">Battleship</Navbar.Brand>
          <Nav className="mx-auto space-between">
            
           <span className="p-2 mr-2">{`My Address: ${address ? address : 'not Connected'}`} </span>
            <Nav.Link href=""><GrConnect onClick={handleModalConnect}/></Nav.Link>
            <Nav.Link href=""><AiFillSetting onClick={handleModal}/></Nav.Link>
            
          </Nav>
        </Container>
    </Navbar>
  )
}

export default NavMenu