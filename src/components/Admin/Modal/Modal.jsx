// Modal.js
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import "./Modal.css";

Modal.setAppElement("body");

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>{children}</div>
    </Modal>
  );
};


CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

export default CustomModal;
