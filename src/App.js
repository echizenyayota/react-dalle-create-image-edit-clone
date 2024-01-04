const App = () => {

  const uploadImage = () => {
    
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
