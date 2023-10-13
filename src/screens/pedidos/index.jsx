import React from 'react';
import { Row,Col,Container } from 'react-bootstrap';
import Step1Pedidos from './step1';
import Step2Pedidos from './step2';
import Step3Pedidos from './step3';
import ResumenPedidos from './resumen';


const PedidosScreen = () => {
    const [step, setStep]=React.useState(1);


    return(
        <Container>
        <Row>
            <Col>
            {step == 1 && <Step1Pedidos    setStep={setStep}/>}
            {step == 2 && <Step2Pedidos    setStep={setStep}/>}
            {step == 3 && <Step3Pedidos    setStep={setStep}/>}
            {step == 4 && <ResumenPedidos/>}
            </Col>

        
        </Row>
        </Container>
    )
}

export default PedidosScreen;