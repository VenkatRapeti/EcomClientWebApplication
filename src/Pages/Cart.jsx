import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { deleteEntireCart, removeProductQuantity, addProductQuantity } from "../redux/cartRedux"
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";



const Container = styled.div``;

const Wrapper = styled.div`
    padding : 20px;
    ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
    font-weight : 300;
    text-align : center;
`;

const Top = styled.div`
    display : flex;
    align-items : center;
    justify-content : space-between;
    padding : 20px;
`;

const TopButton = styled.button`
    padding : 10px;
    font-weight : 600;
    cursor : pointer;
    border : ${props => props.type === "filled" && "none"};
    background-color : ${props => props.type === "filled" ? "black" : "transparent"};
    color : ${props => props.type === "filled" && "white"}


`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })};
`;

const TopText = styled.span`
    text-decoration : underline;
    cursor : pointer;
    margin : 0px 10px;
`;

const Bottom = styled.div`
    display : flex;
    justify-content : space-between;
    ${mobile({ flexDirection: "column" })};
`;

const Info = styled.div`
    flex : 3;
`;

const Product = styled.div`
    display : flex;
    justify-content : space-between;
    ${mobile({ flexDirection: "column" })};
   
`;

const ProductDetails = styled.div`
    flex : 2;
    display : flex;
    ${mobile({ overflow: "hidden" })};
`;

const Image = styled.img`
    width : 200px;
    height : 200px;
`;

const Details = styled.div`
    padding : 20px;
    display : flex;
    flex-direction : column;
    justify-content : space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.div``;

const ProductColor = styled.div`
    width : 20px;
    height : 20px;
    border-radius : 50%;
    border : 1px solid black;
    background-color : ${props => props.color};
`;

const ProductSize = styled.div``;

const PriceDetails = styled.div`
    flex : 1;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    
`;

const ProductAmtContainer = styled.div`
    display : flex;
    align-items : center;
    margin-bottom : 20px;
`;

const Amount = styled.div`
    font-size : 24px;
    margin:5px;
    ${mobile({ margin: "5px 15px" })};
`;

const ProductPrice = styled.div`
    font-size : 30px;
    font-weight : 300;
    ${mobile({ marginBottom: "20px" })};
`;

const Hr = styled.hr`
    background-color : lightgray;
    border : none;
    height : 0.5px;
    margin : 10px;
`;

const Summary = styled.div`
    flex : 1;
    border : 0.5px solid lightgray;
    border-radius : 10px;
    padding : 20px;
    height : 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight : 200;
`;

const SummaryItem = styled.div`
    margin : 30px 0px;
    display : flex;
    justify-content : space-between;
    font-weight : ${props => props.type === "total" && "500"};
    font-size : ${props => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width : 100%;
    padding : 10px;
    background-color : black;
    color : white;
    font-weight : 600;
    cursor : pointer;
`;

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory()

    const handelDelete = () => {
        dispatch(
            deleteEntireCart()
        );
    }

    const handelADD = (index) => {
        dispatch(
            addProductQuantity(index)
        );
    }

    const handelRemove = (index) => {
        dispatch(
            removeProductQuantity(index)
        );
    }


    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        const makeReq = async () => {
            try {
                const response = await axios.post("https://fast-atoll-26785.herokuapp.com/stripe/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100
                });
                history.push("/Success", {
                    stripeData: response.data,
                    products: cart,
                });
            } catch (err) { }
        }
        stripeToken && makeReq()

    }, [stripeToken, cart.total, history])


    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to={"/"}>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag({cart.quantity})</TopText>
                        <TopText onClick={handelDelete}>Delete Entire Cart</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <StripeCheckout
                        name="Venkat Ecom"
                        billingAddress
                        shippingAddress
                        description={`Your total is \u20A8${cart.total}`}
                        amount={cart.total * 100}
                        token={onToken}
                        stripeKey="pk_test_51K2FUBSBgw5cSPiq6lQBpvGDArfm0qLKgQKEHuwUzgOYg0Jd7v4BULVMnHGcZx0bVDQRI41SRYMLL4BZyufViPSp00LIZV3qLF"
                    >
                        <TopButton type="filled">CHECKOUT NOW</TopButton>
                    </StripeCheckout>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((item, index) => (
                            <Product>
                                <ProductDetails>
                                    <Image src={item.img} />
                                    <Details>
                                        <ProductName><b>Product:</b>{item.name}</ProductName>
                                        <ProductId> <b>ID:</b> {item._id}</ProductId>
                                        <ProductColor color={item.color} />
                                        <ProductSize><b>Size:</b> {item.size}</ProductSize>
                                    </Details>
                                </ProductDetails>
                                <PriceDetails>
                                    <ProductAmtContainer>
                                        <Add onClick={() => handelADD(index)} />
                                        <Amount>{item.quantity}</Amount>
                                        <Remove onClick={() => handelRemove(index)} />
                                    </ProductAmtContainer>
                                    <ProductPrice>&#8377; {item.price * item.quantity}</ProductPrice>
                                </PriceDetails>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>&#8377; {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>&#8377; 75</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>&#8377; 75</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>&#8377; {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Venkat Ecom"
                            billingAddress
                            shippingAddress
                            description={`Your total is \u20A8${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey="pk_test_51K2FUBSBgw5cSPiq6lQBpvGDArfm0qLKgQKEHuwUzgOYg0Jd7v4BULVMnHGcZx0bVDQRI41SRYMLL4BZyufViPSp00LIZV3qLF"
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>

            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Cart
