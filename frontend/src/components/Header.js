import React from 'react'
import Search from './Search.js'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Header = () => {

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
 

    return (
        <header>
            <Navbar bg="navbar navbar-expand-lg navbar-dark bg-primary" variant='dark' expand="lg" collapseOnSelect>
               <Container>

                <LinkContainer to='/'>
                     <Navbar.Brand>문방구</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                
                <Search/>

                <LinkContainer to='/cart'>
                        <Nav.Link>
                            <i className = "fas fa-shopping-cart">
                            ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            </i>
                        
                      
                        </Nav.Link>
                </LinkContainer>


                <LinkContainer to='/login'>
                       <Nav.Link><i className = "fas fa-user"></i></Nav.Link>
                </LinkContainer>
           
                        </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>               
        </header>
    )
}

export default Header
