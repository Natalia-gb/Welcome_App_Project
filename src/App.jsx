import { useEffect, useState } from "react";
import "./App.css";
import { useLocalStorage } from "./Helpers/useLocalStorage";
import { ChildrenWeather } from "./Utils/ChildrenWeather";
import { ChildrenLink } from "./Utils/ChildrenLink";
import { ChildrenClock } from "./Utils/ChildrenClock";
import { ChildrenSearch } from "./Utils/ChildrenSearch";
import { ChildrenGreeting } from "./Utils/ChildrenGreeting";
import { ChildrenFocus } from "./Utils/ChildrenFocus";
import { ChildrenToDo } from "./Utils/ChildrenToDo";
import { ChildrenQuotes } from "./Utils/ChildrenQuotes";
import { Switch } from "./Utils/Switch";


function App() {

  // (Frase del día)
  const [quotes, setQuotes] = useState([]);

  // (Imágenes de fondo)
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);

  // ESTILOS
  const divApp = {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Neue Haas Grotesk Text Pro, Helvetica Neue, Helvetica, Arial, sans-serif",
    backgroundImage: loadingImage? "" : currentImage && `url(${currentImage.urls.regular})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    flexDirection: 'column',
    height: '800px',
    background: 'cover center no-repeat'
  };

  // Guardar en LocalStorage (Settings)
  const [checkedLink, setCheckedLink] = useLocalStorage("checkedLink", false);
  const [checkedSearch, setCheckedSearch] = useLocalStorage("checkedSearch", false);
  const [checkedWeather, setCheckedWeather] = useLocalStorage("checkedWeather", false);
  const [checkedClock, setCheckedClock] = useLocalStorage("checkedClock", false);
  const [checkedGreeting, setCheckedGreeting] = useLocalStorage("checkedGreeting", false);
  const [checkedFocus, setCheckedFocus] = useLocalStorage("checkedFocus", false);
  const [checkedTodo, setCheckedTodo] = useLocalStorage("checkedTodo", false);
  const [checkedQuotes, setCheckedQuotes] = useLocalStorage("checkedQuotes", false);

  // Activar/Desactivar widgets utilizando los estados del LocalStorage
  const activateWeather = () => setCheckedWeather(!checkedWeather);
  const activateLinks = () => setCheckedLink(!checkedLink);
  const activateClock = () => setCheckedClock(!checkedClock);
  const activateSearch = () => setCheckedSearch(!checkedSearch);
  const activateGreeting = () => setCheckedGreeting(!checkedGreeting);
  const activateFocus = () => setCheckedFocus(!checkedFocus);
  const activateTodo = () => setCheckedTodo(!checkedTodo);
  const activateQuotes = () => setCheckedQuotes(!checkedQuotes);

  useEffect(() => {
    fetch("https://api.unsplash.com/photos/random?client_id=T9hHJ7LInIvSdKpd-a8k4SVx68bNkfH3uI4z29HJz9Q&count=100")
      .then(response => response.json())
      .then(result => {setImages(result); setLoadingImage(false)})
      .catch(error => console.error("Error", error))
  }, []);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  }

  useEffect(() => {
    if (images.length > 0){
      getRandomImage();
      setLoadingImage(false);
    }
  }, [images]);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(response => response.json())
      .then(result => setQuotes(result.quotes))
      .catch(error => console.error("Error", error))
  }, []);


  return (
    <div className="App" style={divApp}>
      <div className="d-flex justify-content-between" style={{ height: "100px" }}>
        <div className="col col-6 text-start d-flex ms-1" style={{ marginTop: -55 }} id="top-left">
          <ChildrenLink disabledWidget={checkedLink} />
          <ChildrenSearch disabledWidget={checkedSearch} />
        </div>
        <div className="col col-6 text-end" id="top-right">
          <ChildrenWeather disabledWidget={checkedWeather} />
        </div>
      </div>

      <div className="d-flex justify-content-evenly w-100" style={{marginTop: -30}}>
        <div className="d-flex justify-content-center align-items-center col col-4 w-25 mt-5">
          <button className="btn btn-transparent text-light" style={{fontSize: 25, marginLeft: 70}} onClick={getRandomImage}>
            <i className="bi bi-arrow-left"></i>
          </button>
        </div>

          <div className="justify-content-center align-items-center text-light mt-5 col col-4 w-75" style={{ fontSize: 168, textAlign: "center" }}>
            <ChildrenClock disabledWidget={checkedClock} />
            <ChildrenGreeting disabledWidget={checkedGreeting} />
          </div>
        
        <div className="d-flex justify-content-center align-items-center col col-4 w-25 mt-5">
          <button className="btn btn-transparent text-light" style={{fontSize: 25, marginRight: 70}} onClick={getRandomImage}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>

        <div className="text-light">
          <ChildrenFocus disabledWidget={checkedFocus} />
        </div>

      {/* SETTINGS  */}
      
          <div className="col col-4 btn-group dropup bg-transparent text-start d-flex" id="bottom-left">
            <button type="button" className="btn btn-transparent border border-0 bg-transparent text-start text-light" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-gear-fill" style={{ fontSize: 20 }} id="settings_logo"></i>
            </button>
            <ul className="dropdown-menu" style={{width: 550, maxHeight: 580, opacity: 1, overflowY: 'auto', overflowX: 'hidden'}} id="ulSettings">
              <div className="text-light" id="article">
                <div className="m-3 text-light" id="divGeneral">
                  <p><a className="text-light" style={{ fontSize: 22, fontWeight: "bold" }} id="general">General</a></p>
                  <p className="text-secondary" style={{ fontSize: 14, backgroundColor: 'black' }}>Customize your dashboard</p>
                  <div className="list-group list-group-flush">
                    <p className="list-group-item text-light mb-1" style={{ fontSize: 14, fontWeight: "bold", backgroundColor: 'black' }}>SHOW</p>
                    <label className="list-group-item text-light mb-1 d-flex justify-content-between" style={{ fontSize: 16, backgroundColor: 'black' }}>
                      Links
                      <div className="form-check form-switch">
                        <Switch onChange={activateLinks} checked={checkedLink} />
                      </div>
                    </label>
                    <label className="list-group-item text-light mb-1 d-flex justify-content-between" style={{ fontSize: 16, backgroundColor: 'black' }}>
                      Search
                      <div className="form-check form-switch">
                        <Switch onChange={activateSearch} checked={checkedSearch} />
                      </div>
                    </label>
                    <label className="list-group-item text-light mb-1 d-flex justify-content-between" style={{ fontSize: 16, backgroundColor: 'black' }}>
                      Weather
                      <Switch onChange={activateWeather} checked={checkedWeather} />
                    </label>
                    <label className="list-group-item text-light mb-1 d-flex justify-content-between" style={{ fontSize: 16, backgroundColor: 'black' }}>
                      Clock
                      <div className="form-check form-switch">
                        <Switch onChange={activateClock} checked={checkedClock} />
                      </div>
                    </label>
                    <label className="list-group-item text-light mb-1 d-flex justify-content-between" style={{ fontSize: 16, backgroundColor: 'black' }}>
                      Greeting
                      <div className="form-check form-switch">
                        <Switch onChange={activateGreeting} checked={checkedGreeting} />
                      </div>
                    </label>
                    <label className="list-group-item text-light mb-1 d-flex justify-content-between" style={{ fontSize: 16, backgroundColor: 'black' }}>
                      Focus
                      <div className="form-check form-switch">
                        <Switch onChange={activateFocus} checked={checkedFocus} />
                      </div>
                    </label>
                    <label className="list-group-item text-light mb-1 d-flex justify-content-between" style={{ fontSize: 16, backgroundColor: 'black' }}>
                      Todo
                      <div className="form-check form-switch">
                        <Switch onChange={activateTodo} checked={checkedTodo} />
                      </div>
                    </label>
                    <label className="list-group-item text-light d-flex justify-content-between" style={{ fontSize: 16, backgroundColor: 'black' }}>
                      Quotes
                      <div className="form-check form-switch">
                        <Switch onChange={activateQuotes} checked={checkedQuotes} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </ul>
            
            <div id="photoInfo_container" style={{marginRight: 295}}>
              {currentImage && (
                <>
                  <p id="location" className="text-light mb-1" style={{fontSize: 13}}>{currentImage.location.name}</p>
                  <a id="user" href={`https://unsplash.com/es/fotos/${currentImage.id}`} target="_blank" className="text-light">{currentImage.user.name} / Unsplash</a>
                </>
              )}
            </div>
          </div>

        <div className="col col-4 text-center text-light" id="bottom-middle">
          <ChildrenQuotes disabledWidget={checkedQuotes} />
        </div>

        <div className="col col-4 text-end mt-5" id="bottom-right">
          <ChildrenToDo disabledWidget={checkedTodo} />
        </div>
      
    </div>
  );
}

export default App;
