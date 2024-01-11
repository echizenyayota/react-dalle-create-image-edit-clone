import { useEffect, useState } from "react";
import Modal from "./components/Modal";

const App = () => {

  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [filePath, setFilePath] = useState(null);

  const uploadImage = async(e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);

    try {
      const options = {
        method: "POST",
        body: formData,
      }
      const response = await fetch('http://localhost:8000/upload', options);
      const data = await response.json();
      console.log('Upload response:', data); // レスポンス内容をログに出力

      if (data.filePath) {
        setFilePath(data.filePath);
      } else {
        console.error('File path is missing in the response');
      }

    } catch(error) {
      console.error(error);
    }
  }

  const generateEditImage = async () => {

    if (!filePath) {
      console.error('File path is not set.');
      return;
    }
  
    try {

      const requestBody = {
        message: "Make the background in the picture a beach",
        filePath: filePath, // ここでファイルパスを含める
      };

      console.log('Edit image request:', requestBody); 
      const options = {
        method: "POST",
        // body: "Make the background in the picture a busy street",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json"
        },
      };
      const response = await fetch('http://localhost:8000/editImage', options);
      const data = await response.json();
      console.log(data);
      setImages(data.url);
      setError(null);
      setModalOpen(false);
    } catch(error) {
      console.error(error);
    }
  }

  const fetchImageUrl = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: "Make the background in the picture a beach",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch('http://localhost:8000/editImage', options);
      const data = await response.json();
      console.log('Response data:', data); 
      setImageUrl(data.imageUrl);
      console.log(data.imageUrl);
    } catch(error) {
      console.error('Error fetching image URL:', error)
    }
  }
  useEffect(() => {
    fetchImageUrl();
  }, []);

  return (
    <div className="app">
      <div className="upload-image">
        <span>
          <label htmlFor="files">Upload an image </label>
          <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
          to edit.
        </span>
        <div className="edit-image">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Edited Image"
              onError={() => console.error('Error loading image:', imageUrl)}
            />
          )}
        </div>
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
