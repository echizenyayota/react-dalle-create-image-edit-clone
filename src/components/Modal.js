import { useState, useRef } from "react";


const Modal = ({ setModalOpen, setSelectedImage, selectedImage}) => {

  const [error, setError] = useState(null);
  const ref = useRef(null);
  
  console.log('selectedImage', selectedImage);
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  }

  const checkSize = () => {
    if (ref.current.width === 256 && ref.current.height === 256) {
      // getEditImage();
    } else {
      setError('Error: Choose 256 * 256 image');
    }
  }

  return(
    <div className="modal">
      <div onClick={closeModal}>X</div>
      <div className="image-container">
        {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="uploaded image" />}
      </div>
      <p>{error || "* Image must be 256 * 256!"}</p>
      {! error && <textarea />}
      {! error && <button onClick={checkSize}>Send</button>}
      {error && <button onClick={closeModal}>Close this and try again</button>}
    </div>
  );
}

export default Modal;