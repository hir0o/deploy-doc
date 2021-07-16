"use babel";

import React, { useEffect, useCallback } from "react";
import { logger, useModal } from "inkdrop";

const DeployDocMessageDialog = (props) => {
  const modal = useModal();
  const { Dialog } = inkdrop.components.classes;

  const deploy = useCallback(async () => {}, []);

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      "deploy-doc:deploy": deploy,
    });
    return () => sub.dispose();
  }, [deploy]);

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>DeployDoc</Dialog.Title>
      <Dialog.Content>DeployDoc was toggled!</Dialog.Content>
      <Dialog.Actions>
        <button className="ui button" onClick={modal.close}>
          Close
        </button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeployDocMessageDialog;
