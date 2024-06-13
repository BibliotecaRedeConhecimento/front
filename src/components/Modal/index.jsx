import { Modal } from "react-bootstrap";
import ButtonComponent from "../Button";

export const ModalComponent = ({
  showModal,
  setShowModal,
  action,
  header,
  title,
  cancelText,
  acceptText,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header
        style={{ backgroundColor: "var(--branco)" }}
        closeButton
        onClick={() => setShowModal(false)}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "var(--branco)" }}>
        {header}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "var(--branco)" }}>
        <ButtonComponent
          tamanho="7rem"
          bgColor="var(--cinza-primario)"
          textColor="var(--branco)"
          action={() => setShowModal(false)}
        >
          {" "}
          {cancelText}
        </ButtonComponent>

        <ButtonComponent
          tamanho="10rem"
          bgColor="var(--verde-primario2)"
          textColor="#FFF"
          action={() => action()}
        >
          {acceptText}
        </ButtonComponent>
      </Modal.Footer>
    </Modal>
  );
};
