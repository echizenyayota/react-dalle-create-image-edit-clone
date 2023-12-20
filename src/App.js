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
      <section className="prompt-section"></section>
    </div>
  );
}

export default App;
