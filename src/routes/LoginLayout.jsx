
import React, {useEffect} from 'react'
import {Box, Flex, Text, useBoolean, useDisclosure} from '@chakra-ui/react'
import AuthForm from "../components/AuthForm";
import ErrorModal from "../components/ErrorModal";
import {useNavigate} from "react-router-dom";




export default function LoginLayout() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalStatus , setModalStatus] = useBoolean();
    let isAuth = sessionStorage.getItem('isAuth');
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate("/")
        }
    }, [navigate,isAuth]);



    return (
        <Flex h='100vh' w='100%' flexDirection='column' justifyContent='space-between'>
            <Flex h='90%' w='100%' alignItems='center' justifyContent='center' gap='50px'>
                <Flex borderWidth='1px' borderColor='#e4e9eb' borderRadius='10px' padding='20px' gap='50px' background='#fdfdfd'>
                    <AuthForm/>
                    <Box>
                        <Text fontSize='xl' textAlign='center'>Название приложения </Text>
                    </Box>
                </Flex>
            </Flex>
            <Flex  justifyContent='flex-end' padding='0 50px 50px'>
                <Text fontSize='md'>Версия ПО: ХХХХХ</Text>
            </Flex>
            <ErrorModal isOpen={isOpen}/>
        </Flex>
    )
}
