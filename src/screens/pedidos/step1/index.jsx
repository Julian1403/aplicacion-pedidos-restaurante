import React from 'react';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux';
import { Row, Col,Card} from 'react-bootstrap';
import { setClientDataAction } from '../../../redux/slices/pedidosStore';
import { useNavigate } from 'react-router-dom';

//en el paso 1 se va elegir el cliente mediante un select
const Step1Pedidos = ({setStep}) => {

    const dispatch =useDispatch();//va con parentesis
    const navigate=useNavigate();
    const token = useSelector((state)=>state.userData.token);

    const [clientData, setClientData]=React.useState(null);
   

    const getClients = async () => { 
        console.log("mostrando base url", BASE_URL)
        try {
            const {data} = await axios({
                method: 'GET',
                url: BASE_URL+'/customers',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            });
            console.log("mostrando informacion de clientes", data);
            setClientData(data);    
        } catch (error) {
            console.log("se ha presentado un error", error);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setClientDataAction(value))
    }

    React.useEffect(()=>{
        getClients()
    },[]) //se renderiza una mera vez en montaje, segun harol si agrego el setStep, se renderiza cada q haya un cambio y asi va persistir mi elección
    
    return(
        <>
        <Row>
        <Card>
        <Card.Body>
            <Card.Title>Elegir Cliente</Card.Title>
            {clientData &&
            <select className='form-control' name="cliente"  onChange={(e)=>handleChange(e)}>
            <option hidden>Elegí un cliente pues</option>
                        {clientData.map((data, index)=>{
             return( <option key={index} value={data.id}> {data.name} _ {data.lastName}</option> )
                        })}
            </select>
    }
    </Card.Body>
            </Card>
        </Row>

<Row className="d-flex mt-2">
    <Col className="d-flex justify-content-start">
    <button type="button" className="btn btn-warning" onClick={()=>navigate("/dashboard")}>Atras</button>
    </Col>
    <Col className="d-flex justify-content-end">
    <button type="button" className="btn btn-info" onClick={()=>setStep(2)}>Siguiente</button>
    </Col>
</Row>


        </>
    )
}

export default Step1Pedidos;