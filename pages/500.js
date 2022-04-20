import Link from 'next/link'
import { Container } from '../styles/globalStyles'

export default function Custom500() {
    return (
        <Container>
            <h1 className="text-2xl">500 | Página não encontrada</h1>
            <Link href="/" passHref>
                <button
                    type="button"
                    className="px-5 py-3 m-5 border-2 rounded-md border-primary-color text-primary-color hover:text-white hover:bg-primary-color"
                >
                    Ir para Home
                </button>
            </Link>
        </Container>
    )
}
