import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { MdVerified } from 'react-icons/md'
import tw from 'twin.macro'
import { Container } from '../styles/globalStyles'

export default function NovoModal() {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center w-full">
                <Head>
                    <title>Digital Booking | Reserva feita!</title>
                </Head>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg shadow border-2 box-border px-3 sm:px-24 md:px-{26} lg:px-28 xl:px-36 py-4">
                <div className="p-2">
                    <MdVerified size="4.5em" color="#F0572D" />
                </div>
                <Titulo>Muito obrigado!</Titulo>
                <Texto>Sua reserva foi feita com sucesso.</Texto>
                <Link href="/" passHref>
                    <Button type="button">Ok</Button>
                </Link>
            </div>
        </Container>
    )
}

const Button = tw.button`
px-16 
py-2 
sm:px-20 
md:px-24 
md:py-3 
lg:px-28 
lg:py-3 
xl:px-32 
xl:py-3 
2xl:px-36 
2xl:py-4 
sm:py-3 
sm:text-base 
md:text-lg 
lg:text-xl 
m-5 
border-2 
rounded-md 
border-primary-color 
text-primary-color 
hover:text-white 
hover:bg-primary-color   
`
const Texto = tw.p` 
text-xs 
sm:text-lg 
md:text-xl 
lg:text-xl 
font-bold
`
const Titulo = tw.p`
text-lg 
sm:text-2xl 
md:text-3xl  
font-bold 
text-primary-color
`
