import { useState } from "react";


const Modal = ({ setModalOpen, setSelectedImage, selectedImage }) => {

  const [error, setError] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  }

  return(
    <div className="modal">
      <div onClick={closeModal}>X</div>
      <div className="image-container">
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="uploaded Image"/>}
      </div>
      <input />
      <button>Send</button>
    </div>
  );
}

export default Modal;