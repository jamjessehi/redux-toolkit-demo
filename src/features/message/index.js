import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessageList,
  selectUnreadMessageList,
  markRead,
  delMultipleMessages
} from "features/layout/messageSlice";
import { Grid } from "@material-ui/core";

function sortCreateTime({ id: a = 0 } = {}, { id: b = 1 } = {}) {
  return parseFloat(b) - parseFloat(a);
}

const useStyles = makeStyles(theme => ({
  editBtnItem: {
    flex: 1
  }
}));

export default () => {
  const classes = useStyles();

  const [isFilter, setIsFilter] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [checked, setChecked] = useState([]);
  const messageList = useSelector(selectMessageList);
  const unreadMessageList = useSelector(selectUnreadMessageList);

  const dispatch = useDispatch();

  const list = isFilter ? unreadMessageList : messageList;

  const isAllSelected = useMemo(() => {
    return list.length === checked.length;
  }, [list, checked]);

  function handleChecked(e) {
    const { value, checked } = e.target;
    if (checked) {
      setChecked(prev => [...prev, value]);
    } else {
      setChecked(prev => prev.filter(item => item !== value));
    }
  }

  useEffect(() => {
    setChecked([]);
  }, [editMode, isFilter]);

  function handleSelectAll() {
    if (isAllSelected) {
      setChecked([]);
    } else {
      const ids = list.map(({ id }) => id.toString());
      setChecked(ids);
    }
  }

  function handleDel() {
    const ids = checked.map(item => parseInt(item));
    dispatch(delMultipleMessages(ids));
    setEditMode(false);
  }

  const sortList = useMemo(() => {
    const arr = [...list];
    return arr.sort(sortCreateTime);
  }, [list]);

  return (
    <>
      <Box mx={-2}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Button
              disabled={list.length === 0}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={isFilter}
                  onChange={e => setIsFilter(e.target.checked)}
                />
              }
              label={isFilter ? "Unread" : "All"}
            />
          </Grid>
        </Grid>
      </Box>

      {editMode && (
        <Box display="flex" mx={-2}>
          <Button className={classes.editBtnItem} onClick={handleSelectAll}>
            {isAllSelected ? "Cancel all" : "Select all"}
          </Button>
          <Button
            disabled={checked.length === 0}
            className={classes.editBtnItem}
            onClick={handleDel}
          >
            Delete
          </Button>
        </Box>
      )}

      <List>
        {sortList.map(({ id, text, unread }) => (
          <ListItem key={id} divider>
            {editMode && (
              <Checkbox
                checked={checked.includes(id.toString())}
                value={id}
                onChange={handleChecked}
              />
            )}
            <ListItemAvatar>
              <Avatar>J</Avatar>
            </ListItemAvatar>
            <ListItemText primary={text} />
            <ListItemSecondaryAction>
              <Button
                disabled={!unread}
                size="small"
                onClick={() => {
                  if (unread) {
                    dispatch(markRead(id));
                  }
                }}
              >
                <Box fontSize={12}>{unread ? "mark read" : "readed"}</Box>
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};
