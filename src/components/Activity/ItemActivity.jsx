import React from 'react'
import {Flex, Text, IconButton, Box} from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons';

const ItemActivity = ({title, date, deleteItemActivity, editItem}) => {
  return (
    <Flex direction="column" justify="space-between" height="230px" boxShadow="lg" width="15rem" borderRadius="12px" padding="1rem" cursor="pointer" onClick={editItem} >
      <Text fontSize="1.375rem" fontWeight="bold">{title}</Text>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="#888" fontSize="1rem">{date}</Text>
        <IconButton variant="ghost" icon={<DeleteIcon onClick={deleteItemActivity} color="#888" />} _hover={{background: "none"}} />
      </Flex>
    </Flex>
  )
}

export default ItemActivity