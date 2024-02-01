import "./App.css";
import { CalculadoraGato } from "./portfolio/CalculadoraGato";
import { Fruteria } from "./portfolio/Fruteria";
import { TalesOf } from "./portfolio/TalesOf";
import texto_ingles from "./utils/text_english";
import texto_frances from "./utils/text_french";
import texto_español from "./utils/text_spanish";
import { useState } from "react";

function App() {
  let arrayImagenes = [
    "js",
    "ai",
    "bootstrap",
    "git",
    "gitlab",
    "html",
    "id",
    "js",
    "ks",
    "materialUI",
    "mysql",
    "node",
    "processing",
    "ps",
    "react",
    "sap",
    "sass",
    "suite",
    "terminal",
  ]
  let array = [
    "catCulator",
    "talesOf",
    "fruteria",
    "catCulator",
    "talesOf",
    "fruteria",
    "catCulator",
    "talesOf",
    "fruteria",
    "catCulator",
    "talesOf",
    "fruteria",
    "catCulator",
    "talesOf",
    "fruteria",
    "catCulator",
    "talesOf",
    "fruteria",
    "catCulator",
    "talesOf",
    "fruteria",
    "catCulator",
    "talesOf",
    "fruteria"
  ]
  const [texto, settexto] = useState(texto_español);
  const [idioma, setidioma] = useState(0);
  const [numeroPequeño, setnumeroPequeño] = useState(0);
  const [numeroGrande, setnumeroGrande] = useState(4);
  const [zoom, setZoom] = useState(-1);
  const [numeroElegido, setNumeroElegido] = useState(-1)
  const [portFolioElegido, setPortFolioElegido] = useState("")
  const cambiarIdioma = (numero) => {
    setidioma(numero);
    if (numero === 0) {
      settexto(texto_español);
    }
    if (numero === 1) {
      settexto(texto_ingles);
    }
    if (numero === 2) {
      settexto(texto_frances);
    }
  };
  const adelante = () => {
    if (numeroGrande < array.length - 1) {
      setnumeroPequeño(numeroPequeño + 1);
      setnumeroGrande(numeroGrande + 1);
    }
    if (numeroGrande >= array.length - 1) {
      setnumeroPequeño(0);
      setnumeroGrande(4);
    }
  };
  const atras = () => {
    if (numeroPequeño > 0) {
      setnumeroPequeño(numeroPequeño - 1);
      setnumeroGrande(numeroGrande - 1);
    }
    if (numeroPequeño <= 0) {
      setnumeroPequeño(array.length - 5);
      setnumeroGrande(array.length - 1);
    }
  };
  const cambiarArray = (numero) => {
    setnumeroPequeño(numero * 5);
    setnumeroGrande((numero + 1) * 5 - 1);
    if (Math.floor(array.length / 5) === numero) {
      setnumeroPequeño(array.length - 5)
      setnumeroGrande(array.length)
    }
  };
  const hacerZoom = (numero) => {
    setZoom(zoom === numero ? -1 : numero)
  };
  return (
    <div className="App">
      <header>
        <button onClick={() => cambiarIdioma(0)}>Español</button>
        <button onClick={() => cambiarIdioma(1)}>English</button>
        <button onClick={() => cambiarIdioma(2)}>Français</button>
      </header>
      <main>
        <section id="presentacion">
        {texto.presentacion}
          <div className="quienSoy">{texto.quienSoy}</div>
        </section>
        <div className="masSobreMi">{texto.masSobreMi}</div>
        <section id="programas">
          <h2 className="tecnologias">{texto.tecnologias}</h2>
          <div className="logos">
            {arrayImagenes.map((elem, index) => {
              return (
                <div key={index} className={`logo logo${index + 1}`}>
                  {" "}
                  <img src={`./images/logos/${elem}.png`} alt={`${elem}`} />
                </div>
              );
            })}
          </div>
        </section>
        <section id="portfolio">
          <h2 className="portfolio">Portfolio</h2>
          <a href={`./documents/${texto.idiomaCV}.pdf`}>{texto.cv}</a>
          <div className={`carrusel ${zoom !== -1 ? "carruselZoom" : ""}`}>
            <button onClick={() => { atras(); setZoom(-1) }}>◀️</button>
            {array.map((elem, index) => {
              if (index >= numeroPequeño && index <= numeroGrande) {
                return (
                  <div key={index} className={`carruselElemento ${zoom === index ? "zoom" : ""}`}>
                    <img
                      onClick={() => { hacerZoom(index); console.log() }}
                      className={`elegir`}
                      src={`./images/portfolio/${elem}.png`}
                      alt=""
                    />
                    {index === zoom && <button onClick={() => { setNumeroElegido(index); setPortFolioElegido(elem) }} className="botonVerMas">ver más</button>}
                  </div>
                );
              }
            })}
            <button onClick={() => { adelante(); setZoom(-1) }}>▶️</button>
          </div>
          <div className="secciones">
            {Array(Math.ceil(array.length / 5))
              .fill()
              .map((_, index) => (
                <button
                  onClick={() => { cambiarArray(index); setZoom(-1) }}
                  key={index}>⭕</button>
              ))}
          </div>
          {portFolioElegido === "talesOf" && <TalesOf></TalesOf>}
          {portFolioElegido === "catCulator" && <CalculadoraGato></CalculadoraGato>}
          {portFolioElegido === "fruteria" && <Fruteria></Fruteria>}
        </section>
        <section className="contacto">
         {texto.contacto}
          <div className="contenedorFormulario">
            <div className="formulario">
              <p>{texto.textoContacto}</p>
              <label htmlFor="">{texto.formularioNombre}</label>
              <input type="text" id="nombre" />
              <label htmlFor="">{texto.formularioTelefono}</label>
              <input type="telefono" id="telefono" />
              <label htmlFor="">E-mail</label>
              <input type="email" id="email" />
              <label htmlFor="">{texto.formularioMensaje}</label>
              <textarea name="comentario" id="comentario" cols="30" rows="10"></textarea>
              <button>{texto.enviar}</button>
            </div>
          </div>
        </section>
      </main>
      <footer>
        Roque Pérez
        Portfolio
        2023©
      </footer>
    </div>
  );
}

export default App;
