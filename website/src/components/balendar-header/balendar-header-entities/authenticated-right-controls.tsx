import { ActionIcon, Menu, Text } from "@mantine/core";
import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { appStore, authSlice } from "../../../app-store";

export const AuthenticatedRightControls = () => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    appStore.dispatch(authSlice.actions.clearAuthToken());
    localStorage.removeItem("BALENDAR_AUTH_TOKEN");
    navigate("/login/");
  }

  return (
    <Menu control={<ActionIcon><AiFillSetting /></ActionIcon>}>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item onClick={() => onLogoutClick()}>
        <Text>Logout</Text>
      </Menu.Item>
    </Menu>
  )
}