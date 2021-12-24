import styled from "styled-components";
import { mobile } from '../responsive';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../redux/apiCalls";

const Container = styled.div`
    width:100vw;
    height : 100vh;
    background : linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),  url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
    display : flex;
    justify-content : center;
    align-items : center;
`;

const Wrapper = styled.div`
    width : 25%;
    padding : 20px;
    background-color : white;
    ${mobile({width : "75%"})}

`;

const Title = styled.h1`
    font-size : 24px;
    font-weight : 300;
`;

const Form = styled.div`
    display : flex;
    flex-direction : column;
`;

const Input = styled.input`
    flex :1;
    min-width : 50%;
    margin : 10px 0px;
    padding : 10px;
`;


const Button = styled.button`
    width : 40%;
    border : none;
    padding : 15px 20px;
    background-color : teal;
    color : white;
    cursor : pointer;
    margin-bottom : 10px;
`;

const Link = styled.a`
    margin : 5px 0px;
    font-size : 12px;
    text-decoration : underline;
    cursor : pointer;
`;

const Error = styled.span`
    color : red;
`

const Login = () => {

    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleClick = (eve) => {
    eve.preventDefault();
    login(dispatch, { username, password });
  };

    return (
        <Container>
            <Wrapper>
                <Title>LOGIN YOUR ACCOUNT</Title>
                <Form>
                    <Input placeholder="username" onChange={(event)=>setUsername(event.target.value)}/>
                    <Input placeholder="password" onChange={(event)=>setPassword(event.target.value)}/>
                    {error && <Error>Something went wrong</Error>}
                    <Button onClick={handleClick}>LOGIN</Button>
                    <Link>DO NOT YOU REMEMBER THE PASSWORD</Link>
                    <Link>CREATE NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;

