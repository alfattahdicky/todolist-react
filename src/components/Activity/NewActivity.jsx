import {Stack, Flex, Box, Button, IconButton, Input, Image, Center, Text, ButtonGroup, useDisclosure, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import {AddIcon, ChevronLeftIcon, EditIcon, CheckIcon} from "@chakra-ui/icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivity, patchActivity } from "../../data/activity";
import {getAllListItem, postListItem} from "../../data/listItem";
import ListItem from "../listItemActivity/ListItem";
import ModalAddItem from "../ModalAddItem";
import priorityItem from "../../data/priority";
import sortingItem from "../../data/sort";

const NewActivity = () => {
  const [stateInput, setStateInput] = useState(false);
  const [input, setInput] = useState("");
  const [activity, setActivity] = useState({});
  const [items, setItems] = useState([]);
  const [sortItem, setSortItem] = useState(sortingItem);
  const [item, setItem] = useState({});
  const [prioritys, setPrioritys] = useState(priorityItem);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const getDetail = async () => {
    const activityById = await getActivity(params.id);
    const data = await activityById.data;

    setActivity(data);
    setEditTitle(activity.title);
  }

  
  const patchDetail = async (title) => {
    const activityById = await patchActivity(title, params.id);

    // console.log(activityById);
  }

  const getListItem = async () => {
    const dataItems = await getAllListItem(params.id);
    const responseData = dataItems.data;
    
    setItems(responseData.data);
    console.log(responseData);
  }

  useLayoutEffect(() => {
    console.log(items);
    getListItem();
  }, []);

  useEffect(() => {
    getDetail();
  }, [])

  const addListItem = async () => {
    const data = {
      title: "new items",
      activity_group_id: params.id,
    }
    const postItemCall = await postListItem(data);

    setItems([postItemCall.data, ...items])
    console.log(postItemCall);
    setStateInput("");
  }

  const editItem = () => {
    setStateInput(!stateInput);

    if(stateInput) {
      setActivity({...activity, title: editTitle});
      patchDetail(editTitle);
    }
  }

  const handleSortItem = (name) => {
    const updateSortItem = sortItem.map((item) => {
      if(item.name == name) {
        return {...item, isChecked: true}
      }
      return {...item, isChecked: false}
    });
    // console.log(updateSortItem);
    setSortItem(updateSortItem);
    console.log(items);

    let sortLatest;
    switch(name) {
      case "Terlama":
        sortLatest = items.sort((a, b) => a.id - b.id)
        break;
      case "Terbaru":
        sortLatest = items.sort((a, b) => b.id - a.id);
        break;
      case "A-Z": 
        sortLatest = items.sort((a,b) => {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        })
        break;
      case "Z-A":
        sortLatest = items.sort((a,b) => {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();
          return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
        })
        break;
      case "Belum Selesai":
        sortLatest = items.sort((a, b) => a.is_active - b.is_active);
        break;
    }
    console.log(sortLatest);
    setItem(sortLatest);
  }

  const backDashboard = () => {
    navigate("/");
  }
  const {title, todo_items} = activity;
  return (
    <Stack px="10rem" my="1rem">
      <Flex justify="space-between" mb="1rem">
        <Flex gap="1rem">
          <IconButton variant="ghost" fontSize="2rem" onClick={backDashboard} icon={<ChevronLeftIcon color="black" />} />
          {
            stateInput ? <Input variant="flushed" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /> : <Text fontWeight="700" fontSize="1.8rem">{ title }</Text>
          }
          <IconButton variant="ghost" icon={<EditIcon />} onClick={editItem} />
        </Flex>
        <ButtonGroup>
          {
            items?.length !== 0 && 
            <Menu>
              <MenuButton>
                <Image src="/todo-sort-button.png" width="2.3rem" height="2.3rem" me="0.5rem"/> 
              </MenuButton>
              <MenuList p="0">
                {
                  sortItem.map((item, index) => (
                    <MenuItem key={index} py="0.8rem" borderBottom="1px solid #E5E5E5" onClick={() => handleSortItem(item.name)}>
                      <Flex justify="space-between" w="100%" align="center">
                        <Flex>
                          <Image src={item.img} objectFit="contain" objectPosition="center" />
                          <Text ms="0.4rem">{item.name}</Text> 
                        </Flex>
                        {
                          item.isChecked ? <CheckIcon color="#4A4A4A" fontSize="0.875rem" /> : null
                        } 
                      </Flex>
                    </MenuItem>
                  ))
                }
              </MenuList>
            </Menu>
          }
          <Button leftIcon={<AddIcon />} bgColor="#16ABF8" color="white" onClick={addListItem}>
            Tambah
          </Button>
          
        </ButtonGroup>
      </Flex>
      {
        items?.length === 0 ? <Center>
        <Image src="/todo-empty-state.png"  />
        </Center> : <ListItem items={items} setItems={setItems} />
      }
    </Stack>
  )
}

export default NewActivity