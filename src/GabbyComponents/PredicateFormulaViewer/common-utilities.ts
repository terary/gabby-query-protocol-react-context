import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

// TODO - *tmc* is this being used?
const parentDivisor = (numberOfChildren: number, currentWidth?: number) => {
  const isTwoPart = numberOfChildren % 2 === 0;
  const isThreePart = numberOfChildren % 3 === 0;

  switch (true) {
    case currentWidth !== undefined && currentWidth < 125:
      return 12;
    case isThreePart:
      return 4;
    case isTwoPart:
      return 6;
    default:
      return true;
  }
};

// TODO - *tmc* if this is being used many places make it app common
const PaperItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export { PaperItem, parentDivisor };
