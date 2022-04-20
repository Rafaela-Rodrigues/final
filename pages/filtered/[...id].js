import React, { useContext } from 'react'
import tw from 'twin.macro'
import Head from 'next/head'
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Calendar from '../../components/Calendar/calendar'

import CardContainer from '../../components/Card/recommends'

import { AccountContext } from '../../contexts/AccountContext'

export default function Filtro({ filtered, city, cidades }) {
    const cidadeOption = cidades.map((item) => item.nome)

    const { menuInfo, setMenuInfo } = useContext(AccountContext)

    return (
        <Container>
            <Head>
                <title>Digital Booking</title>
            </Head>

            <SubMenu>
                <span className="text-lg font-bold">{menuInfo}</span>
                <Link href="/" passHref>
                    <AiOutlineArrowLeft size={25} className="cursor-pointer" />
                </Link>
            </SubMenu>

            <div className="flex flex-col gap-1 pt-6 sm:flex-row ">
                <div className="bg-gray-200">
                    <FiltroCidade>
                        <EspecificacoesFC>
                            <Calendarios>
                                <ConfiguracoesMC>
                                    <Calendar
                                        cidades={cidadeOption}
                                        initialRangeDate={[
                                            '2022/04/22',
                                            '2022/04/22',
                                        ]}
                                        initialPlace="Rio de Janeiro"
                                    />
                                </ConfiguracoesMC>
                            </Calendarios>
                        </EspecificacoesFC>
                    </FiltroCidade>
                    <FiltroCategorias>
                        <DivCategorias>
                            <TituloC>Categorias: </TituloC>
                            <CheckboxsC>
                                <Link href="/filtered/1" passHref>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuInfo('Hotéis')
                                        }}
                                        className="justify-center block py-3 text-base cursor-pointer text-text-color hover:text-primary-color"
                                    >
                                        Hotéis{' '}
                                    </button>
                                </Link>
                                <Link href="/filtered/2" passHref>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuInfo('Resorts')
                                        }}
                                        className="justify-center block py-3 text-base cursor-pointer text-text-color hover:text-primary-color"
                                    >
                                        Resorts{' '}
                                    </button>
                                </Link>
                                <Link href="/filtered/3" passHref>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuInfo('Apartamentos')
                                        }}
                                        className="justify-center block py-3 text-base cursor-pointer text-text-color hover:text-primary-color"
                                    >
                                        Apartamentos{' '}
                                    </button>
                                </Link>
                                <Link href="/filtered/4" passHref>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuInfo('Cama e café da manhã')
                                        }}
                                        className="justify-center block py-3 text-base cursor-pointer text-text-color hover:text-primary-color"
                                    >
                                        Cama e café da manhã{' '}
                                    </button>
                                </Link>
                            </CheckboxsC>
                        </DivCategorias>
                    </FiltroCategorias>
                </div>

                <div className="w-full px-3 border-white lg:w-full md:px-8">
                    {filtered.map((recomendacao) => {
                        const {
                            id,
                            nome,
                            descricao,
                            cidadeId,
                            imagens,
                            caracteristicas,
                            avaliacao,
                        } = recomendacao

                        let cidadeNome

                        switch (cidadeId) {
                            case 1:
                                cidadeNome = 'Hong Kong'
                                break
                            case 2:
                                cidadeNome = 'Bangkok'
                                break
                            case 3:
                                cidadeNome = 'Londres'
                                break
                            case 4:
                                cidadeNome = 'Singapura'
                                break
                            case 5:
                                cidadeNome = 'São Paulo'
                                break
                            case 6:
                                cidadeNome = 'Rio de Janeiro'
                                break
                            case 7:
                                cidadeNome = 'Dubai'
                                break
                            case 8:
                                cidadeNome = 'Nova York'
                                break
                            case 9:
                                cidadeNome = 'Porto'
                                break
                            case 10:
                                cidadeNome = 'Paris'
                                break

                            default:
                                cidadeNome = 'Rio de Janeiro'
                        }

                        const firstImage = imagens[0].url

                        return (
                            <CardContainer
                                className="md:flex-[1_1_470px] border-2 my-4"
                                key={id}
                                id={id}
                                titulo={nome}
                                img={firstImage}
                                descricao={descricao}
                                caracteristicas={caracteristicas}
                                categoria={cidadeNome}
                                rating={avaliacao}
                                localizacao={city.rua}
                            />
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}

const Container = tw.div` 
flex 
flex-col 
flex-grow
w-full 
`

const SubMenu = tw.div`
flex 
items-center 
justify-between 
w-full 
text-white 
bg-primary-color 
p-4 
md:px-8`

const FiltroCidade = tw.div`
flex 
flex-col 
items-start 
lg:w-full 
sm:w-full 
pl-4 
pr-4 
pt-4
`

const Calendarios = tw.div`
w-[100%] 
py-2
`
const EspecificacoesFC = tw.div`
flex 
flex-col 
items-center 
justify-center 
w-[100%] 
lg:w-full 
border-2 
p-3
pt-2 
py-2 
`

const ConfiguracoesMC = tw.div`

`

const FiltroCategorias = tw.div`
flex 
flex-col 
items-start 
w-full
px-4 
pt-2
pb-4
`
const DivCategorias = tw.div`
flex 
flex-col 
items-start 
justify-center  
w-[100%] 
lg:w-full 
py-2 
border-2 
p-4
`

const TituloC = tw.div`
w-full
text-text-color 
text-primary-color
font-bold
text-lg
py-2 
`

const CheckboxsC = tw.div`
flex 
flex-col 
items-start 
w-[100%]   
justify-center 
text-text-color 
text-base 
pb-3 
pr-2
`

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `http://3.84.31.150:8080/produto/categoria/${params.id}`
    )

    const filtered = await res.json()

    const resCity = await fetch(`http://3.84.31.150:8080/cidade/${params.id}`)

    const city = await resCity.json()

    const cidades = await fetch(`http://3.84.31.150:8080/cidade/`).then(
        (ress) => {
            if (ress.ok) {
                return ress.json()
            }
            return null
        }
    )

    return {
        props: {
            filtered,
            city,
            cidades,
        },
    }
}
