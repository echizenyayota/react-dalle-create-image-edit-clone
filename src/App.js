import { useState } from "react";
import Modal from "./components/Modal";

const App = () => {

  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const uploadImage = async(e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);
    e.target.value = null;

    try {
      const options = {
        method: "POST",
        body: formData,
      }
      const response = await fetch('http://localhost:8000/upload', options);
      const data = await response.json();
      console.log(data);
    } catch(error) {
      console.error(error);
    }
  }

  const generateEditImage = async () => {
    setImages(null);

    if (selectedImage === null) {
      setError('Error! Must have an existing image');
      setModalOpen(false);
      return;
    }

    try {
      const options = {
        method: "POST",
        body: "Let the ice cream replace the cake.", 
      }
      const response = await fetch('http://localhost:8000/editImage', options);
      const data = await response.json();
      console.log(data);
      setImages(data);
      setError(null);
      setModalOpen(false);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="app">
      <div className="upload-image">
        <span>
          <label htmlFor="files">Upload an image </label>
          <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
          to edit.
        </span>
        {modalOpen && <div className="overlay">
          <Modal 
            setModalOpen={setModalOpen}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            generateEditImage={generateEditImage}
          />
        </div>}
      </div>
    </div>
  );
}

export default App;
