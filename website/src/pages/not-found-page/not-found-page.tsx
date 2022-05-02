import {
  Box, Title
} from '@mantine/core';
import orgalorg from '../../../assets/orgalorg.png';

export function NotFoundPage() {
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
      <img src={orgalorg} style={{ width: "20vw", height: "auto" }}></img>
      <Title>404 - Gunther Not Found</Title>
      <img src={orgalorg} style={{ width: "20vw", height: "auto" }}></img>
    </Box>
  );
}