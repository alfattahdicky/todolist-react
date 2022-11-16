import {Stack, Flex, Box, Button, IconButton, Input, Image, Center, Text} from "@chakra-ui/react";
import {AddIcon, ChevronLeftIcon, EditIcon} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivity } from "../../data/activity";

const NewActivity = () => {
  const [stateInput, setStateInput] = useState(false);
  const [activity, setActivity] = useState({});
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const getDetail = async () => {
    const activityById = await getActivity(params.id);
    const data = await activityById.data;

    setActivity(data);
    setEditTitle(activity.title);
    
  }

  useEffect(() => {
    getDetail();
  }, [])

  const addItem = () => {
    console.log("hello")
  }

  const editItem = () => {
    setStateInput(!stateInput);
  }

  const backDashboard = () => {
    navigate("/");
  }

  const {title} = activity;
  return (
    <Stack px="10rem" my="1rem">
      <Flex justify="space-between" mb="1rem">
        <Flex gap="1rem">
          <IconButton variant="ghost" fontSize="2rem" onClick={backDashboard} icon={<ChevronLeftIcon color="black"  />} />
          {
            stateInput ? <Input variant="flushed" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /> : <Text fontWeight="700" fontSize="1.8rem">{ title }</Text>
          }
          <IconButton variant="ghost" icon={<EditIcon />} onClick={editItem} />
        </Flex>

        <Button leftIcon={<AddIcon />} bgColor="#16ABF8" color="white" onClick={addItem}>
          Tambah
        </Button>
      </Flex>
      <Center>
        <Image src="/todo-empty-state.png"  />
      </Center>
    </Stack>
  )
}

export default NewActivity