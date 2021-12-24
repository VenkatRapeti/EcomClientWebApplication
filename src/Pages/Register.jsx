import { useState } from "react";
import styled from "styled-components";
import { mobile } from '../responsive';
import { publicRequest } from "../requestMethods";
import { useHistory } from "react-router";

const Container = styled.div`
    width:100vw;
    height : 100vh;
    background : linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
        background-size : cover;
    display : flex;
    justify-content : center;
    align-items : center;
`;

const Wrapper = styled.div`
    width : 45%;
    padding : 20px;
    background-color : white;
    ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
    font-size : 24px;
    font-weight : 300;
`;

const Form = styled.div`
    display : flex;
    flex-wrap : wrap;
`;

const Input = styled.input`
    flex :1;
    min-width : 40%;
    margin : 20px 10px 0px 0px;
    padding : 10px;
`;

const Agreement = styled.span`
    font-size : 12px;
    margin : 20px 0px;
`;

const Button = styled.button`
    width : 40%;
    border : none;
    padding : 15px 20px;
    background-color : teal;
    color : white;
    cursor : pointer;
`;

const Register = () => {
    const [userDetails, setUserDetails] = useState({});
    const history = useHistory();

    const handelUser = (e) => {
        setUserDetails((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handelUserData = async (e) => {
        try {
            const response = await publicRequest.post("/auth/register", userDetails)
            response.data.user && window.alert("Your Account Successfully Created, Please Login To Continue")
            response.data && history.push("/login")
        }
        catch (err) {
            window.alert("please fill all fields or username or email is already registered with our database so please change or try to login")
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input name="firstname" placeholder="name" onChange={handelUser} />
                    <Input name="lastname" placeholder="last name" onChange={handelUser} />
                    <Input name="username" placeholder="username" onChange={handelUser} />
                    <Input name="email" placeholder="email" onChange={handelUser} />
                    <Input name="password" placeholder="password" onChange={handelUser} />
                    <Input placeholder="confirm password" />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handelUserData}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register;

