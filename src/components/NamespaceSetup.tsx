import React from "react";
import { Typography } from "@material-ui/core";

const NamespaceSetup: React.FC<any> = ({ namespace }) => {
  return (
    <>
      <Typography>
        <b>Namespace Id:</b> {namespace?.namespaceId}
      </Typography>
      👻 Links to documentation on how to setup React/Vanilla JavaScript library
      for initializing threads under a namespace
    </>
  );
};

export default NamespaceSetup;
