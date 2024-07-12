import { Button, Flex, Table, TableCaption, TableContainer, Text, Th, Tr, Td, Thead, Tbody } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const [mailLogs, setmailLogs] = useState([])
    const navigate = useNavigate()
    const getMailLogs = async () => {
        try {
            const access_token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/mail-log`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            );
            console.log(response.data);
            setmailLogs(response.data.mailLogs);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getMailLogs()
    }, [])
    console.log(mailLogs);
    return (
        <Flex marginTop={'100px'} width='100vw' direction={'column'}>
            <Text as='h1' fontSize='3xl' fontWeight='bold' textAlign='center' marginBottom='20px'>Dashboard</Text>
            <Flex
                flexDirection="column"
                p={12}
                borderRadius={8}
                boxShadow="lg"
                gap={'20px'}
            >
                <Flex justifyContent={'space-between'}>
                    <Flex direction={'column'} background={'#f9f9f9'} p={12}
                        gap='20px'
                        alignItems={'center'}
                        borderRadius={8}
                        boxShadow="lg">
                        <Text fontWeight={'800'}>Total Email Sent</Text>
                        <Text fontSize={'xl'} >{mailLogs?.length}</Text>
                    </Flex>
                    <Button p='30px 50px' background='#88B04B' color='white'
                        _hover={{
                            background: '#91d922',
                        }}
                        onClick={() => navigate('/bulk-mail-template-list')}>Send Bulk Mail</Button>
                </Flex>
                <Flex direction={'column'} alignItems={'center'} gap='50px'>
                    <Text fontSize={'3xl'} fontWeight={'600'}>Bulk Email Logs</Text>
                    <TableContainer w='100%'>
                        <Table variant='simple'>
                            <TableCaption>Logs of Bulk mail sent</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Sn</Th>
                                    <Th>Subject</Th>
                                    <Th>Sent to</Th>
                                    <Th >Status</Th>
                                    <Th >createdAt</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {mailLogs?.map((log: any, index) => (
                                    <Tr>
                                        <Td>{index + 1}</Td>
                                        <Td>{log.subject}</Td>
                                        <Td>{log.to}</Td>
                                        <Td>{log.status}</Td>
                                        <Td>{log.createdAt.split('T')[0]}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default HomePage
