import { Facebook, Instagram, LinkedIn, MailOutline, Phone, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components"
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
    display : flex;
    ${mobile({flexDirection : "column"})}
`;

const Left = styled.div`
    flex:1;
    display : flex;
    flex-direction : column;
    padding : 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
    margin : 20px 0px;
`;

const SocialContainer = styled.div`
   display : flex; 
`;

const SocialIcon = styled.div`
width : 40px;
height : 40px;
border-radius : 50%;
color : white;
background-color : #${props => props.color};
display : flex;
justify-content : center;
align-items : center;
margin-right : 20px;
cursor : pointer;
`;

const Center = styled.div`
    flex:1;
    padding : 20px;
    ${mobile({display : "none"})}
`;

const Title = styled.h3`
    margin-bottom : 30px;
`;

const List = styled.ul`
    margin : 0;
    padding : 0;
    list-style : none;
    display : flex;
    flex-wrap : wrap;
`;

const ListItem = styled.li`
    width : 50%;
    margin-bottom : 10px;
    cursor : pointer;
`;

const Right = styled.div`
    flex:1;
    padding : 20px;
    ${mobile({backgroundColor : "#fff8f8"})}
`;

const ContactItem = styled.div`
    display : flex;
    align-tems : center;
    margin-bottom : 20px;
`;

const Payment = styled.img`
    width : 50%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>SALV.</Logo>
                <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dignissimos
                    quae mollitia minus pariatur rem vel at quisquam error dicta, quidem optio vero minima eligendi, est fuga animi magni porro!
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="0e76a8">
                        <LinkedIn />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Usefull Links</Title>
                <List><Link to={"/"}>
                    <ListItem>Home</ListItem></Link>
                        <List><Link to={"/cart"}>
                    <ListItem>Cart</ListItem></Link>
                        <List><Link to={"/products/man"}>
                    <ListItem>Man Fashion</ListItem></Link>
                        <List><Link to={"/products/woman"}>
                    <ListItem>Woman Fashion</ListItem></Link>
                        <List><Link to={"/products"}>
                    <ListItem>Accessories</ListItem></Link>
                    <ListItem>My Account</ListItem>
                    <List><Link to={"/orders"}>
                    <ListItem>Order Tracking</ListItem></Link>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Room style={{ marginRight: "10px" }} /> 2-3 Peddapuram, East Godhavari AP - 533437 </ContactItem>
                <ContactItem><Phone style={{ marginRight: "10px" }} /> +91 9381758626</ContactItem>
                <ContactItem><MailOutline style={{ marginRight: "10px" }} /> rapetivln@gmail.com</ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer

