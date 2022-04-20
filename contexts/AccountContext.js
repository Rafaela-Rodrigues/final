import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import axios from 'axios'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export const AccountContext = createContext()

export function AccountContextProvider({ children }) {
    const [user, setUser] = useState()
    const [decodedUser, setDecodedUser] = useState()

    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)

    const [erroLogin, setErroLogin] = useState(false)
    const [erroCadastro, setErroCadastro] = useState(false)

    const [cidadeSelecionada, setCidadeSelecionada] = useState()

    const [initialRangeDate, setInitialRangeDate] = useState()
    const [initialPlace, setInitialPlace] = useState()

    const [menuInfo, setMenuInfo] = useState()

    const [userToken, setUserToken] = useState()

    const [time, setTime] = useState()

    useEffect(() => {
        const { DB_booking_token: token } = parseCookies()

        if (token) {
            const decoded = jwt_decode(token)
            const { dados } = decoded

            setDecodedUser({
                email: dados.email,
                password: dados.password,
            })
            setUser({
                id: dados.id,
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                email: dados.email,
            })

            setUserToken(token)
        }
    }, [initialRangeDate])

    async function signIn(email, password) {
        try {
            const resp = await axios.post(
                'https://back-endbooking.herokuapp.com/usuario/jwt',
                {
                    email,
                    senha: password,
                }
            )
            setCookie(undefined, 'DB_booking_token', resp.data, {
                maxAge: 60 * 60 * 24, // 24 horas
            })

            const { DB_booking_token: token } = parseCookies()
            const decoded = jwt_decode(token)
            const { dados } = decoded

            setDecodedUser({
                email: dados.email,
                password: dados.password,
            })
            setUser({
                id: dados.id,
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                email: dados.email,
            })

            setUserToken(token)
            setIsLoginOpen(false)
            setErroLogin(false)
            Router.push('/')

            return token
        } catch (err) {
            console.error(err)
            setErroLogin(true)
        }
        return null
    }

    async function signUp(firstName, lastName, email, password) {
        axios
            .post('https://back-endbooking.herokuapp.com/usuario', {
                nome: firstName,
                sobrenome: lastName,
                email,
                senha: password,
                funcoes: {
                    nome: 'user',
                },
            })
            .then(() => {
                setErroCadastro(false)
                setIsSignUpOpen(false)
                setUserToken(signIn(email, password))
                setUser({
                    nome: firstName,
                    sobrenome: lastName,
                    email,
                    senha: password,
                })
            })
            .catch((error) => {
                setErroCadastro(true)
                console.error(error)
            })
    }

    return (
        <AccountContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                user,
                setUser,
                isLoginOpen,
                setIsLoginOpen,
                isSignUpOpen,
                setIsSignUpOpen,
                signIn,
                signUp,
                erroCadastro,
                setErroCadastro,
                decodedUser,
                erroLogin,
                setErroLogin,
                cidadeSelecionada,
                setCidadeSelecionada,
                initialRangeDate,
                setInitialRangeDate,
                initialPlace,
                setInitialPlace,
                menuInfo,
                setMenuInfo,
                userToken,
                setUserToken,
                time,
                setTime,
            }}
        >
            {children}
        </AccountContext.Provider>
    )
}
