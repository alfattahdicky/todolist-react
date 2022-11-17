import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Modal, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Box, Text, Flex, Menu, MenuButton, MenuItem,MenuList, MenuOptionGroup, MenuItemOption, Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import Item from "./listItemActivity/Item";
import uppercaseAndRemoveSpecialCharacter from "../utils/regex"

const ModalAddItem = ({isOpen, onClose, addListItem, prioritys, setPrioritys, stateInput, setStateInput , item, setItem}) => {
  // const [item, setItem] = useState(listItemPriority);

  const handleClickPriority = (objPriority) => {
    const checkPriority = prioritys.map(priority => {
      if(priority.value === objPriority.value) {
        return {...priority, isChecked: true}
      }
      return {...priority, isChecked: false}
    });

    setPrioritys(checkPriority);
    // console.log(objPriority);
    setItem({...item, ...objPriority});
  }

  // console.log(item);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent as={Box} width="100%">
        <ModalHeader fontWeight="700" fontSize="1.1rem">Tambah List Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="1.7rem">
          <Stack>
            <Box>
              <Text textTransform="uppercase" mb="0.5rem" fontWeight="700">Nama List Item</Text>
              <Input type="text" variant="outline" value={stateInput} focusBorderColor="#16ABF8" onChange={(e) => setStateInput(e.target.value)} />
            </Box>
            <Box pt="1rem">
              <Text textTransform="uppercase" mb="0.5rem" fontWeight="700">Priority</Text>
                <Menu closeOnSelect={false}>
                    <MenuButton >
                      <Flex border="1px" borderColor="gray.200" w="11rem" py="0.5rem" align="center"  justify="space-between" borderRadius="5px" ps="1rem"  _before={{content: '""', w:"0.7rem", h:"0.7rem",  bgColor: item.color, borderRadius:"50%", zIndex: 1}}>
                        {uppercaseAndRemoveSpecialCharacter(item.priority)}
                        {<ChevronDownIcon fontSize="1.3rem" _hover={{background: "none"}} _active={{background:"none"}} me="0.5rem" ms="1rem" />} 
                      </Flex>
                    </MenuButton>
                  <MenuList p="0">
                    {
                      prioritys?.map((priority, index) => {
                        return (
                          <MenuItem py="0.5rem" _before={{content: '""', width:"0.8rem", height:"0.7rem", me:"0.7rem", bgColor:priority.color, borderRadius:"50%"}} key={index} borderBottom="1px solid #E5E5E5"
                          onClick={() => handleClickPriority(priority)}> 
                            <Flex justify="space-between" w="100%" align="center">
                              <Text>{uppercaseAndRemoveSpecialCharacter(priority.priority)}</Text> 
                              {
                                priority.isChecked ? <CheckIcon color="#4A4A4A" /> : null
                              } 
                            </Flex>
                          </MenuItem>
                        )
                      })
                    }
                  </MenuList>
                </Menu>
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button  bgColor="#16ABF8" variant="solid" color="white" fontWeight="bold" borderRadius="20px" py="1.4rem" px="2rem" isDisabled={stateInput?.length == 0 ? true : false} onClick={addListItem} _hover={{backgroundColor: "none"}} _active={{background: "none"}} _focus={{backgroundColor: "#16ABF8"}}>Simpan</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalAddItem;
