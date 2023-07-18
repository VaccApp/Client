import "./QRreader.css";
import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import QRform from "../../components/QRform/QRform";

function QRreader() {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("");

  const handleScan = (data) => {
    setResult(data?.text);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  if (result !== null) {
    console.log("Result", result);
  }

  // console.log("Objeto", typeof JSON.parse(JSON.stringify(result ?? '')));

  return (
    <div className="saveBottom">
      <h1>Escanea el código QR</h1>
      <QrReader
        className="qr-reader"
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result && result}</p>

      <QRform result={result} />
      <aside>*Powered by VaccApp</aside>
    </div>
  );
}

export default QRreader;
