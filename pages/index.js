/* eslint-disable camelcase */
import Head from 'next/head'
import tw from 'twin.macro'
import RecommendsCard from '../components/Card/recommends'
import CategoriesCard from '../components/Card/categories'
import Hero from '../components/Hero'

export default function Home({
    categorias,
    recomendacoes,
    cidades,
    recomendacoesCategoria,
}) {
    return (
        <>
            <Head>
                <title>Digital Booking | Home</title>
            </Head>

            <Hero cidades={cidades} />

            <div className="px-4">
                <Title>Buscar por categoria</Title>
                <CategoriesContainer>
                    <CategoriesCardContainer>
                        {categorias.map((item) => {
                            const { id, url_Img, titulo, disponibilidade } =
                                item
                            return (
                                <CategoriesCard
                                    key={id}
                                    id={id}
                                    img={url_Img}
                                    categoria={titulo}
                                    disponibilidade={disponibilidade}
                                    className="flex-[1_1_200px]"
                                />
                            )
                        })}
                    </CategoriesCardContainer>
                </CategoriesContainer>
                <Title>Recomendações</Title>
            </div>

            <RecommendsContainer>
                <RecommendsCardContainer>
                    {recomendacoes.map((recomendacao) => {
                        const {
                            id,
                            nome,
                            imagens,
                            descricao,
                            caracteristicas,
                            avaliacao,
                        } = recomendacao

                        const firstImage = imagens[0].url

                        return (
                            <RecommendsCard
                                className="md:flex-[1_1_470px]"
                                key={id}
                                id={id}
                                titulo={nome}
                                img={firstImage}
                                descricao={descricao}
                                caracteristicas={caracteristicas}
                                categoria={recomendacoesCategoria.nome}
                                rating={avaliacao}
                                localizacao={recomendacoesCategoria.rua}
                            />
                        )
                    })}
                </RecommendsCardContainer>
            </RecommendsContainer>
        </>
    )
}

const Title = tw.h2`
    w-full 
    py-4
    text-2xl 
    font-bold 
    text-primary-color 
    xl:pl-36
`

const CategoriesContainer = tw.div`
    flex 
    items-center 
    justify-center
`

const CategoriesCardContainer = tw.div`
    flex 
    flex-wrap 
    items-center 
    justify-center 
    w-full 
    gap-6 
    pb-6 
    xl:w-10/12
`

const RecommendsContainer = tw.div`
    flex 
    overflow-x-auto 
    md:justify-center
`

const RecommendsCardContainer = tw.div`
    flex 
    items-center 
    justify-center 
    gap-6 
    px-4 
    pb-6 
    md:flex-wrap 
    xl:w-10/12
`

export async function getServerSideProps() {
    const categorias = await fetch(`http://3.84.31.150:8080/categoria`).then(
        (res) => {
            if (res.ok) {
                return res.json()
            }
            return null
        }
    )

    const recomendacoes = await fetch(
        `http://3.84.31.150:8080/produto/cidade/6`
    ).then((res) => {
        if (res.ok) {
            return res.json()
        }
        return null
    })

    const recomendacoesCategoria = await fetch(
        `http://3.84.31.150:8080/cidade/6`
    ).then((res) => {
        if (res.ok) {
            return res.json()
        }
        return null
    })

    const cidades = await fetch(`http://3.84.31.150:8080/cidade/`).then(
        (res) => {
            if (res.ok) {
                return res.json()
            }
            return null
        }
    )

    return {
        props: {
            categorias,
            recomendacoes,
            cidades,
            recomendacoesCategoria,
        },
        // revalidate: 1,
    }
}
