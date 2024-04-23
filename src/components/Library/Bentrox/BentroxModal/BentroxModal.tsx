import { ReactNode } from "react";

import { When } from "react-if";
import { Modal } from "semantic-ui-react";

import BentroxModalActions from "./BentroxModalActions";
import BentroxModalContent from "./BentroxModalContent";
import BentroxModalHeader from "./BentroxModalHeader";

interface BentroxModalProps {
  className?: string;
  size?: "small" | "mini" | "tiny" | "large" | "fullscreen";
  open?: boolean;
  title?: string;
  closeHandler: any;
  onDismiss?: any;
  onConfirm?: any;
  isClosable?: boolean;
  children?: ReactNode;
  closeByClickingOutside?: boolean;
  closeOnEscape?: boolean;
  headerChildren?: ReactNode;
  linkTo?: string;
}

const BentroxModal = ({
  className = "",
  size = undefined,
  open = false,
  isClosable = true,
  children = null,
  closeByClickingOutside = false,
  closeOnEscape = false,
  headerChildren = null,
  title = undefined,
  linkTo = undefined,
  closeHandler,
  ...rest
}: BentroxModalProps) => (
  <Modal
    size={size}
    open={open}
    className={`${className}`}
    onClose={closeHandler}
    closeOnDimmerClick={isClosable ? closeByClickingOutside : false}
    closeOnEscape={isClosable ? closeOnEscape : false}
    {...rest} // eslint-disable-line react/jsx-props-no-spreading
  >
    <When condition={!!title || !!headerChildren}>
      {() => (
        <BentroxModal.Header
          title={title}
          closeHandler={closeHandler}
          isClosable={isClosable}
          headerChildren={headerChildren}
          linkTo={linkTo}
        />
      )}
    </When>
    {children}
  </Modal>
);

BentroxModal.Header = BentroxModalHeader;
BentroxModal.Content = BentroxModalContent;
BentroxModal.Actions = BentroxModalActions;

export default BentroxModal;
