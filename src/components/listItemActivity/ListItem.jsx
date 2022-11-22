import {color, Stack, useDisclosure} from "@chakra-ui/react";
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

  const changeCheckBox = async (e, id) => {
    const {value, checked} = e.target;
    // console.log(value);
    // console.log(checked);
    const updateCheckbox = items.map(item => {
      if(item.id === id) {
        if(checked) {
          return {...item, is_active: 1};
        }else {
          return {...item, is_active: 0};
        }
      }else {
        return item;
      }
    });
    const findElementCheckbox = updateCheckbox.find((checkbox) => checkbox.title === value);
    const data = {
      title: findElementCheckbox.title,
      is_active: findElementCheckbox.is_active,
      priority: findElementCheckbox.priority,
    }
    setItems(updateCheckbox);
    const patchItem = await patchListItem(data, id);
    console.log(patchItem);
  }
  
  const deleteListItem = async (id) => {
    setItems(items.filter(item => item.id != id));
    const item = await delListItem(id);

    // console.log(item);
  }

  const priorityColorItem = (priority) => {
    let itemPriority = priorityItem?.find(item => item.priority === priority);
    // console.log(itemPriority, priority)
    return itemPriority?.color;
  }

  const editListItem = async (id) => {
    onOpen();
    const getDetailItem = await getItemsById(id);
    const data = await getDetailItem.data;
    // console.log(data);
    const cloneObj = {...data};
    const findItem = priorityItem.find(pItem => pItem.priority == cloneObj.priority);
    console.log(findItem);

    setEditItem(Object.assign(cloneObj, {color: findItem.color}));
    setInput(data.title);
  }

  const modalEditListItemById = async () => {
    const updateData = {
      title: input,
      is_active: editItem.is_active,
      priority: editItem.priority
    }
    console.log(editItem);
    const patchItem = await patchListItem(updateData, editItem.id);
    console.log(patchItem);
    const updateItem = items.map((item) => {
      if(item.id == editItem.id) {
        return {...item, ...updateData}
      }else {
        return item;
      }
    });
    console.log(updateItem);
    setItems(updateItem);
    onClose();
  }

  return (
    <Stack>
      {
        items.map((item) => {
          return (
            <Item key={item.id} title={item.title} changeCheckBox={(e) => changeCheckBox(e,item.id)} stateCheckBox={item.is_active} priorityColor={() => priorityColorItem(item.priority)} editListItem={() => editListItem(item.id)} deleteListItem={() => deleteListItem(item.id)} id={item.id} />
          )
        })
      }
      <ModalAddItem isOpen={isOpen} onClose={onClose} addListItem={modalEditListItemById} priorityItem={priorityItem} input={editItem.title} item={editItem} setItem={setEditItem} stateInput={input} setStateInput={setInput} prioritys={prioritys} setPrioritys={setPrioritys} stateModal={false} />
    </Stack>
  )
}

export default ListItem;