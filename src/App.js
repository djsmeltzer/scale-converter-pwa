import React, {useState} from 'react';
import './App.css';

function App() {


  const mmToIn = 0.03937;
  const inToMm = 25.4;
  const scaleFactor = 160.0;
  const [scaleMM, setScaleMM] = useState(0);
  const [scaleIn, setScaleIn] = useState(0);
  const [scaleFeet, setScaleFeet] = useState(0);
  const [protoMM, setProtoMM] = useState(0);
  const [protoIn, setProtoIn] = useState(0);
  const [protoFeet, setProtoFeet] = useState(0);
  const [error, setError] = useState();
  const [scaleInFraction, setScaleInFraction] = useState()
  const [protoInFraction, setProtoInFraction] = useState()

  const calcFraction = (decimalInches) => {
    // Calulate to the nearest 32nd inch
    let wholePart = Math.floor(decimalInches)
    let fractionPart = decimalInches - wholePart

    let numerator = Math.round(fractionPart * 32)
    let denominator = 32.0

    if (numerator === 0) {
      return ""
    }
    
    // if numerator is even, can be simplified
    while (numerator % 2 === 0 && numerator !== 0) {
      numerator /= 2
      denominator /= 2
    }

    if (denominator === 1) {
      return ""
    }

    return wholePart + " " + numerator + "/" + denominator + "\""
    
  }

  const updateFields = (target, value) => {

    if (!isFinite(value)) {
      setError('Please use only numbers')
      return
    }

    let scaleIn = 0
    let protoIn = 0

    switch(target) {
      case "scaleMM":
        //scaleMM
        setScaleMM(value)
        //scaleIn
        setScaleIn(value * mmToIn)
        scaleIn = value * mmToIn
        //scaleFeet
        setScaleFeet((value * mmToIn)/12.0)
        //protoMM
        setProtoMM(value * scaleFactor)
        //protoIn
        setProtoIn(value * mmToIn * scaleFactor)
        protoIn = value * mmToIn * scaleFactor
        //protoFeet
        setProtoFeet(((value * mmToIn)/12.0) * scaleFactor)
        break;
      case "scaleIn": 
        //scaleMM
        setScaleMM(value * inToMm)
        //scaleIn
        setScaleIn(value)
        scaleIn = value
        //scaleFeet
        setScaleFeet(value/12.0)
        //protoMM
        setProtoMM(value * inToMm * scaleFactor)
        //protoIn
        setProtoIn(value * scaleFactor)
        protoIn = value * scaleFactor
        //protoFeet
        setProtoFeet((value / 12.0) * scaleFactor)
        break;
      case "scaleFeet":
        //scaleMM
        setScaleMM(value * 12.0 * inToMm)
        //scaleIn
        setScaleIn(value * 12.0)
        scaleIn = value * 12.0
        //scaleFeet
        setScaleFeet(value)
        //protoMM
        setProtoMM(value * 12.0 * inToMm * scaleFactor)
        //protoIn
        setProtoIn(value * 12.0 * scaleFactor)
        protoIn = value * 12.0 * scaleFactor
        //protoFeet
        setProtoFeet(value * scaleFactor)
        break;
      case "protoMM":
        //scaleMM
        setScaleMM(value / scaleFactor)
        //scaleIn
        setScaleIn((value * mmToIn ) / scaleFactor)
        scaleIn = (value * mmToIn ) / scaleFactor
        //scaleFeet
        setScaleFeet(((value * mmToIn)/12.0) / scaleFactor)
        //protoMM
        setProtoMM(value)
        //protoIn
        setProtoIn(value * mmToIn)
        protoIn=value * mmToIn
        //protoFeet
        setProtoFeet((value * mmToIn) / 12.0)
        break;
      case "protoIn":
        //scaleMM
        setScaleMM((value * inToMm) / scaleFactor)
        //scaleIn
        setScaleIn(value / scaleFactor)
        scaleIn = value / scaleFactor
        //scaleFeet
        setScaleFeet((value / 12.0) / scaleFactor)
        //protoMM
        setProtoMM(value * inToMm)
        //protoIn
        setProtoIn(value)
        protoIn = value
        //protoFeet
        setProtoFeet(value / 12.0)
        break;
      case "protoFeet":
        //scaleMM
        setScaleMM((value * 12.0 * inToMm) / scaleFactor)
        //scaleIn
        setScaleIn((value * 12.0) / scaleFactor)
        scaleIn = (value * 12.0) / scaleFactor
        //scaleFeet
        setScaleFeet(value / scaleFactor)
        //protoMM
        setProtoMM(value * 12.0 * inToMm)
        //protoIn
        setProtoIn(value * 12.0)
        protoIn=value * 12.0
        //protoFeet
        setProtoFeet(value)
        break;
      default:
        console.warn("Improper target used: ", target)
    }

    setScaleInFraction(calcFraction(scaleIn))
    setProtoInFraction(calcFraction(protoIn))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>N Scale Unit Conversion Tool</h1>
      </header>
      <section className="conversionForm">
        <fieldset>
          <legend>Prototype Size</legend>

          <label htmlFor="protoMMInput">Millimeters</label>
          <input id="protoMMInput" type="number" onFocus={(evt) => evt.target.select()} onChange={(e) => {updateFields('protoMM', e.target.value)}} value={protoMM} />

          <section className="fractionLabel">
            <label htmlFor="protoInInput">Inches</label>
            <span className="fraction">{protoInFraction}</span>
          </section>
          <input id="protoInInput" type="number" onFocus={(evt) => evt.target.select()} onChange={(e) => {updateFields('protoIn', e.target.value)}} value={protoIn} /> 

          <label htmlFor="protoFtInput">Feet</label>
          <input id="protoFtInput" type="number" onFocus={(evt) => evt.target.select()} onChange={(e) => {updateFields('protoFeet', e.target.value)}} value={protoFeet} />
        </fieldset>

        <fieldset>
          <legend>Scale Size</legend>

          <label htmlFor="scaleMMInput">Millimeters</label>
          <input id="scaleMMInput" type="number" onFocus={(evt) => evt.target.select()} onChange={(e) => {updateFields('scaleMM', e.target.value)}} value={scaleMM}/>

          <section className="fractionLabel">
            <label htmlFor="scaleInInput">Inches</label>
            <span className="fraction">{scaleInFraction}</span>
          </section>
          <input id="scaleInInput" type="number" onFocus={(evt) => evt.target.select()} onChange={(e) => {updateFields('scaleIn', e.target.value)}} value={scaleIn} />
          
          <label htmlFor="scaleFtInput">Feet</label>
          <input id="scaleFtInput" type="number" onFocus={(evt) => evt.target.select()} onChange={(e) => {updateFields('scaleFeet', e.target.value)}} value={scaleFeet}/>
        </fieldset>
      </section>
      <section className="error">{error}</section>
    </div>
  );
}

export default App;
