import {MenuList} from "@chakra-ui/react";

const Dropdown = ({datas}) => {
  return (
    <MenuList p="0">
      {
        datas?.map((priority, index) => {
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
  )
}

export default Dropdown