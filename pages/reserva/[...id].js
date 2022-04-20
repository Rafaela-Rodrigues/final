import { useState, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import tw from 'twin.macro'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import addWeeks from 'date-fns/addWeeks'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker'
import ptLocale from 'date-fns/locale/pt-BR/index'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import moment from 'moment'
import { Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Box from '@mui/material/Box'
import axios from 'axios'
import RatingStars from '../../components/RatingStars'
import TextField from '../../components/TextField'
import { AccountContext } from '../../contexts/AccountContext'
import BasicSelect from '../../components/BasicSelect/basicSelect'
import FormReserve from '../../components/FormReserve/formReserve'

export default function Reserve({
    reserva,
    city,
    categoriaNome,
    dateToDisable,
}) {
    const { initialRangeDate, setInitialRangeDate, userToken, user, time } =
        useContext(AccountContext)

    const [value, setValue] = useState(initialRangeDate || [null, null])

    function getWeeksAfter(date, amount) {
        return date ? addWeeks(date, amount) : undefined
    }

    const disableDate = (date) => {
        for (let i = 0; i < dateToDisable.length; i += 1) {
            if (
                moment(date) >= moment(`${dateToDisable[i].checkIn}`) &&
                moment(date) <= moment(`${dateToDisable[i].checkOut}`)
            ) {
                return true
            }
        }

        return null
    }

    const dateCheckIn = new Date(value[0]).toLocaleDateString()
    const dateCheckOut = new Date(value[1]).toLocaleDateString()

    async function makeAReserve() {
        const options = {
            method: 'POST',
            url: 'http://3.84.31.150:8080/reserva',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
            data: {
                checkIn: value[0],
                checkOut: value[1],
                produtoId: reserva.id,
                usuarioId: user.id,
                horaCheckIn: time,
                cidadeId: reserva.cidadeId,
            },
        }

        axios
            .request(options)
            .then((response) => {
                if (response.status === 201) {
                    Router.push('/reservaFeita')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            <Head>
                <title>Digital Booking | Reservar</title>
            </Head>
            <SubMenu>
                <SubMenuInfo>
                    <span className="">{categoriaNome.titulo}</span>
                    <span className="text-lg">{reserva.nome}</span>
                </SubMenuInfo>
                <Link
                    href={`/locale/${reserva.nome
                        .toLowerCase()
                        .replaceAll(' ', '-')}/${reserva.id}`}
                    passHref
                >
                    <AiOutlineArrowLeft size={25} className="cursor-pointer" />
                </Link>
            </SubMenu>
            <div className="flex flex-col md:flex-row">
                <div className="">
                    <Title>Complete seus dados</Title>
                    <div className="flex flex-col md:flex-row items-right justify-center md:flex md:w-[130%] lg:w-[130%]">
                        <FormReserve />
                    </div>
                    <Title>Selecione sua data de reserva</Title>
                    <div className="flex place-items-center shadow-xl ml-3 md:ml-8 mr-3 md:mr-8 md:w-[112.5%] lg:w-[120%] items-center justify-center">
                        <div className="flex flex-col lg:hidden place-items-center place-self-center md:w-[80%]">
                            <div className="col-span-2">
                                <LocalizationProvider
                                    locale={ptLocale}
                                    dateAdapter={AdapterDateFns}
                                >
                                    <StaticDateRangePicker
                                        shouldDisableDate={disableDate}
                                        disablePast
                                        clearText="Limpar"
                                        cancelText="Cancelar"
                                        inputFormat="dd/MM/yyyy"
                                        toolbarFormat="dd/MMMM"
                                        mask="__/__/____"
                                        toolbarTitle="Selecione o período"
                                        maxDate={getWeeksAfter(value[0], 4)}
                                        startText="Check in"
                                        endText="Check out"
                                        displayStaticWrapperAs="mobile"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue)
                                            setInitialRangeDate(newValue)
                                        }}
                                        renderInput={(startProps, endProps) => (
                                            <>
                                                <TextField {...startProps} />
                                                <Box sx={{ mx: 2 }}> to </Box>
                                                <TextField {...endProps} />
                                            </>
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="items-center justify-center hidden lg:flex place-items-center place-self-center">
                            <div className="col-span-2 place-self-center">
                                <LocalizationProvider
                                    locale={ptLocale}
                                    dateAdapter={AdapterDateFns}
                                >
                                    <StaticDateRangePicker
                                        shouldDisableDate={disableDate}
                                        disablePast
                                        clearText="Limpar"
                                        cancelText="Cancelar"
                                        inputFormat="dd/MM/yyyy"
                                        toolbarFormat="dd/MMMM"
                                        mask="__/__/____"
                                        toolbarTitle="Selecione o período"
                                        maxDate={getWeeksAfter(value[0], 4)}
                                        startText="Check in"
                                        endText="Check out"
                                        displayStaticWrapperAs="desktop"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue)
                                            setInitialRangeDate(newValue)
                                        }}
                                        renderInput={(startProps, endProps) => (
                                            <>
                                                <TextField {...startProps} />
                                                <Box sx={{ mx: 2 }}> to </Box>
                                                <TextField {...endProps} />
                                            </>
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                    <Title>Seu horário de chegada</Title>
                    <div className="flex flex-col md:flex-row items-right justify-center md:w-[120%] lg:w-[125%] md:pl-8 pl-3">
                        <div className="shadow-xl w-full bg-[#FFFFFF] md:w-[130%] lg:w-[135%]">
                            <div className="row-span-2 p-3">
                                <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                                <span className="text-[12px] font-semibold text-[#31363F] pl-1">
                                    Seu quarto estara pronto para check-in entre
                                    16h00 e 23h00
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-[#191B1D] pl-3">
                                Indique a sua hora prevista de chegada
                            </span>
                            <BasicSelect />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="pt-[70px] px-5 md:pl-[120px] lg:pl-[220px] pr-3 md:pr-5">
                        <Card className="lg:max-w-[450px] w-full flex flex-row md:flex-col">
                            <div className="lg:w-[50%%] w-[100%] flex flex-col sm:flex-row md:flex-col lg:flex-col">
                                <div className="">
                                    <Title>Detalhes da reserva</Title>
                                    <CardMedia
                                        className="max-h-[360px]"
                                        component="img"
                                        image={reserva.imagens[0].url}
                                        alt="hotel image"
                                    />
                                </div>
                                <div className="">
                                    <CardContent>
                                        <span className="font-bold text-[#DFE4EA]">
                                            {categoriaNome.titulo}
                                        </span>
                                        <h1 className="text-[#F0572D] text-xl font-semibold">
                                            {reserva.nome}
                                        </h1>
                                        <RatingStars
                                            rating={reserva.avaliacao}
                                        />
                                        <div className="divide-y divide-solid">
                                            <div className="flex flex-row pt-3 pb-5 pr-5">
                                                <FaMapMarkerAlt size={12} />
                                                <span className="pl-5">
                                                    {`${city.nome}, ${city.pais}`}
                                                </span>
                                            </div>
                                            {/* Essa é do checkin */}
                                            <div className="flex flex-row p-5 place-content-between">
                                                <div>
                                                    <span>Check-in</span>
                                                </div>
                                                <div>
                                                    <span>{dateCheckIn}</span>
                                                </div>
                                            </div>
                                            {/* Essa é do checkout */}
                                            <div className="flex flex-row p-5 place-content-between">
                                                <div>
                                                    <span>Check-out</span>
                                                </div>
                                                <div>
                                                    <span>{dateCheckOut}</span>
                                                </div>
                                            </div>
                                            <div className="pt-5">
                                                <CardActions>
                                                    {/* <Link
                                                        href="/reserve"
                                                        passHref
                                                    > */}
                                                    <MobileButton
                                                        onClick={() => {
                                                            if (
                                                                time !==
                                                                    undefined &&
                                                                initialRangeDate !==
                                                                    undefined
                                                            ) {
                                                                makeAReserve()
                                                            }
                                                        }}
                                                    >
                                                        Confirmar reserva
                                                    </MobileButton>
                                                    {/* </Link> */}
                                                </CardActions>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="divide-y divide-solid">
                <div className="grid mt-12 sm:grid-cols-2 lg:grid-cols-3 bg-[#FFFFFF] w-100%">
                    <span className="text-[#F0572D] font-bold text-xl pl-8">
                        O que você precisa saber:
                    </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 m-8 mt-12 bg-[#FFFFFF] w-100%">
                    <div className="flex flex-col w-full pb-5 mt-5">
                        <h2 className="mb-3 text-lg font-bold text-primary-color">
                            Regras
                        </h2>
                        <p className="pr-4 text-justify">
                            Check-in: Depois das 16:00
                            <br /> Checkout: A partir das 09:00 <br />
                            Adequado para crianças ou bebês
                            <br />
                            Proibido fumar
                            <br />
                            Permite animais de estimação <br />
                            {/* Regras adicionais */}
                            Todos os titulares de cartão de crédito devem ter 25
                            anos ou mais no momento da reserva.
                        </p>
                    </div>
                    <div className="flex flex-col w-full pb-5 mt-5">
                        <h2 className="mb-3 text-lg font-bold text-primary-color">
                            Saúde e segurança
                        </h2>
                        <p className="pr-4 text-justify">
                            Não há alarme de monóxido de carbono.
                            <br />
                            Não há alarme de fumaça. <br />
                            Durante a pandemia Higienize as superfícies.
                            <br />
                            Use produtos de limpeza aprovados por especialistas
                            em saúde, como desinfetantes com 70% de álcool ou
                            mais. Limpe cuidadosamente.
                            <br />
                            Use máscara Lave toda a roupa de cama e toalhas.
                            <br />
                            Siga todas as outras orientações locais.
                        </p>
                    </div>
                    <div className="flex flex-col w-full pb-5 mt-5 sm:col-span-2 lg:col-span-1">
                        <h2 className="mb-3 text-lg font-bold text-primary-color">
                            Política de cancelamento
                        </h2>
                        <p className="pr-4 text-justify">
                            Cancelamento gratuito por 48 horas depois da
                            reserva.
                            <br />
                            Depois de 48 horas de realizar a reserva, o
                            reembolso será de 50%, menos a taxa de serviço.
                            <br />
                            Em caso de cancelamento no dia do check-in, o
                            cliente terá dereito ao reembolso da taxa de
                            limpeza, se já estiver paga.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
const Title = tw.h2`
    w-full 
    py-4
    text-xl 
    font-bold 
    text-primary-color 
    md:pl-8
    pl-3
`

const SubMenu = tw.div`flex items-center justify-between w-full text-white bg-primary-color p-4 md:px-8`

const SubMenuInfo = tw.div`flex flex-col font-bold`

const MobileButton = tw.button` w-full px-10 h-10 mx-4 font-bold text-white uppercase rounded-md bg-primary-color`

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://3.84.31.150:8080/produto/${params.id}`)
    const userData = await res.json()

    const reserva = userData

    const resCity = await fetch(
        `http://3.84.31.150:8080/cidade/${reserva.cidadeId}`
    )

    const city = await resCity.json()

    const categoria = await fetch(
        `http://3.84.31.150:8080/produto/categoria/${params.id}`
    )

    const categoriaNome = await categoria.json()

    const date = await fetch(
        `http://3.84.31.150:8080/reserva/produto/${params.id}`
    )
    const dateToDisable = await date.json()

    return {
        props: {
            reserva,
            city,
            categoriaNome,
            dateToDisable,
        },
    }
}
