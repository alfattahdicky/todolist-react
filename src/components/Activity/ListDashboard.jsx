import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {Box, Grid, Center, Text, Stack, Flex, Button, IconButton, SimpleGrid, Image} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteActivity, getAllActivity, postActivity } from "../../data/activity";
import ItemActivity from "./ItemActivity";
import convertUTCToDate from "../../utils/date"
import { useNavigate } from "react-router-dom";

const ListDashboard = () => {
  const [activitys, setActivitys] = useState([]);
  const navigate = useNavigate();

  const activityAll = async () => {
    const activity = await getAllActivity();
    
    setActivitys(activity.data.data);
  }

  useEffect(() => {
    activityAll();
  }, [])

  const addItem = async () => {
    const data = {
      title: "New Activity",
      email: "yoga+1@skyshi.io"
    }
    setActivitys([data, ...activitys]);
    const addActivity = await postActivity(data);

    console.log(addActivity);
    // navigate("/new-activity")
  }

  const deleteItem = async (id) => {
    const delActivity = await deleteActivity(id);

    setActivitys(activitys.filter(activity => activity.id !== id))
    console.log(delActivity);
  }

  const editItem = (id) => {
    navigate(`/activity-group/${id}`)
  }

  return (
    <Stack px="10rem" my="1rem">
      <Flex justify="space-between" mb="1rem">
        <Text fontWeight="700" fontSize="1.8rem">Activity</Text>
        <Button leftIcon={<AddIcon />} bgColor="#16ABF8" color="white" onClick={addItem}>
          Tambah
        </Button>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {
          activitys.reverse().map((activity) => {
            return (
              <ItemActivity title={activity.title} date={convertUTCToDate(activity.created_at)} deleteItemActivity={() => deleteItem(activity.id)} key={activity.id} editItem={() => editItem(activity.id)} />
            )
          })
        }
      </Grid>
    </Stack>
  )
}

export default ListDashboard