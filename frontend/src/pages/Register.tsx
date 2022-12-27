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
        <h1>Register</h1>
        <form onSubmit={onFinish}>
            <label htmlFor="name">Nome</label>
            <input type="text" {...register('name')} />
            <label htmlFor="email">Email</label>
            <input type="text" {...register('email')} />
            <label htmlFor="password">Senha</label>
            <input type="password" {...register('password')} />
            <button>Registrar</button>
        </form>
        <span>Já tem uma conta? Então clique <Link to='/login'>aqui</Link> para fazer seu login</span>
    </>)
}