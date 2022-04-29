import { useViewportSize } from "@mantine/hooks";

export default function userViewportRatio() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  return viewportWidth / viewportHeight;
}