import { useContext } from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
// import * as Yup from 'yup'
import tw from 'twin.macro'
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import TextField from '../TextField'
import { ModalContainer, Title, Button } from '../../styles/globalStyles'

import { AccountContext } from '../../contexts/AccountContext'

const Message = tw.div`text-xs text-red-500 p-0 m-0`

// const userData = {
//     nome: 'Lucas',
//     sobrenome: 'Mendonça',
//     email: 'lucas21rio@gmail.com',
//     senha: '123456',
// }

// const LoginSchema = Yup.object().shape({
//     email: Yup.string().test(
//         '',
//         'Por favor, tente novamente, suas credenciais são inválidas.',
//         (val) => val === decodedUser.email
//     ),
//     password: Yup.string().test(
//         '',
//         'Por favor, tente novamente, suas credenciais são inválidas.',
//         (val) => val === decodedUser.senha
//     ),
// })

export default function LoginModal() {
    const {
        isLoginOpen,
        setIsSignUpOpen,
        setIsLoginOpen,
        signIn,
        erroLogin,
        setErroLogin,
    } = useContext(AccountContext)

    return (
        <>
            <Head>
                <title>Digital Booking | Login</title>
            </Head>

            <Dialog
                open={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                className="fixed inset-0 z-50 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <ModalContainer>
                        <AiOutlineClose
                            size={20}
                            className="absolute cursor-pointer top-3 right-3 fill-text-color"
                            onClick={() => {
                                setIsLoginOpen(false)
                                setErroLogin(false)
                            }}
                        />

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
                                            errors.password
                                                ? 'border-red-500'
                                                : ''
                                        }`}
                                    />

                                    {(errors.password || errors.email) && (
                                        <Message>
                                            {errors.password || errors.email}
                                        </Message>
                                    )}

                                    {erroLogin && (
                                        <div className="flex items-center justify-center w-full text-xs text-center text-red-500">
                                            Por favor, tente novamente, suas
                                            credenciais são inválidas.
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="bg-primary-color"
                                    >
                                        Entrar
                                    </Button>
                                    <span className="text-sm text-text-color">
                                        Ainda não tem conta?{' '}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsLoginOpen(false)
                                                setIsSignUpOpen(true)
                                            }}
                                            className="text-sm cursor-pointer text-primary-color hover:text-primary-hover-color"
                                        >
                                            Registre-se
                                        </button>
                                    </span>
                                </Form>
                            )}
                        </Formik>
                    </ModalContainer>
                </div>
            </Dialog>
        </>
    )
}
