import React, { useRef } from 'react'
import {Flex, Text, IconButton, Box, Stack, useDisclosure} from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons';
import Alert from '../Alert';

const ItemActivity = ({title, date, deleteItemActivity, editItem}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef(null);
  return (
    <Stack>
      <Flex direction="column" justify="space-between" height="230px" boxShadow="lg" width="15rem" borderRadius="12px" padding="1rem" cursor="pointer">
        <Text fontSize="1.375rem" onClick={editItem} _hover={{textDecoration: "underline"}} fontWeight="bold">{title}</Text>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="#888" fontSize="1rem">{date}</Text>
          <IconButton variant="ghost" onClick={onOpen}  icon={<DeleteIcon color="#888" />} _hover={{background: "none"}} />
        </Flex>
      </Flex>
      <Alert isOpen={isOpen} title={title} item="activity" 
      cancelRef={cancelRef} onClose={onClose} deleteItem={deleteItemActivity} />
    </Stack>
  )
}

export default ItemActivity