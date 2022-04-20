import tw from 'twin.macro'
import Image from 'next/image'
import Link from 'next/link'
import { FaMapMarkerAlt } from 'react-icons/fa'

import RatingStars from '../RatingStars'

export default function RecommendsCard({
    id,
    titulo,
    img,
    categoria,
    descricao,
    rating,
    className,
}) {
    return (
        <CardContainer className={className}>
            <ImageContainer>
                <Image
                    className="rounded-t-md md:rounded-tr-none md:rounded-l-md"
                    src={img}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="imagem principal"
                    title={`${categoria} ${titulo}`}
                />
            </ImageContainer>
            <InfoContainer>
                <InfoCategory>
                    <span>{categoria}</span>
                    <RatingStars rating={rating} />
                </InfoCategory>
                <InfoTitle>{titulo}</InfoTitle>
                <InfoMap>
                    <FaMapMarkerAlt color="grey" />

                    <Link
                        href={`/locale/${titulo
                            .toLowerCase()
                            .replaceAll(' ', '-')}/${id}#map`}
                        passHref
                    >
                        <span className="cursor-pointer">Mostrar no mapa</span>
                    </Link>
                </InfoMap>

                <InfoDescription>{`${descricao.substring(
                    0,
                    73
                )}...`}</InfoDescription>
                <Link
                    href={`/locale/${titulo
                        .toLowerCase()
                        .replaceAll(' ', '-')}/${id}`}
                    passHref
                >
                    <Button>Ver Mais</Button>
                </Link>
            </InfoContainer>
        </CardContainer>
    )
}

const CardContainer = tw.div` 
    flex 
    flex-col 
    lg:flex-row
    border 
    border-[#dee2e9] 
    rounded-md 
    shadow-xl 
    min-w-[270px]
    h-[420px]
    lg:h-[250px]
    text-gray-500
    bg-bg-card
`

const ImageContainer = tw.div`
    relative
    h-[160px]
    lg:h-full
    w-full
`

const InfoContainer = tw.div`
    flex-grow
    relative
    w-full
    p-3
    pt-5
    sm:pt-5
    text-sm
`

const InfoCategory = tw.div`
    flex 
    justify-between 
    font-light 
    text-primary-color 
    text-xs 
    uppercase
`

const InfoTitle = tw.h2`
    tracking-wide
    text-lg 
    font-bold 
    text-primary-color
`

const InfoMap = tw.span`
    flex 
    items-center 
    gap-2
    py-3 
    text-xs
    font-semibold
    uppercase
    text-primary-color
`

const InfoDescription = tw.p`
    text-justify
`

const Button = tw.button`
    absolute
    w-[92%]
    bg-primary-color 
    hover:bg-primary-hover-color 
    rounded-md 
    font-bold 
    uppercase 
    text-white
    p-2
    bottom-3
`
