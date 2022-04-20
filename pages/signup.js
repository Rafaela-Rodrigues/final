import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import tw from 'twin.macro'
import TextField from '../components/TextField'
import { AccountContext } from '../contexts/AccountContext'

import { Container, Title, Button } from '../styles/globalStyles'

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

export default function SignUp() {
    const { signUp, erroCadastro } = useContext(AccountContext)

    return (
        <>
            <Head>
                <title>Digital Booking | Cadastro</title>
            </Head>

            <Container>
                <Title>Criar conta</Title>

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
                        const { firstName, lastName, password, email } = values
                        signUp(firstName, lastName, email, password)
                    }}
                >
                    {({ errors }) => (
                        <Form className="flex flex-col w-[85%] sm:w-[530px] gap-1">
                            <div className="w-full sm:w-[530px] flex gap-1 flex-col md:flex-row">
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
                                        <Message>{errors.firstName}</Message>
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
                                        <Message>{errors.lastName}</Message>
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
                            {errors.email && <Message>{errors.email}</Message>}

                            <TextField
                                label="Senha"
                                name="password"
                                type="password"
                                className={`${
                                    errors.password ? 'border-red-500' : ''
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
                                    errors.password ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.confirmPassword && (
                                <Message>{errors.confirmPassword}</Message>
                            )}
                            {erroCadastro && (
                                <div className="flex items-center justify-center w-full text-xs text-center text-red-500">
                                    Infelizmente, você não pôde se registrar.
                                    Por favor, tente novamente mais tarde.
                                </div>
                            )}
                            <Button type="submit" className="bg-primary-color">
                                Criar conta
                            </Button>
                            <span className="text-sm text-center text-text-color">
                                Já tem uma conta?{' '}
                                <Link href="/login" passHref>
                                    <button
                                        type="button"
                                        className="text-sm cursor-pointer text-primary-color hover:text-primary-hover-color"
                                    >
                                        Inicial sessão
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
