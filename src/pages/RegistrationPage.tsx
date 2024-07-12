import {
    Flex,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useToast,
    Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { NavLink } from "react-router-dom";

const RegistrationPage = () => {
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Full Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/register`, values);
                localStorage.setItem("token", response.data.access_token);
                toast({
                    title: "Registration Successful.",
                    description: "You have been registered successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: "Registration Failed.",
                    description: error.response?.data?.message || "An error occurred.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        },
    });

    return (
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <form onSubmit={formik.handleSubmit}>
                <Flex
                    flexDirection="column"
                    p={8}
                    gap="20px"
                    borderRadius={8}
                    boxShadow="lg"
                    bg="white"
                    width={{ base: "90%", sm: "400px" }}
                >
                    <FormControl isInvalid={formik.touched.name && Boolean(formik.errors.name)}>
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            variant="filled"
                            placeholder="Nimesh Shrestha"
                            {...formik.getFieldProps('name')}
                        />
                        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.email && Boolean(formik.errors.email)}>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            variant="filled"
                            placeholder="johndoe@gmail.com"
                            {...formik.getFieldProps('email')}
                        />
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.password && Boolean(formik.errors.password)}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            variant="filled"
                            placeholder="*****"
                            {...formik.getFieldProps('password')}
                        />
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="teal" mt={4}>
                        Register
                    </Button>
                    <Text>You already have an account.
                        <Text as='span' color='blue' ml={1} >
                            <NavLink to='/login' >
                                Login
                            </NavLink>
                        </Text>
                    </Text>
                </Flex>
            </form>
        </Flex>
    );
};

export default RegistrationPage;
