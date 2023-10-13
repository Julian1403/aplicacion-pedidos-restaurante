import React from 'react';
import { BASE_URL } from '../../../config';
import axios from 'axios';
//debo importar las acciones:
import { setAddProductAction } from '../../../redux/slices/pedidosStore';
import { useSelector, useDispatch} from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import './index.css';  



//en el paso 2 se van a elegir los pedidos(como un agregar)

const Step2Pedidos = ({setStep}) => {

//ignore
    const [isClicked, setIsClicked] = React.useState(false);

  const handleButtonClick = () => {
    // Cambia el estado al hacer clic
    setIsClicked(true);

    // Establece un temporizador para volver al estado original después de un tiempo
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };
//   const buttonClass = isClicked ? 'btn btn-success clicked' : 'btn btn-success';
//ignore hasta aca


    const [productData, setProductData]=React.useState(null);
    const dispatch =useDispatch();
    const token = useSelector((state)=>state.userData.token);

    //obtener los productos disponibles 
    
    const getProducts = async () => { 
        console.log("mostrando base url", BASE_URL)
    try {
        const {data} = await axios({
            method: 'GET',
            url: BASE_URL+'/products',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
        console.log("mostrando informacion de productos", data);
        setProductData(data);    
    } catch (error) {
        console.log("se ha presentado un error", error);
    }
}
const handleAddProduct = (data) => {
    dispatch(setAddProductAction(data))
}
React.useEffect(()=>{
    getProducts()
},[])//se renderiza meramente una vez cuando se monta

return(
    <>
    <Row className="mt-5">
            <Col lg={6} className="offset-3">
    <Row>
    <Card>
    <Card.Body>
        <Card.Title>Seleccione los productos pa</Card.Title>
        {productData && <Row>{productData.map((data, index)=>{
            return(
                            <Col lg={3} key={index}>
                                <Card>
                                <Card.Title>{data.name}</Card.Title>
                                <b>Precio: </b><p>{data.price}</p>
                                <Card.Footer>
                                <button type="button" className={isClicked ? 'clicked' : 'btn btn-success'} onClick={()=>handleAddProduct(data)}>+</button>
                                </Card.Footer>
                            </Card>
                            </Col>
                        )
                    })}
                    </Row>
                }
                  </Card.Body>
        </Card>
            </Row>
            <Row className="d-flex mt-2">
                <Col className="d-flex justify-content-start">
                <button type="button" className="btn btn-warning" onClick={()=>setStep(1)}>Atras</button>
                </Col>
                <Col className="d-flex justify-content-end">
                <button type="button" className="btn btn-info" onClick={()=>setStep(3)}>Siguiente elecion</button>
                </Col>
            </Row>

            </Col>
    </Row>
    </>
)
}

export default Step2Pedidos;