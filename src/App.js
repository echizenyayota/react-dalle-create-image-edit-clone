import { useState } from "react";

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const uploadImage = async(e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setSelectedImage(e.target.files[0]);

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

  return (
    <div className="app">
      <div className="upload-image">
        <span>
          <label htmlFor="files">Upload an image </label>
          <input onChange={uploadImage} id="files" accept="imgae/*" type="file" hidden />
          to edit.
        </span>
      </div>
    </div>
  );
}

export default App;
