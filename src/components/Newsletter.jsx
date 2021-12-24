import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';


const Container = styled.div`
    height : 60vh;
    background-color : #fcf5f5;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

const Title = styled.h1`
    font-size : 70px;
    margin-bottom : 20px;
`;

const Desc = styled.div`
    font-size : 24px;
    font-weight : 300;
    margin-bottom : 20px;
    ${mobile({ fontSize: "20px", textAlign: "center" })}
`;

const InputContainer = styled.div`
    height : 40px;
    width : 50%;
    background-color : white;
    display : flex;
    justify-content : space-between;
    border : 1px solid lightgray;
    ${mobile({ width: "80%" })}
`;

const Input = styled.input`
    border : none;
    flex : 8;
    outline : none;
    padding-left : 20px;
    
`;

const Button = styled.button`
    flex : 1;
    border : none;
    background-color : teal;
    color : white;
    cursor : pointer;
`;


const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Get timely updates from your favorite products.</Desc>
            <InputContainer>
                <Input placeholder="Your email" />
                <Button>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter
