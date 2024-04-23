import { ReactNode } from "react";

import { Modal } from "semantic-ui-react";

interface BentroxModalContentProps {
  children?: any;
}

const BentroxModalContent = ({
  children,
  ...childProps
}: BentroxModalContentProps) => (
  <Modal.Content {...childProps}>{children}</Modal.Content>
);

export default BentroxModalContent;
