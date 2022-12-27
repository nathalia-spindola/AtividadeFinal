import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'

export default function Register() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const onFinish = handleSubmit(async(data) => { 
        const req = await fetch('http://localhost:8080/api/user', {
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        if(req.status !== 200) return
        navigate('/login')
    })

    return ( <>
        <div className="formulario">
            <h1>Cadastro</h1>
            <form onSubmit={onFinish}>
                <input type="text" placeholder="Nome"{...register('name')} />
                <input type="text" placeholder="Email"{...register('email')} />
                <input type="password" placeholder="Senha"{...register('password')} />
                <button>Cadastrar</button>
            </form>
            <span>Já tem uma conta? Então clique <Link to='/login'>aqui</Link> para fazer seu login</span>
        </div>
    </>)
}