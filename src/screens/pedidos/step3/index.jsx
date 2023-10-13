import React from 'react';
import { BASE_URL } from '../../../config';
import axios from 'axios';
//debo importar las acciones:
import { selectTableAction } from '../../../redux/slices/pedidosStore';
import { useSelector, useDispatch} from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';


//paso 3 se va elegir la mesa 
const Step3Pedidos = ({setStep}) => {

    const [tableData, setTableData]=React.useState(null);
    const dispatch =useDispatch();
    const token = useSelector((state)=>state.userData.token);
    

    //vamos a traernos las mesas que hay 

    const getTables = async () => { 
        console.log("mostrando base url", BASE_URL)
    try {
        const {data} = await axios({
            method: 'GET',
            url: BASE_URL+'/tables',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
        console.log("mostrando informacion de las mesas", data);
        setTableData(data);    
    } catch (error) {
        console.log("se ha presentado un error", error);
    }
}
const handleAddProduct = (data) => {
    dispatch(selectTableAction(data.id))//disparamos el id.ACá si puedo especificar que envio porque allá la acción solo tiene el dato de table. 
}
React.useEffect(()=>{
    getTables()
},[])//se renderiza meramente una vez cuando se monta



return(
    <>
    <Row className="mt-5">
            <Col lg={6} className="offset-3">
    <Row>
    <Card>
    <Card.Body>
        <Card.Title>Seleccione la mesa cabrón</Card.Title>
        {tableData && <Row>{tableData.map((data, index)=>{
            return(
                            <Col lg={3} key={index}>
                                <Card>
                                <Card.Title>{data.name}</Card.Title>
                                <b>La mesa es: </b><p>{data.name}</p>
                                <Card.Footer>
                                <button type="button" className="btn btn-success" onClick={()=>handleAddProduct(data)}>eligeme a mi</button>
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
                <button type="button" className="btn btn-warning" onClick={()=>setStep(2)}>Atras</button>
                </Col>
                <Col className="d-flex justify-content-end">
                <button type="button" className="btn btn-info" onClick={()=>setStep(4)}>confirmemos tu erección</button>
                </Col>
            </Row>

            </Col>
    </Row>
    </>
)
}

export default Step3Pedidos;
