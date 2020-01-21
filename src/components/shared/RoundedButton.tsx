import React from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { withStyles, WithStyles } from "@material-ui/core/styles";

interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  className?: string;
}

const styles = {
  root: {
    borderRadius: 25,
    padding: "7px 16px"
  }
};

const RoundedButton: React.FC<Props> = (props: Props) => {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || "class names"}
    </Button>
  );
};

export default withStyles(styles)(RoundedButton);
