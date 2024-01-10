import React, {useEffect} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, useBoolean,
} from '@chakra-ui/react'
import {useSelector} from "react-redux";

export default function ErrorModal({isOpen, onOpen, onClose , error}) {


    const [modalStatus , setModalStatus] = useBoolean();
    let showModal = useSelector((state) => state.auth.showModal);
    let errorMessage = localStorage.getItem('error')

    useEffect(() => {
        if (!showModal && errorMessage) {
            setModalStatus.on()
        }
    }, [showModal , errorMessage , setModalStatus]);

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {errorMessage}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose } >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
