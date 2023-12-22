import { useState } from "react";
import Modal from "./components/Modal";

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);

  const uploadImage = async(e) => {

    console.log(e.target.files[0]);

    const formatData = new FormData();
    formatData.append('file', e.target.files[0]);
    setSelectedImage(e.target.files[0]);

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

  return (
    <div className="app">
      <section className="prompt-section">
        <p>Give a detailed description</p>
        <div className="input-container">
          <input 
            placeholder="An impression oil painting of a sunflower in a purple vase..."
          />
          <button>Edit</button>
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
          <Modal />
        </div>}
      </section>
    </div>
  );
}

export default App;
