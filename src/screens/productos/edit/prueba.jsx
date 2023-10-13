import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const EditProductScreen = () => {

  const navigate = useNavigate();
    const token = useSelector((state)=>state.userData.token);
   const loading = useSelector((state)=>state.loading.isLoading);

  const [produData, setProduData]=React.useState(null);
  const [selectedProductId, setSelectedProductId] = React.useState(null);
  // const [selectedProductInfo, setSelectedProductInfo] = React.useState(null);
  const [form, setForm] = React.useState({})


  //con esta funcion puedo recibir el id para cambiarlo en mi base de datos mediante un metodo PUT
  const handleChange = (e) => {
    const {name, value} = e.target;
    setSelectedProductId(value);
    // dispatch(setClientDataAction(value)) /pero puedo acceder al value pa pasarlo como el id q quiero actualizar
}

  

const getproduc = async () => { 
  console.log("mostrando base url", BASE_URL)
  // dispatch(setLoading(true))
  try {
      const {data} = await axios({
          method: 'GET',
          url: BASE_URL+'/products'+selectedProductId,
          headers: {
              'Content-Type': 'application/json',
              'authorization': token
          }
      });
      // dispatch(setLoading(false))
      console.log("mostrando informacion de prdoductos", data);
      setProduData(data);    
  } catch (error) {
      // dispatch(setLoading(false))
      console.log("se ha presentado un error", error);
  }
}
  const handleProductInfoChange = (e) => {
  setForm({...form, [e.target.name]:e.target.value})
}

const handleSubmit = async (e) => {
  console.log("mostrando token", token)
  if(form && Object.keys(form).length > 0 && typeof(form) == 'object'){
      try {
          const result = await axios({
              method: 'PUT',
              url: BASE_URL + '/products',
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': token
              },
              data: form,
          })
          navigate("/productos")
      } catch (error) {
          console.log("se ha presentado un error", error)
      }
  }else{
      alert("formulario invalido")
  }
  
}
React.useEffect(()=>{
    getproduc()
},[])

  return(
    
    <>
    <Row>
    <Card>
    <Card.Body>
        <Card.Title>Elegir Producto a editar</Card.Title>
        {produData &&
        <select className='form-control' name="producto"  onChange={(e)=>handleChange(e)}>
        <option>Elegí un producto pues</option>
                    {produData.map((data, index)=>{
         return( <option key={index} value={data.id}> {data.name} </option> )
                    })}
        </select>
}
</Card.Body>
        </Card>
    </Row>

    <Row>
  {selectedProductId && (
    <Card>
      <Card.Body>
        <Card.Title>Editar Producto</Card.Title>
        {/* <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Nombre del Producto:
          </label>
          <input type="text" className="form-control" id="productName" name="productName" value={selectedProductId.name} onChange={(e) => handleProductInfoChange(e)}
          />
        </div> */}
        {/* Otros campos para editar (precio, descripción, etc.) */}
        <div className="mb-3">
                        <label>Nombre Producto</label>
                        <input type="text" className="form-control" name="name" onBlur={(e)=>handleProductInfoChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label>Precio</label>
                        <input type="number" className="form-control" name="price" onBlur={(e)=>handleProductInfoChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-success" disabled={loading} onClick={()=>handleSubmit()}>{loading ? 'Cargando...' : 'Enviar'}</button>
                    </div>
      </Card.Body>
    </Card>
  )}
</Row>





    
    </>
  
        )
    }
    
    export default EditProductScreen;