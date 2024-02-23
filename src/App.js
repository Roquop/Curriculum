import "./App.css";
import { CalculadoraGato } from "./portfolio/CalculadoraGato";
import { Fruteria } from "./portfolio/Fruteria";
import { TalesOf } from "./portfolio/TalesOf";
import texto_ingles from "./utils/text_english";
import texto_frances from "./utils/text_french";
import texto_español from "./utils/text_spanish";
import { useState, useEffect } from "react";

function App() {
  let arrayImagenes = [
    "js",
    "ai",
    "bootstrap",
    "git",
    "gitlab",
    "html",
    "id",
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
  const [numeroCarrusel, setNumeroCarrusel] = useState(3)
  const [width, setWidth] = useState(0)
  const [profesion, setProfesion] = useState(1)

  useEffect(() => {
    const currentWidth = () => {
      const widthPantalla = document.body.clientWidth;
      console.log(widthPantalla)
      setWidth(widthPantalla)
    }
    window.addEventListener("resize", currentWidth)
    if (document.body.clientWidth <= 600) {
      setNumeroCarrusel(3);
      setnumeroGrande(2)
    }
    else {
      setNumeroCarrusel(5);
      setnumeroGrande(4)
    }
    return () => {
      window.removeEventListener("resize", currentWidth)
    }
  }, [document.body.clientWidth])

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (profesion === 1) {
        setProfesion(2);
      } else if (profesion === 2) {
        setProfesion(3);
      } else if (profesion === 3) {
        setProfesion(1);
      }
    }, 2000); // Cambia cada 2 segundos
    return () => clearInterval(intervalo);
  }, [profesion]);

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
    if (numeroGrande >= array.length - 1 && width > 600) {
      setnumeroPequeño(0);
      setnumeroGrande(4);
    } else if (numeroGrande >= array.length - 1 && width < 600) {
      setnumeroPequeño(0);
      setnumeroGrande(2);
    }
  };
  const atras = () => {
    if (numeroPequeño > 0) {
      setnumeroPequeño(numeroPequeño - 1);
      setnumeroGrande(numeroGrande - 1);
    }
    if (numeroPequeño <= 0) {
      setnumeroPequeño(array.length - numeroCarrusel);
      setnumeroGrande(array.length - 1);
    }
  };
  const cambiarArray = (numero) => {
    setnumeroPequeño(numero * numeroCarrusel);
    setnumeroGrande((numero + 1) * numeroCarrusel - 1);
    if (Math.floor(array.length / numeroCarrusel) === numero) {
      setnumeroPequeño(array.length - numeroCarrusel)
      setnumeroGrande(array.length)
    }
  };
  const hacerZoom = (numero) => {
    setZoom(zoom === numero ? -1 : numero)
  };


  return (
    <div className="App">
      <header>
        <button onClick={() => cambiarIdioma(0)}><img src="./images/logos/flag_ES.png"></img></button>
        <button onClick={() => cambiarIdioma(1)}><img src="./images/logos/flag_EN.png"></img></button>
        <button onClick={() => cambiarIdioma(2)}><img src="./images/logos/flag_FR.png"></img></button>
      </header>
      <main>
        <section id="presentacion">
          <article id="portada">
            <h1>Roque&nbsp;P.</h1>
            {profesion === 1 && <h2>{texto.profesion1}</h2>}
            {profesion === 2 && <h2>{texto.profesion2}</h2>}
            {profesion === 3 && <h2>{texto.profesion3}</h2>}
          </article>
          <article id="img_portada"></article>
        </section>
        <section id="sobreMi">
          <div className="quienSoy">{texto.quienSoy}</div>
          {/* <div className="masSobreMi">{texto.masSobreMi}</div> */}
        </section>
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
        <section id="descarga_cv">
          <a href={`./documents/${texto.idiomaCV}.pdf`}>{"👉\u00A0\u00A0" + texto.cv + "\u00A0\u00A0👈"}</a>
        </section>
        <section id="portfolio">
          <h2>Portfolio</h2>
          <div className={`carrusel ${zoom !== -1 ? "carruselZoom" : ""}`}>
            {zoom === -1 && <button onClick={() => { atras(); setZoom(-1) }}>◀️</button>}
            <div className="list">
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
                      {index === zoom && <button onClick={() => { setNumeroElegido(index); setPortFolioElegido(elem); hacerZoom(index) }} className="botonVerMas">ver más</button>}
                    </div>
                  );
                }
              })}
            </div>
            {zoom === -1 && <button onClick={() => { adelante(); setZoom(-1) }}>▶️</button>}
          </div>
          {zoom === -1 && <div className="secciones">
            {Array(Math.ceil(array.length / numeroCarrusel))
              .fill()
              .map((_, index) => (
                <button
                  onClick={() => { cambiarArray(index); setZoom(-1) }}
                  key={index}>{index + 1}</button>
              ))}
          </div>}
          {portFolioElegido === "talesOf" && <TalesOf>{setPortFolioElegido}</TalesOf>}
          {portFolioElegido === "catCulator" && <CalculadoraGato>{setPortFolioElegido}</CalculadoraGato>}
          {portFolioElegido === "fruteria" && <Fruteria>{setPortFolioElegido}</Fruteria>}
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
