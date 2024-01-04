import { useState } from "react";

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setSelectedImage(e.target.files[0]);
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
