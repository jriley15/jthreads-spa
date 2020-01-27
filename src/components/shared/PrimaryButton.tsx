import React from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { withStyles, WithStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: "linear-gradient(to right, #4d5af5 0%, #6f41f8 100%)",
    borderRadius: 25,
    color: "white",
    "&:hover": {
      boxShadow: "0 3px 5px 2px rgba(111, 65, 248, .3)"
    }
  },
  regular: {
    padding: "7px 16px"
  },
  small: {
    padding: "4px 12px"
  }
};

function PrimaryButton(props: any) {
  const { classes, children, className, ...other } = props;

  return (
    <Button
      className={clsx(
        classes.root,
        className,
        props.size === "small" ? classes.small : classes.regular
      )}
      {...other}
    >
      {children || "class names"}
    </Button>
  );
}

export default withStyles(styles)(PrimaryButton);
