import logo from './logo.svg';
import './App.css';
import axios from 'axios';

var secugen_lic = ""; 

function App() {

  const fingerPrintScanner = () => {
    CallSGIFPGetData(SuccessFunc, failFun)
  }

  const SuccessFunc = (result) => {
    if (result != null && result.BMPBase64.length > 0) {
        document.getElementById("FPImage1").src = "data:image/bmp;base64," + result.BMPBase64;
    }
  }

  const failFun = (error) => {
    alert("Check if SGIBIOSRV is running; Status = " + error + ":");
  }

  const CallSGIFPGetData = (successCall, failCall) => {
    // 8.16.2017 - At this time, only SSL client will be supported.
    var uri = "https://localhost:8443/SGIFPCapture";

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var fpobject = JSON.parse(xmlhttp.responseText);
            successCall(fpobject);

            console.log(fpobject);

        }
        else if (xmlhttp.status == 404) {
            failCall(xmlhttp.status)
        }
    }
    
    var params = "Timeout=" + "10000";
    params += "&Quality=" + "50";
    params += "&licstr=" + encodeURIComponent(secugen_lic);
    params += "&templateFormat=" + "ISO";
    params += "&imageWSQRate=" + "0.75";
    xmlhttp.open("POST", uri, true);
    xmlhttp.send(params);

    xmlhttp.onerror = function () {
        failCall(xmlhttp.statusText);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img id='FPImage1' src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>


        
        
        <button onClick={
          () => fingerPrintScanner()
        }>
         Scan fingerprint
        </button>
        
      </header>
    </div>
  );
}

export default App;
