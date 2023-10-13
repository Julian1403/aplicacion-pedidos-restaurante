import React from 'react';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import { Col, Container, Row, Card } from 'react-bootstrap';
//debo importar las acciones:
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetStateAction } from '../../../redux/slices/pedidosStore';


//en el resumen se van a mostrar las elecciones
const ResumenPedidos = () => {

  const dispatch =useDispatch();
  const navigate = useNavigate();
    const pedidosStore=useSelector((state)=>state.pedidosStore)
    const token = useSelector((state)=>state.userData.token);
    const [productData, setProductData]=React.useState(null);
    const [tableData, setTableData]=React.useState(null);

    const handleConfirmPedido = () => {
      // Aquí puedes realizar las acciones necesarias para confirmar el pedido
  
      // Después de confirmar el pedido, resetea el estado
      dispatch(resetStateAction());
  
      // Navega a la página de dashboard
      navigate("/dashboard");
    };
    //obtener los productos elegidos
    
    const getProductsData = async () => { //a estos  get les debo dar un nombre distinto al q tengo en otro archivo
        console.log("mostrando base url", BASE_URL)
    try {
        const {data} = await axios({
            method: 'GET',
            url: BASE_URL+'/products',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        })
        console.log("mostrando informacion de productos", data);
        const filterProducts = data.filter((items)=> pedidosStore.products.includes(items.id));//incluyo unicamente los que estan en el redux
        setProductData(filterProducts);    
    } catch (error) {
        console.log("se ha presentado un error", error);
    }
    }
    const getTableDataById = async () => {
        try {
            const {data} = await axios({
                method: 'GET',
                url: BASE_URL+'/tables/'+pedidosStore.table,//acá estoy accediendo a la data, pero trae los datos por id (los id q tengo en el redux)
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            setTableData(data);//esta seria la data completa(es decir el objeto de tables de la base de datos que arrojó la busqueda por id)  que coincide con los id del redux. 
        } catch (error) {
            console.log("se ha presentado un error", error)
        }
    }

React.useEffect(()=>{
    getProductsData();
    getTableDataById();
},[])
console.log('Mesa seleccionada:', tableData && tableData.name);
return (
    <Container>
      <Row>
        <Col lg={10}>
          <Card className="factura-card">
            <Card.Body>
              <h1 className="factura-title">Factura</h1>
              <h5 className="factura-subtitle">Resumen del pedido - Cantidad de items: {pedidosStore && pedidosStore.products.length}</h5>
              <hr className="my-4 factura-hr" />
              <h3 className="factura-section-title">Productos</h3>
              <table className="table factura-table">
                <thead>
                  <tr>
                    <th>Id del producto</th>
                    <th>Nombre</th>
                    <th>Precios</th>
                  </tr>
                </thead>
                <tbody>
                  {productData && productData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>${data.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="my-4 factura-hr" />
              <h3 className="factura-section-title">Mesa seleccionada</h3>
              <p className="factura-mesa"> {tableData && tableData.name}</p>
              <hr className="my-4 factura-hr" />
              <p className="factura-total">Subtotal: ${pedidosStore && pedidosStore.subtotal}</p>
              <p className="factura-total">Total: ${pedidosStore && pedidosStore.total}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
     <Row>
     <div className="mb-3">
              <button type="button" className="btn btn-success"  onClick={()=>handleConfirmPedido()}>Confirmar el pedido</button>
              </div>
      </Row> 
    </Container>
  );
}

export default ResumenPedidos;