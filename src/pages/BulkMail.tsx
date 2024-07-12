// import React from 'react'
// import { useLocation } from 'react-router-dom';

// const BulkMail = () => {
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const templateId = queryParams.get('templateId');
//     console.log(templateId);
//     return (
//         <div></div>
//     )
// }

// export default BulkMail

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Button, Text, Box, Spinner, useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const BulkMail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const templateId = queryParams.get('templateId');
    console.log({ templateId });
    if (!templateId) {
        navigate('/bulk-mail-template-list')
    }
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const getTemplateDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/mail-template/${templateId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            setTitle(response.data.title);
        } catch (error) {
            console.error('Error fetching mail template:', error);
        }
    }
    useEffect(() => {
        getTemplateDetails();
    }, [])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !file) {
            toast({
                title: 'Error',
                description: 'Please fill out all fields and select a file.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('templateId', templateId);
        formData.append('file', file);

        try {
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/bulk-mail`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast({
                title: 'Success',
                description: 'Mail sent successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setTitle('');
            setFile(null);
        } catch (error) {
            console.error('Error sending mail:', error);
            toast({
                title: 'Error',
                description: 'Failed to send mail. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex direction="column" p={4} width="100%" maxW="500px" margin="auto" marginTop={'100px'}>
            <Text fontSize="2xl" mb={4}>Send Mail</Text>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        placeholder="Enter the title"
                        contentEditable={false}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="file">File</FormLabel>
                    <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={loading}
                >
                    Send
                </Button>
            </form>
        </Flex>
    );
};

export default BulkMail;
