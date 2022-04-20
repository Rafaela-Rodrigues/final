import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Formik, Form } from 'formik'
// import * as Yup from 'yup'
import tw from 'twin.macro'
import TextField from '../components/TextField'
import { AccountContext } from '../contexts/AccountContext'

import { Container, Title, Button } from '../styles/globalStyles'

const Message = tw.div`text-xs text-red-500 p-0 m-0`

// const userData = {
//     nome: 'Lucas',
//     sobrenome: 'Mendonça',
//     email: 'lucas21rio@gmail.com',
//     password: '123456',
// }

// const LoginSchema = Yup.object().shape({
//     email: Yup.string().test(
//         '',
//         'Por favor, tente novamente, suas credenciais são inválidas.',
//         (val) => val === userData.email
//     ),
//     password: Yup.string().test(
//         '',
//         'Por favor, tente novamente, suas credenciais são inválidas.',
//         (val) => val === userData.password
//     ),
// })

export default function Login() {
    const { signIn, erroLogin } = useContext(AccountContext)

    return (
        <>
            <Head>
                <title>Digital Booking | Login</title>
            </Head>

            <Container>
                <Title>Iniciar sessão</Title>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    // validationSchema={LoginSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        const { email, password } = values
                        signIn(email, password)
                    }}
                >
                    {({ errors }) => (
                        <Form className="flex flex-col items-center w-[85%] sm:w-[530px] gap-1">
                            <TextField
                                label="E-mail"
                                name="email"
                                type="email"
                                className={`${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                            />

                            <TextField
                                label="Senha"
                                name="password"
                                type="password"
                                className={`${
                                    errors.password ? 'border-red-500' : ''
                                }`}
                            />

                            {(errors.password || errors.email) && (
                                <Message>
                                    {errors.password || errors.email}
                                </Message>
                            )}
                            {erroLogin && (
                                <div className="flex items-center justify-center w-full text-xs text-center text-red-500">
                                    Por favor, tente novamente, suas credenciais
                                    são inválidas.
                                </div>
                            )}
                            <Button type="submit" className="bg-primary-color">
                                Entrar
                            </Button>
                            <span className="text-sm text-text-color">
                                Ainda não tem conta?{' '}
                                <Link href="/signup" passHref>
                                    <button
                                        type="button"
                                        className="text-sm cursor-pointer text-primary-color hover:text-primary-hover-color"
                                    >
                                        Registre-se
                                    </button>
                                </Link>
                            </span>
                        </Form>
                    )}
                </Formik>
            </Container>
        </>
    )
}
