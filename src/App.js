import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  //javascript como lo conocemos
  //después del return va codigo jsx (mismo html pero con algunas variaciones)
  //es con camelleCase
  //Si voy a dejar vacio el return entonces debo poner etiquetas de apertura y cierre:<></>
  //el class del html ya seria className
  //el for de html ya pasa ser htmlFor
  //los saltos de linea en react tienen q ser autocontenidos <br/> en html es asi: <br> y ya con eso da.
  //al hacer una arrow function dentro del boton automaticamente se evita la propagacion de un evento
  //los eventos en react se escriben iniciando con on y en camellCase
  //4formas de evitar propagacion de eventos en funciones:
  const darclick=(e)=>{
    e.preventDefault();//de esta manera es q evito la propagación de eventos
    alert ("harold dio click")
  }
  const darclick2=()=>{
    alert ("arold do ck")
  }
  const darclick3=(e,eleSring)=>{
    console.log("mostrando evento del DON",e)
    alert ("jaro undiodo")
  }
  //esta 4ta es la más utilizada al parecer:
  const undircambio=(ev)=>{
    console.log("mostrando evento del DON",ev)
    const{name,value}=ev.target;//name y value son pdes del evento y asi laas obtengo
    console.log("mostrando nombre",name)
    console.log("mostrando valor",value)
    setDataForm(value)//dentro del parentesis le estoy cargando el valor q va tener de ahora en adelante 
    //es como si yo dijera dataform=value
    alert ("gay")
  }
 
  //creando un hook:permite usar caracteristicAs del estado y del ciclo de vida de un componente de react 
  //los hooks permiten cambiar los estados de mi aplicación. Los estados son vbles en las q yo guardo cualquier tipo de dato 
  //Mi primer hook:
  const [dataForm,setDataForm]=React.useState(null);
  //otro hook:
  const [edad,setEdad]=React.useState(null);
  //Sintaxis del ciclo de vida:
  //con dependencias:
  React.useEffect(()=>{
    //tod lo q esta aqui a dentro se va ejecutar una sola vez cuando se reenderiza, sin importar si eso de arriba cambió de estado pq le estoy pasando un array de dependencias vacio
    //puedo invocar fncs vbles o llamados a apis externas
    
  },[])

  //sin dependencias:React.useEffect(()=>{})
  //el react use efect solo se ejecuta cuando el componente ya está reenderizado. 
  React.useEffect(()=>{
    //al no tener dependencias se ejecuta cada q tengo un cambio de estado, "se va quedar escuchando todo el tiempo"
    //pero cuando se le pasa una dependecia se va ejecutar una vez al montaje y luego lo hará por cada cambio que encuentre en las dependencias 
    //al cargar el saludo aparece dos veces, pero eso lo explica en el video quitando el modo estricto algo asi. 
    if(edad){
      saludar()
    }
    //ahora la fase de terminación o desmontaje, se ejecuta cada vez que hay un cambio de estado. Tecnicamente react tiene q volver a renderizar todo 
    //y cuando renderiza tiene q volver a pasar por la ultima fase q es la fase de desmontaje. sería:
    return()=>{
      alert("hola")
    }
  },[edad])
  //
  const saludar=()=>{
    console.log("harol te saluda y te come el pito ")
  }


  return (
    <>
    soy jarol y este es el valor de mi jugo o hok no se: {dataForm}
    <div className="formulario">
      <label htmlFor="">leva</label>
      <input type="text" name="nombre" id="nombre" onBlur={(ev)=>undircambio(ev)}/>
    </div>
    <div className="formulario">
      <label htmlFor="">ledad</label>
      <input type="text" name="nombre" id="nombre" onBlur={(eve)=>setEdad(eve.target.value)}/>
    </div>
    <button type='button' onClick={darclick}>dame click</button>
    <button type='button' onClick={()=>darclick2()}>dale click2</button>
    <button type='button' onClick={(e)=>darclick3(e,"hola gay")}>dale click2</button>
    </>
    
  );
}

export default App;
