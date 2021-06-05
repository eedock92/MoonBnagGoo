import React from 'react'
import { Route } from 'react-router-dom'
import Search from './Search.js'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { useDispatch ,useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="navbar navbar-expand-lg navbar-dark bg-primary" variant='dark' expand="lg" collapseOnSelect>
               <Container>

                <LinkContainer to='/'>
                     <Navbar.Brand>문방구</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                 <Route render={({ history }) => <Search history={history}/>} />
                        <Nav className="ml-auto">
                
              

                <LinkContainer to='/cart'>
                        <Nav.Link>
                            <i className = "fas fa-shopping-cart">  </i>
                            ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                          
                        </Nav.Link>
                </LinkContainer>

                {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>회원정보</NavDropdown.Item>
                        </LinkContainer>
                            <NavDropdown.Item onClick = {logoutHandler}>
                                로그아웃
                        </NavDropdown.Item>
                    </NavDropdown>
                ) : (
                    <LinkContainer to='/login'>
                    <Nav.Link>
                        <i className = "fas fa-user"></i>
                    </Nav.Link>
                    </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                          <LinkContainer to='/admin/userlist'>
                              <NavDropdown.Item>사용자</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/productlist'>
                              <NavDropdown.Item>상품</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/ordertlist'>
                              <NavDropdown.Item>주문</NavDropdown.Item>
                          </LinkContainer>    
                       </NavDropdown>
                )}
        
           
                        </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>               
        </header>
    )
}

export default Header
