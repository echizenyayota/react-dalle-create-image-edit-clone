import { useState } from "react";
import Modal from "./components/Modal";

const App = () => {

  const [error, setError] = useState(null);
  const [images, setImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const uploadImage = async (e) => {

    console.log(e.target.files[0]);

    const formatData = new FormData();
    formatData.append('file', e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);
    e.target.value = null;

    try {
      const options = {
        method: "POST",
        body: formatData,
      };
      const response = await fetch('http://localhost:8000/upload', options);
      const data = await response.json();
      console.log(data);
    } catch(err) {
      console.error(err);
    } 
  }

  const editImage = async () => {
    setImages(null);
    if (selectedImage === null) {
      setError("Error! Must have an existing image");
      setModalOpen(false);
      return;
    }

    try {
      const options = {
        method: "POST",
      }
      const response = await fetch('http://localhost:8000/edit_image', options);
      const data = await response.json();
      console.log(data);
      setImages(data);
      setError(null);
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="app">
      <section className="prompt-section">
        <p>Give a detailed description</p>
        <div className="input-container">
          <input 
            placeholder="An impression oil painting of a sunflower in a purple vase..."
          />
          <button onClick={editImage}>Edit</button>
        </div>
      </section>
      <section className="image-section">
        <p className="upload-image">
          <span>
            <label htmlFor="files">Upload an image </label>
            <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
          </span>
          to edit.
        </p>
        {modalOpen && <div className="overlay">
          <Modal
            setModalOpen={setModalOpen}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
          />
        </div>}
      </section>
    </div>
  );
}

export default App;
