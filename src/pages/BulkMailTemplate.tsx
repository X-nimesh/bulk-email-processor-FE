import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    TableContainer,
    Box,
    Spinner,
    Text,
} from '@chakra-ui/react';

const BulkMailTemplate = () => {
    const [templateList, setTemplateList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getTemplateList = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/mail-template`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data);
            setTemplateList(response.data);
        } catch (error) {
            console.error('Error fetching mail templates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTemplateList();
    }, []);

    const handleUseTemplate = (templateId: number) => {

        navigate(`/bulk-mail?templateId=${templateId}`);
    }; console.log(templateList);

    return (
        <Flex direction="column" p={4} width="100%" marginTop={'100px'}>
            <Box mb={4}>
                <Text fontSize="2xl" mb={2}>
                    Mail Templates
                </Text>
            </Box>

            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Template Tile</Th>
                            <Th>Subject</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {templateList?.map((template: any) => (
                            <Tr key={template.id}>
                                <Td>{template.title}</Td>
                                <Td>{template.subject}</Td>
                                <Td>
                                    <Button
                                        colorScheme="teal"
                                        onClick={() => handleUseTemplate(template.mailTemplateId)}
                                    >
                                        Use
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

        </Flex>
    );
};

export default BulkMailTemplate;
