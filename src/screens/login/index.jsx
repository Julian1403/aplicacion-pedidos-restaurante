import React from "react";
import './login.css'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { setSignIn } from "../../redux/slices/userData";
import { useDispatch, useSelector} from 'react-redux';
import { setLoading } from "../../redux/slices/loading";

 


const LoginScreen=()=>{
    
    const navigate=useNavigate();

    //para disparar acciones:
    const dispatch =useDispatch();

    //para leer información del store:
    const loading=useSelector((state)=>state.loading.isLoading)//este loading lo necesito para lo del depsues del return
//porque de hecho puedo dispar acciones del almacen loading tal cual como se hace con el signin
//cuando quiero mostrar una vble despues del return siempre y cuando la vble exista, lo hago asi: {error &&   <> </>}

//hook para mostrar o esconder la clave:
const[type,setType]=React.useState('password') 

//creando un hook pal loading:
// const[loading,setLoading]=React.useState(null)   

//hook de react router dom pa navegar entre rutas: 
const navegate=useNavigate();//los hooks no los puedo utilizar directamente en el codigo por eso se los asigno a una cte. 

const [form, setForm]=React.useState({})
    const handleChange=(e)=>{
        const{value,name}=e.target;
        setForm({...form,[name]:value});
    }


const[error, setError]=React.useState(null)
    const handleSubmit =async()=>{
        dispatch(setLoading(true))
        //haciendo un if para validar algunas cosas 
        if(form && typeof(form) == 'object' && Object.keys(form).length > 0){
        //cuando entre a esta funcion tiene q salir el loading por lo tanto lo pongo en true
    //    setLoading(true);
        try{
            const payload={
                email: form.correo,
                password: form.clave
            }
            const result = await axios.post(`${BASE_URL}/auth/signin`,payload)
            // const token= result.data.token, ya quedaria asi:
            const {token,name,email}=result.data
            dispatch(setLoading(false))
            //Guardamos el token en el local storage:localStorage.setItem('token',token);esto ya no va porque usé la accion
            dispatch(setSignIn({token, name, email}))
            //si todo salió bien entonces que entre al dashboard:
            navegate("/dashboard");
            //cuando termine va tener un valor de falso porque ya debe volver a aparecer el texto de iniciar sesion:
            // setLoading(false);
        }
        catch (error){
            dispatch(setLoading(false))
            setError(error.response.data.message);
            console.log("mostrando error al login", error)
            //en caso de un error sale falso tmbn. 
            // setLoading(false);
        }
    }else {
        dispatch(setLoading(false))
        setError("campos obligatorios")
    }
}


    return(
        <>
        
        <div className="login-page d-flex justify-content-center align-items-center">
        <div className="container">
        {/* <h1 className="row justify-content-center">Pantalla de autenticación pedidos Restaurante</h1> */}
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            <div className="mb-3">
                                <label>Correo</label>
                                <input type="text" className="form-control" name="correo" onBlur={(e)=>handleChange(e)} autoComplete="off" />
                            </div>
                            <div className="mb-3">
                            <label>Contraseña</label>
                            <div className="input-group,mb-3">
                            <input type={type} className="form-control" name="clave" onBlur={(e)=>handleChange(e)} />
                                <button type="button" className="input-group-text" onClick={()=>setType(previo => previo == 'text' ? 'password' : 'text')}> 
                                {type == 'password'&&<FaEye/>}
                                {type == 'text'&&<FaEyeSlash/>} 
                                </button>
                            </div>
                            </div>    
                                {error && 
                                <>
                                <div className="alert alert-danger">{error}</div>
                                </>}
                           
                            
                            
            
                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-success" disabled={loading} onClick={(e)=>handleSubmit(e)} >{loading ? 'cargando...' : 'iniciar sesión'} </button>
                            </div>

                            <div className="d-grid gap-2">
                                <button type="button" className="button" onClick={()=>navigate("/dashboard")}>Volver</button>
        
                            </div>


                        </div>
                    </div>
                </div>
        </div>
    </div>
    </div>    
    </>
    )
}
export default LoginScreen