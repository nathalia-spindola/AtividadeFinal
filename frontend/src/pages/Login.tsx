import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate } from "react-router-dom"

interface Props {
    logged: boolean,
    setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login({logged, setLogged}: Props) {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    const onFinish = handleSubmit(async (data) => {
        setLogged(false)
        const request = await fetch('http://localhost:8080/api/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        if(request.status !== 200) return setError("Algo deu errado, tente novamente")
        setLogged(true)
        navigate('/')
    })

    return (<>
        <h1>Login</h1>
        <form onSubmit={onFinish}>
            <label htmlFor='email'>Email</label>
            <input type="email" {...register('email')} onChange={() => setError(null)}></input>
            <label htmlFor='password'>Password</label>
            <input type="password" {...register('password')} onChange={() => setError(null)} />
            <button>Login</button>
        </form>
        <span>Não tem uma conta? Crie unma agora mesmo clicando <Link to={'/register'}>aqui</Link> </span>
        { error ? <p>Algum erro aconteceu, tente novamente</p> : ''}
    </>)
} 