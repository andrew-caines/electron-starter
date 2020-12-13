import logo from './logo.svg';
import './App.css';
const ipcRenderer = window.ipcRenderer;
function App() {

  const handleClick = (drive) => {
    //Do something that is goign to send back to main electron
    //ipcRenderer.send  to send 
    //ipcRenderer.on to recieve
    console.log(`Button clicked with Drive of: ${drive}`)
    ipcRenderer.send('drive:selected', drive);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Directory Scanner v1.0
        </p>
        <button onClick={() => handleClick("c:\\")}>Select C:\</button>
          Learn React
      </header>
    </div >
  );
}

export default App;
