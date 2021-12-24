import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOutSuccesss } from "../redux/userRedux";
import { useDispatch } from 'react-redux';
import { useState } from 'react';





const Container = styled.div`
    height : 60px;
    ${mobile({ height: "50px" })};
`
const Wrapper = styled.div`
    padding : 10px 20px ;
    display : flex;
    justify-content : space-between;
    align-items : center;
    ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
    flex :1;
    display : flex;
    align-items : center;
`

const Language = styled.span`
    font-size : 14px;
    cursor : pointer;
    ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
    border : 0.5px solid lightgray;
    display : flex;
    align-items : center;
    margin-left : 25px;
    ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
    border : none;
    padding : 5px;
    outline : none;
    border-right : 1px solid gray;
    ${mobile({ width: "50px" })}
`

const Center = styled.div`
    flex :1;
    text-align : center;
`

const Logo = styled.h1`
    font-weight : bold;
    ${mobile({ fontSize: "24px", marginLeft: "20px" })}

`

const Right = styled.div`
    flex :1;
    display : flex;
    align-items : center;
    justify-content : flex-end;
    ${mobile({ justifyContent: "center", flex: "3" })}
`

const MenuItem = styled.div`
    font-size : 14px;
    cursor : pointer;
    margin-left : 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
 
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState("")

    const handelInput = (e) => {
        setInput(e.target.value)
    }

    const handelSearch = () => {
        history.push(input ? `/products/${input}` : "")
    }

    const handleLogout = () => {
        dispatch(
            logOutSuccesss()
        )
    }


    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to={"/"}>
                        <Language>HOME</Language>
                    </Link>

                    <SearchContainer >
                        <Input placeholder="search" onChange={handelInput} />
                        <Search style={{ color: "gray", fontSize: "16px",padding : "3px" }} onClick={handelSearch} />

                    </SearchContainer>
                </Left>
                <Center><Logo>SALV.</Logo></Center>
                <Right>
                    {user ?
                        <>
                            <Link to={"/orders"}>
                                <MenuItem>YOUR ORDERS</MenuItem>
                            </Link>
                            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                        </>

                        :
                        <>
                            <Link to={"/register"}>
                                <MenuItem>REGISTER</MenuItem>
                            </Link>
                            <Link to={"/login"}>
                                <MenuItem> SIGN IN</MenuItem>
                            </Link>
                        </>
                    }


                    <Link to={"/cart"}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;
