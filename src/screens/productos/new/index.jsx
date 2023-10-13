import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const NewProductScreen = () => {
    
    const navigate = useNavigate();
    const loading = useSelector((state)=>state.loading.isLoading);
    const token = useSelector((state)=>state.userData.token);

    const [form, setForm] = React.useState({})//lo inicializo como objeto porque a partir de algo vacio le meteré informacion de clave-valor

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        console.log("mostrando token", token)
        if(form && Object.keys(form).length > 0 && typeof(form) == 'object'){
            try {
                const result = await axios({
                    method: 'POST',
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

    return(
<Container className="mt-3">
    <Row>
        <Col lg={8}>
            <Card>
                <Card.Body>
                    <Card.Title>Nuevo Producto</Card.Title>
                    <div className="mb-3">
                        <label>Nombre Producto</label>
                        <input type="text" className="form-control" name="name" onBlur={(e)=>handleChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label>Precio</label>
                        <input type="number" className="form-control" name="price" onBlur={(e)=>handleChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-success" disabled={loading} onClick={()=>handleSubmit()}>{loading ? 'Cargando...' : 'Enviar'}</button>
                    </div>
                </Card.Body>
            </Card>
        </Col>

    </Row>
</Container>
    )
}

export default NewProductScreen;