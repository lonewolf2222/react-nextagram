import React from 'react';
import {Link} from 'react-router-dom'
import {Nav, Navbar, NavLink, NavbarBrand, Form, Input, Button} from 'reactstrap'
import LoginModal from './LoginModal'
import logo from '../logo.png'

const NavBar = () => {

    return(
        <div>
            <Navbar color="dark">
                <NavbarBrand>
                    <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                    <Link to="/">Nextagram</Link>
                </NavbarBrand>
                <Nav className="mr-auto">
                    <NavLink href="/">Home</NavLink>
                    <Form inline>
                        <Input type="text" placeholder="Type Username"/>
                        <Button variant="outline-sucess"> Search</Button>
                    </Form>
                </Nav>
                <Nav classname="ml-auto">
                    <LoginModal/>
                </Nav>
            </Navbar>
        </div>  
    )
    }
export default NavBar