import { ReactNode } from "react";

import { Modal } from "semantic-ui-react";

interface BentroxModalActionsProps {
  children?: ReactNode;
}

const BentroxModalActions = ({
  children,
  ...childProps
}: BentroxModalActionsProps) => (
  <Modal.Actions {...childProps}>{children}</Modal.Actions>
);

export default BentroxModalActions;
