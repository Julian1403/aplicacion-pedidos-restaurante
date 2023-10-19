import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setLogout } from '../../redux/slices/userData';

const HomeScreen = () => {

    const navigate=useNavigate();
    const dispatch =useDispatch();

    const handleChange = (e) => {
        dispatch(setLogout(false));
        navigate("/categorias")
      };

return(
    <>
    <div>
      <h1>Bienvenido</h1>
      <div>
      <button type="button" className="btn btn-primary" onClick={()=>navigate("/login")}>Iniciiar Sesión</button>
        
      </div>
      <div>
          <button type="button" className="btn btn-secondary" onClick={(e)=>handleChange(e) }>Cerrar sesion</button>
        
      </div>
    </div>
    </>
)
}

export default HomeScreen


