import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../../config/'
//debo importar la acción porque se va utilizar:
import { setLoading } from '../../redux/slices/loading';
import {Container,  Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductosScreen = () => {
    
    
    const token = useSelector((state)=>state.userData.token);
    const loading = useSelector((state)=>state.loading.isLoading);

    const dispatch = useDispatch();
    const [products, setProducts] = React.useState(null)

    React.useEffect(()=>{
        getAllProducts();
    },[])

    const getAllProducts = async () => { 
        console.log("mostrando base url", BASE_URL)
        dispatch(setLoading(true))
        try {
            const {data} = await axios({
                method: 'GET',
                url: BASE_URL+'/products',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            });
            dispatch(setLoading(false))
            console.log("mostrando informacion de productos", data);
            setProducts(data);    
        } catch (error) {
            dispatch(setLoading(false))
            console.log("se ha presentado un error", error);
        }
    }
    const navigate = useNavigate();
    return(
        <>
        {loading && 'Cargando...'} 
        {!loading && //cuando  termine el intento de obtener los productos el loading estará en falso. 
        //antes de intentar obtener los productos el loading está en verdadero
        <Container className="mt-3">
            <Row>
                <Col>
                <button type="button" className="btn btn-info" onClick={()=>navigate("/productos/new")}>Nuevo Producto</button>
                </Col>
                <Col>
                <button type="button" className="btn btn-danger" onClick={()=>navigate("/productos/new/:id")}>Editar Producto</button>
                </Col>
            </Row>
        <Row>
            <Col>
            <div className="table table-responsive">
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 && products.map((data, index)=>{
                        return(
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
                </table>
            </div>
            </Col>
        </Row>
        </Container>
        }
        </>
    )
}

export default ProductosScreen;