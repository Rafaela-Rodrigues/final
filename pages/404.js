/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Container } from '../styles/globalStyles'

export default function Custom404() {
    return (
        <Container>
            <img
                src="https://cdn-icons-png.flaticon.com/512/868/868753.png"
                width={250}
            />
            <h1 className="text-2xl">Página não encontrada</h1>
            <Link href="/" passHref>
                <button
                    type="button"
                    className="px-20 py-3 m-5 border-2 rounded-md border-primary-color text-primary-color hover:text-white hover:bg-primary-color"
                >
                    Ir para Home
                </button>
            </Link>
        </Container>
    )
}
