import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import EmailIcon from "@material-ui/icons/Email";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import useInjectReducer from "utils/useInjectReducer";
import { message as messageStorage } from "utils/storageManager";

import reducer from "./reducer";
import {
  selectMessage,
  selectMessageDraft,
  selectUnreadMessageCount
} from "./messageSlice";

const useStyles = makeStyles(theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  icon: {
    color: theme.palette.text.hint
  },
  iconSelect: {
    color: theme.palette.primary
  },

  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const group = {
  home: {
    label: "home",
    path: "home",
    icon: HomeOutlinedIcon,
    iconSelect: HomeIcon
  },
  explore: {
    label: "explore",
    path: "explore",
    icon: ExploreOutlinedIcon,
    iconSelect: ExploreIcon
  },

  message: {
    label: "message",
    path: "message",
    icon: MailOutlineIcon,
    iconSelect: EmailIcon
  }
};

const key = "layout";

export default () => {
  useInjectReducer({ key, reducer });

  const message = useSelector(selectMessage);

  useEffect(() => {
    // store message
    messageStorage.setItem(message);
  }, [message]);

  const unreadMessageCount = useSelector(selectUnreadMessageCount);
  const messageDraft = useSelector(selectMessageDraft);

  const classes = useStyles();

  const theme = useTheme();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isSelect = path => `/${path}` === pathname;

  const ToolIcon = ({ select: IconSelect, icon: Icon, path, ...props }) => {
    return isSelect(path) ? <IconSelect {...props} /> : <Icon {...props} />;
  };

  return (
    <div>
      <Outlet />
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <IconButton
                style={{
                  color: isSelect(group.home.path)
                    ? theme.palette.primary.main
                    : theme.palette.text.hint
                }}
                aria-label={group.home.label}
                onClick={() => navigate(group.home.path)}
              >
                <ToolIcon
                  select={group.home.iconSelect}
                  icon={group.home.icon}
                  path={group.home.path}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                style={{
                  color: isSelect(group.explore.path)
                    ? theme.palette.primary.main
                    : theme.palette.text.hint
                }}
                aria-label={group.explore.label}
                onClick={() => navigate(group.explore.path)}
              >
                <Badge
                  color="secondary"
                  badgeContent="draft"
                  invisible={
                    messageDraft.trim() === "" || isSelect(group.explore.path)
                  }
                >
                  <ToolIcon
                    select={group.explore.iconSelect}
                    icon={group.explore.icon}
                    path={group.explore.path}
                  />
                </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                style={{
                  color: isSelect(group.message.path)
                    ? theme.palette.primary.main
                    : theme.palette.text.hint
                }}
                aria-label={group.message.label}
                onClick={() => navigate(group.message.path)}
              >
                <Badge color="secondary" badgeContent={unreadMessageCount}>
                  <ToolIcon
                    select={group.message.iconSelect}
                    icon={group.message.icon}
                    path={group.message.path}
                  />
                </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => navigate("mine")}>
                <Box
                  boxSizing="border-box"
                  borderRadius="50%"
                  border={1}
                  p={0.5}
                  borderColor={
                    isSelect("mine")
                      ? theme.palette.primary.main
                      : "transparent"
                  }
                >
                  <Avatar
                    alt="your avatar"
                    src="/logo192.png"
                    variant="rounded"
                    className={classes.avatar}
                  />
                </Box>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};
