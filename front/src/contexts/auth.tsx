import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { URI, api } from "../enumerations/uri";
import { avisoErroLogin } from "../controllers/avisoErro";


export const AuthContext = createContext({} as any);

export const AuthProvider = ({children}:any) => {
    const navigate = useNavigate()
    const [ user, setUser ] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try{
            const recoveredUser = localStorage.getItem('email')
            const recoveredToken = localStorage.getItem('token')
            if (recoveredUser && recoveredToken) {
                
                setUser(JSON.parse(recoveredUser))
                api.defaults.headers.Authorization = `Bearer ${recoveredToken}`
                api.defaults.headers.common = { Authorization: `Bearer ${recoveredToken}` }
                api.defaults.withCredentials = true
            }
        }catch(err){

        }
        setLoading(false)
      }, []);
     
      

      async function login(email:string, password:string){
        try {
            const res = await axios.post(URI.LOGIN_USER, {email: email, password: password});
            const loggedUser = res.data.userEmail;  
            const token = res.data.token;
            console.log(res.data.email);
            localStorage.setItem('email', JSON.stringify(loggedUser));
            localStorage.setItem('token', token);
            console.log(res);
    
            api.defaults.headers.Authorization = `Bearer ${token}`;
            api.defaults.headers.common = { Authorization: `Bearer ${token}` };
            api.defaults.withCredentials = true;
            setUser(loggedUser);
            navigate("/");
        } catch (err) {     
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            avisoErroLogin();
        }
    }

    
    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = null
        api.defaults.headers.common = { Authorization: `` }
        api.defaults.withCredentials = false
        setUser(null);
        navigate("/login")
    }
    

    return (
        <AuthContext.Provider value={{authenticated: Boolean(user), user, loading , logout, login}}>
            {children}
        </AuthContext.Provider>
    )
    
}


export const Private = ({ children }:any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if(loading){
        return <div className="loading">Carregando...</div>
    }
    if(!authenticated){
        return <Navigate to={"/login"}/> 
    }

    return children;

}