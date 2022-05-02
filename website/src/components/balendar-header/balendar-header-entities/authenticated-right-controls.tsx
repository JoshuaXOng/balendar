import { ActionIcon, Divider, Menu, Text } from "@mantine/core";
import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { appStore, authSlice } from "../../../app-store";

type AuthenticatedRightControlsProps = {
  recenterCalendar: () => void
}

export const AuthenticatedRightControls = (props: AuthenticatedRightControlsProps) => {
  const { recenterCalendar } = props;

  const navigate = useNavigate();

  const onLogoutClick = () => {
    appStore.dispatch(authSlice.actions.clearAuthToken());
    localStorage.removeItem("BALENDAR_AUTH_TOKEN");
    navigate("/login/");
  }

  return (
    <Menu control={<ActionIcon><AiFillSetting /></ActionIcon>}>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item onClick={() => recenterCalendar()}>
        <Text>Re-center</Text>
      </Menu.Item>
      <Divider />
      <Menu.Label>Profile</Menu.Label>
      <Menu.Item onClick={() => onLogoutClick()}>
        <Text>Logout</Text>
      </Menu.Item>
    </Menu>
  )
}