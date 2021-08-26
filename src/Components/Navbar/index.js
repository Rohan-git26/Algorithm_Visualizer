import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
} from "./NavbarElements";

const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                Algorithm Visualizer
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/" activeStyle>
                    Sorting 
                </NavLink>
                 <NavLink to="/about" activeStyle>
                    Path Finding
                </NavLink>
                {/*
                <NavLink to="/contact" activeStyle>
                    Contact
                </NavLink>
                <NavLink to="/signin" activeStyle>
                    Sign In
                </NavLink> */}
                {/* <NavBtn>
                    <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>                
                </NavBtn> */}
            </NavMenu> 
           </Nav> 
        </>
    );
};
export default Navbar;












