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
    const [termosTemporarios, setTermosTemporarios] = useState<{ [key: string]: string }>({});

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
            const userId = res.data.id;
            const loggedUser = res.data.userEmail;  
            const token = res.data.token;
            const userName = res.data.nome;
            const userTelefone = res.data.telefone
            const userEndereco = res.data.endereco
            const userSexo = res.data.sexo
            const profile = res.data.profile

            localStorage.setItem('id', userId);
            localStorage.setItem('email', JSON.stringify(loggedUser));
            localStorage.setItem('nome', userName);
            localStorage.setItem('telefone', userTelefone);
            localStorage.setItem('endereco', userEndereco);
            localStorage.setItem('sexo', userSexo);
            localStorage.setItem('token', token);
            localStorage.setItem('profile', profile)
    
            api.defaults.headers.Authorization = `Bearer ${token}`;
            api.defaults.headers.common = { Authorization: `Bearer ${token}` };
            api.defaults.withCredentials = true;
            setUser(loggedUser);
            navigate("/");
        } catch (err) {     
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            localStorage.removeItem('id');
            localStorage.removeItem('nome');
            localStorage.removeItem('telefone');
            localStorage.removeItem('endereco')
            localStorage.removeItem('sexo');
            localStorage.removeItem('profile')
            avisoErroLogin();
        }
    }

    
    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("token")

        localStorage.removeItem('id');
        localStorage.removeItem('nome');
        localStorage.removeItem('telefone');
        localStorage.removeItem('endereco')
        localStorage.removeItem('sexo');
        localStorage.removeItem('profile')
        api.defaults.headers.Authorization = null
        api.defaults.headers.common = { Authorization: `` }
        api.defaults.withCredentials = false
        setUser(null);
        navigate("/login")
    }
    

    return (
        <AuthContext.Provider value={{authenticated: Boolean(user), user, loading , logout, login, termosTemporarios, setTermosTemporarios}}>
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