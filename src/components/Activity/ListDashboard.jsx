import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {Box, Grid, Center, Text, Stack, Flex, Button, IconButton, SimpleGrid, Image, useDisclosure, Alert, AlertIcon} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { deleteActivity, getAllActivity, postActivity } from "../../data/activity";
import ItemActivity from "./ItemActivity";
import convertUTCToDate from "../../utils/date"
import { useNavigate } from "react-router-dom";

const ListDashboard = () => {
  const [activitys, setActivitys] = useState([]);
  const [deleteActive, setDeleteActive] = useState(false);
  const navigate = useNavigate();

  const activityAll = async () => {
    const activity = await getAllActivity();
    
    setActivitys(activity.data.data);
  }

  useEffect(() => {
    activityAll();
    setTimeout(() => {
      setDeleteActive(false);
    }, 1000)
  }, [deleteActive])

  const addItem = async () => {
    const data = {
      title: "New Activity",
      email: "yoga+1@skyshi.io"
    }
    const addActivity = await postActivity(data);
    setActivitys([addActivity.data, ...activitys]);

    // console.log(addActivity);
    // navigate("/new-activity")
  }

  const deleteItem = async (e, id) => {
    // e.stopPropagation();
    console.log("delete item activity", id);
    const delActivity = await deleteActivity(id);
    setActivitys(activitys.filter(activity => activity.id !== id));
    setDeleteActive(true);
  }

  const editItem = (e, id) => {
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
      {activitys.length === 0 ? <Center><Image src="/activity-empty-state.png" /></Center> : null
      }
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {
          activitys.reverse().map((activity) => {
            return (
              <ItemActivity key={activity.id} title={activity.title} date={convertUTCToDate(activity.created_at)} deleteItemActivity={(e) => deleteItem(e, activity.id)}  editItem={(e) => editItem(e, activity.id)} />
            )
          })
        }
      </Grid>
      <Alert backgroundColor="white" status="warning" variant="subtle" position="fixed" bottom="4rem" left="0" width="30%" transition="ease .150s" transform={deleteActive ? "translateX(0)" : "translateX(-100%)"} boxShadow="md" borderRadius="5px">
        <AlertIcon color="green.500" />
        Activity Berhasil Dihapus
      </Alert>
      
    </Stack>
  )
}

export default ListDashboard