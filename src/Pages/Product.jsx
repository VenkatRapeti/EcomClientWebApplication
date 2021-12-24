import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
    padding : 50px;
    display : flex;
    ${mobile({ flexDirection: "column", padding: "10px" })};
`;

const ImgContainer = styled.div`
    flex : 1;
   
`;

const Image = styled.img`
    width : 100%;
    height : 90vh;
    object-fit : cover;
    ${mobile({ height: "40vh" })};
    
`;

const InfoContainer = styled.div`
    flex : 1;
    padding : 0px 50px;
    ${mobile({ padding: "10px" })};

`;

const Title = styled.h1`
    font-weight : 200;
`;

const Desc = styled.p`
    margin : 20px 0px;
`;

const Price = styled.span`
    font-size : 40px;
    font-weight : 300;
`;

const FilterContainer = styled.div`
    margin : 30px 0px;
    width : 50%;
    display : flex;
    justify-content : space-between;
    ${mobile({ width: "100%" })};
`;

const Filter = styled.div`
    display : flex;
    align-items : center;
   
   

`;

const FilterTitle = styled.span`
    font-size : 20px;
    font-weight : 200;
`;

const FilterColor = styled.div`
    width : 20px;
    height : 20px;
    border-radius : 50%;
    background-color : ${props => props.color};
    margin : 0px 5px;
    cursor : pointer;
    border : 1px solid black;
`;

const FilterSize = styled.select`
    margin-left : 10px;
    padding : 5px;
`;

const FilterSizeOption = styled.option``;


const AddContainer = styled.div`
    display : flex;
    width : 50%;
    align-items : center;
    justify-content : space-between;
    ${mobile({ width: "100%" })};
    
`;

const AmountContainer = styled.div`
    display : flex;
    align-items : center;
    font-weight : 700;
   
`;

const Amount = styled.span`
    width : 30px;
    height : 30px;
    border-radius : 10px;
    border : 1px solid teal;
    display : flex;
    align-items : center;
    justify-content : center;
    margin : 0px 5px;
`;

const Button = styled.button`
    padding : 15px;
    border : 2px solid teal;
    background-color : white;
    cursor : pointer;
    font-weight : 500;

    &:hover{
        background-color : #f8f4f4;
    }
`;

const Product = () => {
    const Location = useLocation();
    const id = Location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/findProduct/" + id);
                setProduct(res.data);
            }
            catch (err) { }
        };
        getProduct()
    }, [id])

    const handleQuantity = (type) => {
        if (type === "remove") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    }

    const handleAddCart = () => {
        dispatch(
            addProduct({ ...product, color, size, quantity })
        )

    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>&#8377; {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((color) => (
                                <FilterColor color={color} key={color} onClick={() => setColor(color)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(event) => setSize(event.target.value)}>
                            <FilterSizeOption selected disabled>Select</FilterSizeOption>
                                {product.size?.map((size) => (
                                    <FilterSizeOption key={size}>{size}</FilterSizeOption>
                                ))}

                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("remove")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("add")} />
                        </AmountContainer>
                        <Button onClick={handleAddCart}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product;
