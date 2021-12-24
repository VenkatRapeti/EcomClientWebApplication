import React from 'react';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
    padding : 20px 100px;
    ${mobile({ padding: "5px" })}
`;

const Title = styled.h1`
    font-weight : 300;
    text-align : center;
`;

const Entire = styled.div`
    border:0.5px solid lightgray;
    margin-top : 20px;
`;

const Top = styled.div`
    height : 10vh;
    border-bottom : 0.5px solid lightgray;
    background-color : #EAEAEA;
    display : flex;
    justify-content : space-between;
    align-items : center;
`;

const MTextContainer = styled.div`
padding : 10px;
    display : flex;
    flex-direction : column;
    ${mobile({ display: "none" })}
`;

const TextContainer = styled.div`
    padding : 10px;
    display : flex;
    flex-direction : column;
    ${mobile({ padding: "2px" })}
`;

const TextItem = styled.span`
    margin : 1px 0px;
    color : grey;
    font-weight : 500;
    font-size : 14px;
`;

const Bottom = styled.div`
    padding : 20px;
    display : flex;
    border-bottom : 1px solid lightgray;
    ${mobile({ flexDirection: "column", padding: "15px" })}
`;

const ProductDetails = styled.div`
    flex : 2;
    display : flex;
    ${mobile({ overflow: "hidden" })}
`;

const Image = styled.img`
    width : 200px;
    height : 200px
    ${mobile({ width: "150px", height: "150px" })}
`;

const Details = styled.div`
    display : flex;
    flex-direction : column;
    margin : 0px 10px;
`;

const BTextItem = styled.span`
    margin-bottom:20px;
`;

const PriceContainer = styled.div`
    flex : 1;
    margin-left: 12px;
    display:flex;
    justify-content : center;
`;

const AddressContainer = styled.div`
    flex : 2;
    display: flex;
    flex-direction : column;
    margin-left : 15px;
`;

const ATextItem = styled.span`
    margin-bottom : 5px;
`;

const ButtonContainer = styled.div`
margin-left : 10px;
display : flex;
flex-direction :column;

`;

const Button = styled.button`
    padding : 8px 30px;
    margin : 5px 0px;
    background-color : white;
    border : 1.5px solid lightgray;
`;



export const Orders = () => {

    const userId = useSelector((state) => state.user.currentUser.user._id);
    const userName = useSelector((state) => state.user.currentUser.user.firstname);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get(`/findorders/${userId}`);
                setOrders(res.data)
            }
            catch { }
        };
        getOrders();
    }, [])

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR ORDERS</Title>

                {orders.map((item) => (
                    <Entire>
                        <Top>
                            <MTextContainer>
                                <TextItem>
                                    <b>ORDER PLACED</b>
                                </TextItem>
                                <TextItem>
                                    {item.createdAt}
                                </TextItem>
                            </MTextContainer>
                            <TextContainer>
                                <TextItem>
                                    <b>TOTAL</b>
                                </TextItem>
                                <TextItem>
                                    &#8377; {item.amount}
                                </TextItem>
                            </TextContainer>
                            <TextContainer>
                                <TextItem>
                                    <b>SHIP TO</b>
                                </TextItem>
                                <TextItem>
                                    {userName}
                                </TextItem>
                            </TextContainer>
                            <TextContainer>
                                <TextItem>
                                    <b>ORDER # </b>{item._id}
                                </TextItem>
                                <TextItem>
                                    <b>ORDER STATUS: </b>{item.status}
                                </TextItem>
                            </TextContainer>
                        </Top>
                        {item.products.map((product) => (
                            <Bottom>
                                <ProductDetails>
                                    <Image src={product.img} />
                                    <Details>
                                        <BTextItem><b>Product:</b></BTextItem>
                                        <BTextItem><b>ID:</b>{product.productId}</BTextItem>
                                        <BTextItem>{product.title}</BTextItem>
                                        <BTextItem><b>Quantity:</b>{product.quantity}</BTextItem>
                                    </Details>
                                </ProductDetails>
                                <PriceContainer>
                                    <BTextItem><b>Price: </b>&#8377;{product.price}.00</BTextItem>
                                </PriceContainer>
                                <AddressContainer>
                                    <ATextItem><b>Address: </b></ATextItem>
                                    <ATextItem><b>Line1: </b>{item.address.line1}</ATextItem>
                                    <ATextItem><b>City: </b>{item.address.city}</ATextItem>
                                    <ATextItem><b>State: </b>{item.address.state}</ATextItem>
                                    <ATextItem><b>Country: </b>{item.address.country}</ATextItem>
                                    <ATextItem><b>Pincode: </b>{item.address.postal_code}</ATextItem>
                                </AddressContainer>
                                <ButtonContainer>
                                    <Button>Buy product again</Button>
                                    <Button>Write a product review</Button>
                                    <Button>Leave delivery feedback</Button>
                                </ButtonContainer>
                            </Bottom>

                        ))}
                    </Entire>
                ))}

            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}
