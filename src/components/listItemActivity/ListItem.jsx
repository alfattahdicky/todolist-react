import {Stack, useDisclosure} from "@chakra-ui/react";
import Item from "./Item";
import {useEffect, useState} from "react";
import { delListItem, getItemsById, patchListItem } from "../../data/listItem";
import { useParams } from "react-router-dom";
import priorityItem from "../../data/priority"
import ModalAddItem from "../ModalAddItem";

const ListItem = ({items, setItems}) => {
  const [stateCheckBox, setStateCheckBox] = useState(false);
  const [input, setInput] = useState("");  
  const [prioritys, setPrioritys] = useState(priorityItem);
  const [editItem, setEditItem] = useState({});
  const {isOpen, onOpen, onClose} = useDisclosure();
  const params = useParams();

  const changeCheckBox = (e, id) => {
    // const checked = e.target.checked;
    // if(id === 5920) {
    //   setStateCheckBox(checked);
    // }
    // const updateCheckbox = items.map(item => {
    //   if(item.id === id) {
    //     if(checked) {
    //       setStateCheckBox(true)
    //       return {...item, isActive: 1};
    //     }else {
    //       setStateCheckBox(false)
    //       return {...item, isActive: 0};
    //     }
    //   }else {
    //     return item;
    //   }
    // });

    // setItems(updateCheckbox);

    // console.log(e.target.checked, id);
  }
  const deleteListItem = async (id) => {
    setItems(items.filter(item => item.id != id));
    const item = await delListItem(id);

    // console.log(item);
  }

  const priorityColorItem = (priority) => {
    let items = priorityItem.find(item => item.priority === priority);
    // console.log(items)
    return items.color;
  }


  const editListItem = async (id) => {
    onOpen();
    const getDetailItem = await getItemsById(id);
    const data = await getDetailItem.data;
    // console.log(data);
    const findItem = priorityItem.find(pItem => pItem.priority == data.priority);
    // console.log(findItem);

    const cloneObj = {...data};
    setEditItem(Object.assign(cloneObj, {color: findItem.color}));
    setInput(data.title);
  }

  const editListItemById = async () => {
    const updateData = {
      title: input,
      is_active: editItem.is_active,
      priority: editItem.priority
    }
    console.log(updateData);
    const patchItem = await patchListItem(updateData, editItem.id);
    console.log(patchItem);
  }

  // console.log(editItem)

  return (
    <Stack>
      {
        items.map((item) => {
          return (
            <Item key={item.id} title={item.title} changeCheckBox={(e) => changeCheckBox(e,item.id)} stateCheckBox={stateCheckBox} priorityColor={() => priorityColorItem(item.priority)} editListItem={() => editListItem(item.id)} deleteListItem={() => deleteListItem(item.id)} />
          )
        })
      }
      <ModalAddItem isOpen={isOpen} onClose={onClose} addListItem={editListItemById} priorityItem={priorityItem} input={editItem.title} item={editItem} setItem={setEditItem} stateInput={input} setStateInput={setInput} prioritys={prioritys} setPrioritys={setPrioritys} />
    </Stack>
  )
}

export default ListItem