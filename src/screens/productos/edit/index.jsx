import React, { useState, useEffect } from 'react';
import { Card, Row } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProductScreen = () => {

  const navigate = useNavigate();
  const token = useSelector((state) => state.userData.token);
  const loading = useSelector((state)=>state.loading.isLoading);
  const [productData, setProductData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedProductId(value);//aqui le pasé el id del producto que seleccioné para modificar
  };

  const handleProductInfoChange = (e) => {
    const { name, value } = e.target;//el value es el valor ingresado por teclado en este caso. 
    setForm({ ...form, [name]: value }); //ese name será name y price según sea el caso. 
  };

  const handleSubmit = async () => {
    if (selectedProductId && Object.keys(form).length > 0 && typeof(form) == 'object') {
      //form: Es el cuerpo de la solicitud. Contiene los datos que se enviarán al servidor para actualizar el producto. En este caso, se están enviando los datos del producto que el usuario ha modificado, como el nombre y el precio.
        try {
        const result = await axios.put(`${BASE_URL}/products/${selectedProductId}`, form, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        console.log('Producto actualizado:', result.data);
        navigate('/productos');
      } catch (error) {
        console.log('Error al actualizar el producto:', error);
      }
    } else {
      alert('Selecciona un producto y proporciona información para actualizar.');
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${BASE_URL}/products`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setProductData(data);
    } catch (error) {
      console.log('Error al obtener la lista de productos:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
       <Row>
    <Card>
    <Card.Body>
        <Card.Title>Elegir Producto a editar</Card.Title>
        {productData &&
        <select className='form-control' name="producto"  onChange={(e)=>handleChange(e)}  >
        <option hidden >Elegí un producto pues</option>
                    {productData.map((data, index)=>{
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
              <div className="mb-3">
                <label>Nombre Producto</label>
                <input type="text" className="form-control" name="name" onBlur={(e)=>handleProductInfoChange(e)} />
              </div>
              <div className="mb-3">
                <label>Precio</label>
                <input type="number" className="form-control" name="price" onBlur={(e)=>handleProductInfoChange(e)} />
              </div>
              <div className="mb-3">
              <button type="button" className="btn btn-success" disabled={loading} onClick={()=>handleSubmit()}>{loading ? 'Cargando...' : 'Enviar'}</button>
              </div>
              <div className="mb-3">
              <button type="button" className="btn btn-danger"  onClick={()=>navigate("/productos")}>Cancelar</button>
              </div>

            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
};

export default EditProductScreen;
