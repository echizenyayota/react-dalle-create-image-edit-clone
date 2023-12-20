const App = () => {

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
            <input id="files" accept="image/*" type="file" hidden />
            to edit.
          </span>
        </p>

      </section>
    </div>
  );
}

export default App;
