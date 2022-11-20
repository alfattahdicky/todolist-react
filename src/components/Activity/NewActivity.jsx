import {Stack, Flex, Box, Button, IconButton, Input, Image, Center, Text, ButtonGroup, useDisclosure} from "@chakra-ui/react";
import {AddIcon, ChevronLeftIcon, EditIcon} from "@chakra-ui/icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivity, patchActivity } from "../../data/activity";
import {getAllListItem, postListItem} from "../../data/listItem";
import ListItem from "../listItemActivity/ListItem";
import ModalAddItem from "../ModalAddItem";
import priorityItem from "../../data/priority";

const NewActivity = () => {
  const [stateInput, setStateInput] = useState(false);
  const [input, setInput] = useState("");
  const [activity, setActivity] = useState({});
  const [items, setItems] = useState([]);
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

    setItems([...items, postItemCall.data])
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
            todo_items?.length !== 0 && <Image src="/todo-sort-button.png" width="2.3rem" height="2.3rem" me="0.5rem"/> 
          }
          <Button leftIcon={<AddIcon />} bgColor="#16ABF8" color="white" onClick={addListItem}>
            Tambah
          </Button>
          
        </ButtonGroup>
      </Flex>
      {
        todo_items?.length === 0 ? <Center>
        <Image src="/todo-empty-state.png"  />
        </Center> : <ListItem items={items} setItems={setItems} />
      }
    </Stack>
  )
}

export default NewActivity