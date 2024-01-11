import { useRef, useState } from "react";


const Modal = ({ setModalOpen, setSelectedImage, selectedImage, generateEditImage }) => {

  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState('');
  const ref = useRef(null);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  }
  
  const checkSize = () => {
    if (ref.current.width === 256 && ref.current.height === 256) {
      generateEditImage(prompt);
    } else {
      setError('Error: Choose 256 * 256');
    } 
  }

  return(
    <div className="modal">
      <div onClick={closeModal}>X</div>
      <div className="image-container">
        {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="uploaded Image"/>}
      </div>
      <p>{error || "* An Image must be 256 * 256!"}</p>
      {!error && <input value={prompt} onChange={(e) => setPrompt(e.target.value)}/>}
      {!error && <button onClick={checkSize}>Send</button>}
      {error && <button onCLick={closeModal}>Close this and try again</button>}
    </div>
  );
}

export default Modal;