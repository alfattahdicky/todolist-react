import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { IconButton, Stack, Text, Flex, Box, Checkbox, Input, useDisclosure } from "@chakra-ui/react";
import {useRef} from "react";
import Alert from "../Alert";

const Item = (props) => {
  const {title, stateEdit, stateCheckBox ,changeCheckBox, editListItem, priorityColor, deleteListItem, editTitle, changeEditInput} = props;
  const {isOpen, onOpen, onClose}= useDisclosure();
  const cancelRef = useRef(null)
  return (
    <Box bg="white" boxShadow="md" width="100%">
      <Flex align="center" justify="space-between" px="1.2rem" py="0.8rem">
        <Flex>
          <Checkbox onChange={changeCheckBox}>
            <Flex align="center">
              <Box width="0.5rem" height="0.5rem" bgColor={priorityColor} borderRadius="50%" ms="0.4rem"></Box>
              {
                stateEdit ? <Input variant="flushed" onChange={changeEditInput} value={editTitle} /> : <Text textDecoration={stateCheckBox ? "line-through" : "none"} color={stateCheckBox ? "#888": "black"} me="0.4rem" ms="0.5rem" mt="0.2rem" fontSize="1.2rem">{title}</Text>
              }
              <IconButton variant="ghost" icon={<EditIcon />}  _hover={{background: "none"}} onClick={editListItem} />
            </Flex>
          </Checkbox>
        </Flex> 
        <IconButton variant="ghost" icon={<DeleteIcon color="#888" />} _hover={{background: "none"}} onClick={onOpen} />
      </Flex>
      <Alert isOpen={isOpen} title={title} item="list item" 
      cancelRef={cancelRef} onClose={onClose} deleteItem={deleteListItem}/>
    </Box>
  )
}

export default Item