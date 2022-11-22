import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { IconButton, Stack, Text, Flex, Box, Checkbox, Input, useDisclosure } from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import AlertDelete from "../AlertDelete";
import priorityItem from "../../data/priority";

const Item = (props) => {
  const {title, stateCheckBox ,changeCheckBox, editListItem, priorityColor = priorityItem[0].color, deleteListItem, editTitle, changeEditInput, id} = props;
  const {isOpen, onOpen, onClose}= useDisclosure();
  const cancelRef = useRef(null);
  const [activeText, setActiveText] = useState(false);

  useEffect(() =>  {
    if(stateCheckBox === 1) {
      setActiveText(true);
    }else {
      setActiveText(false);
    }
  }, [stateCheckBox]);

  return (
    <Box bg="white" boxShadow="md" width="100%">
      <Flex align="center" justify="space-between" px="1.2rem" py="0.8rem">
        <Flex>
          <Checkbox value={title} onChange={changeCheckBox} isChecked={activeText}>
            <Flex align="center">
              <Box width="0.5rem" height="0.5rem" bgColor={priorityColor} borderRadius="50%" ms="0.4rem"></Box>
              <Text textDecoration={activeText ? "line-through" : "none"} id={id} color={"black"} me="0.4rem" ms="0.5rem" mt="0.2rem" fontSize="1.2rem">{title}</Text>
              <IconButton variant="ghost" icon={<EditIcon />}  _hover={{background: "none"}} onClick={editListItem} />
            </Flex>
          </Checkbox>
        </Flex> 
        <IconButton variant="ghost" icon={<DeleteIcon color="#888" />} _hover={{background: "none"}} onClick={onOpen} />
      </Flex>
      <AlertDelete isOpen={isOpen} title={title} item="list item" 
      cancelRef={cancelRef} onClose={onClose} deleteItem={deleteListItem}/>
    </Box>
  )
}

export default Item