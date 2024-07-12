import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Flex, Link, Text, useToast } from '@chakra-ui/react'
const EmailVerificationPage = () => {
    const toast = useToast()
    const [verified, setVerified] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const verifyEmail = async () => {

        try {
            const data = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/verify`, {
                token
            });
            if (data.status === 200) {
                setVerified(true);
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Email Verification Failed',
                description: "Token is not valid or expired. Please try again.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
    useEffect(() => {
        verifyEmail();
    }, [])
    return (
        <Flex
            w='100vw'
            h='100vh'
            alignItems='center'
            justifyContent='center'
            direction='column'
            bgGradient='linear(to-r, #23497D, #37a955)'
            color='white'
        >
            <Text fontSize='6xl' fontWeight='bold' mb={4}>
                Success
            </Text>
            <Text fontSize='3xl' mb={6}>
                Email Verified Successfully
            </Text>
            <Text fontSize='xl'>
                Please proceed to{' '}
                <Link as={NavLink} to='/login' color='yellow.300' textDecoration='underline'>
                    login page
                </Link>
                .
            </Text>
        </Flex>
    )
}

export default EmailVerificationPage
