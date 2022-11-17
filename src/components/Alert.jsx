import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, Image, Center, AlertDialogBody, Text, AlertDialogFooter, ButtonGroup, Button } from '@chakra-ui/react'
import React from 'react'

const Alert = ({item, title, isOpen,cancelRef, onClose, deleteItem}) => {
  return (
    <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} bgColor="white">
      <AlertDialogOverlay />
      <AlertDialogContent py="1.5rem">
        <AlertDialogHeader>
          <Center>
            <Image src='/modal-delete-icon.png' />
          </Center>
        </AlertDialogHeader>
        <AlertDialogBody mx="auto">
          Apakah anda yakin menghapus {item} <Center fontWeight="bold" 
          fontSize="1.1rem">"{title}"?</Center>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup mx="auto"gap={4}>
            <Button bgColor="f4f4f4" color="#4A4A4A" fontWeight="bold" borderRadius="20px" py="1.4rem" px="2rem" ref={cancelRef} onClick={onClose}>Batal</Button>
            <Button bgColor="#ED4C5C" color="white" fontWeight="bold" borderRadius="20px" py="1.4rem" px="2rem" _hover={{backgroundColor: "none"}} _focus={{backgroundColor: "#ED4C5C"}} onClick={deleteItem}>Hapus</Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Alert