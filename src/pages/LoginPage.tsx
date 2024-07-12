import {
    Flex,
    Heading,
    Input,
    Button,
    Text,
} from "@chakra-ui/react";
import axios from "axios";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        console.log({ email, password });
        const data = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
            email,
            password,
        });
        console.log(data);
        localStorage.setItem("token", data.data.access_token);
        navigate("/");
    }
    return (
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <Flex
                flexDirection="column"
                p={12}
                borderRadius={8}
                boxShadow="lg"
            >
                <Heading mb={6}>Log In</Heading>
                <Input
                    placeholder="johndoe@gmail.com"
                    type="email"
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    mb={3}
                />
                <Input
                    placeholder="**********"
                    type="password"
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    mb={6}
                />
                <Button colorScheme="teal" mb={8} onClick={(e) => onSubmitHandler(e)} >
                    Log In
                </Button>
                <Text>You don't have account.
                    <Text as='span' color='blue' ml={1} >
                        <NavLink to='/register' >
                            Signup
                        </NavLink>
                    </Text>
                </Text>
            </Flex>
        </Flex>
    );

}
