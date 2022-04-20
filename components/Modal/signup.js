import { useContext } from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import tw from 'twin.macro'
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { ModalContainer, Title, Button } from '../../styles/globalStyles'
import TextField from '../TextField'

import { AccountContext } from '../../contexts/AccountContext'

const Message = tw.div`text-xs text-red-500 text-right`

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Muito curto. Mínimo de 3 caracteres.')
        .max(50, 'Muito longo. 50 caracteres no máximo.')
        .required('Este campo é obrigatório.'),
    lastName: Yup.string()
        .min(5, 'Muito curto. Mínimo de 5 caracteres.')
        .max(50, 'Muito longo. 50 caracteres no máximo.')
        .required('Este campo é obrigatório.'),
    email: Yup.string()
        .email('Email inválido.')
        .required('Este campo é obrigatório.'),
    password: Yup.string()
        .min(6, 'Muito curto. Mínimo de 6 caracteres.')
        .max(50, 'Muito longo. 50 caracteres no máximo.')
        .required('Este campo é obrigatório.'),
    confirmPassword: Yup.string()
        .required('Este campo é obrigatório.')
        .oneOf([Yup.ref('password'), null], 'Senhas não coincidem.'),
})

export default function SignUpModal() {
    const {
        isSignUpOpen,
        setIsSignUpOpen,
        setIsLoginOpen,
        signUp,
        erroCadastro,
    } = useContext(AccountContext)

    return (
        <>
            <Head>
                <title>Digital Booking | Cadastro</title>
            </Head>

            <Dialog
                open={isSignUpOpen}
                onClose={() => setIsSignUpOpen(false)}
                className="fixed inset-0 z-50 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <ModalContainer>
                        <AiOutlineClose
                            size={20}
                            className="absolute cursor-pointer top-3 right-3 fill-text-color"
                            onClick={() => {
                                setIsSignUpOpen(false)
                            }}
                        />

                        <Title>Criar Conta</Title>

                        <Formik
                            validateOnChange={false}
                            validateOnBlur={false}
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values) => {
                                const { firstName, lastName, password, email } =
                                    values
                                signUp(firstName, lastName, email, password)
                            }}
                        >
                            {({ errors }) => (
                                <Form className="flex flex-col w-[85%] sm:w-[530px] gap-1">
                                    <div className="w-full sm:w-[530px] flex flex-col md:flex-row">
                                        <div className="flex flex-col w-full gap-1 mr-2 text-center">
                                            <TextField
                                                label="Nome"
                                                name="firstName"
                                                type="text"
                                                className={`${
                                                    errors.firstName
                                                        ? 'border-red-500'
                                                        : ''
                                                }`}
                                            />
                                            {errors.firstName && (
                                                <Message>
                                                    {errors.firstName}
                                                </Message>
                                            )}
                                        </div>

                                        <div className="flex flex-col w-full gap-1 text-center">
                                            <TextField
                                                label="Sobrenome"
                                                name="lastName"
                                                type="text"
                                                className={`${
                                                    errors.lastName
                                                        ? 'border-red-500'
                                                        : ''
                                                }`}
                                            />
                                            {errors.lastName && (
                                                <Message>
                                                    {errors.lastName}
                                                </Message>
                                            )}
                                        </div>
                                    </div>

                                    <TextField
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        className={`${
                                            errors.email ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.email && (
                                        <Message>{errors.email}</Message>
                                    )}

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
                                    {errors.password && (
                                        <Message>{errors.password}</Message>
                                    )}

                                    <TextField
                                        label="Confimar senha"
                                        name="confirmPassword"
                                        type="password"
                                        className={`${
                                            errors.password
                                                ? 'border-red-500'
                                                : ''
                                        }`}
                                    />
                                    {errors.confirmPassword && (
                                        <Message>
                                            {errors.confirmPassword}
                                        </Message>
                                    )}
                                    {erroCadastro && (
                                        <div className="flex items-center justify-center w-full text-xs text-center text-red-500">
                                            Infelizmente, você não pôde se
                                            registrar. Por favor, tente
                                            novamente mais tarde.
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="bg-primary-color"
                                    >
                                        Criar conta
                                    </Button>
                                    <span className="text-sm text-center text-text-color">
                                        Já tem uma conta?{' '}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsSignUpOpen(false)
                                                setIsLoginOpen(true)
                                            }}
                                            className="text-sm cursor-pointer text-primary-color hover:text-primary-hover-color"
                                        >
                                            Inicial sessão
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
