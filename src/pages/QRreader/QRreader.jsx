import "./QRreader.css";
import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import QRform from "../../components/QRform/QRform";

function QRreader() {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("No result");

  const handleScan = (data) => {
    setResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  if (result !== null) {
    console.log("Objeto", result.text);
  }

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
      <p>{result !== null && result.text}</p>

      <QRform result={result} />
      <aside>*Powered by VaccApp</aside>
    </div>
  );
}

export default QRreader;
