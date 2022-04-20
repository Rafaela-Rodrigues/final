import tw from 'twin.macro'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoriesCard({
    id,
    img,
    categoria,
    disponibilidade,
    className,
}) {
    return (
        <CardContainer className={className}>
            <ImageContainer>
                <Image
                    className="cursor-pointer rounded-t-md"
                    src={img}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="imagem principal"
                    title={`${categoria} ${disponibilidade}`}
                />
            </ImageContainer>
            <InfoContainer>
                <InfoCategory>
                    <Link href={`/filtered/${id}`} passHref>
                        <span>{categoria}</span>
                    </Link>
                </InfoCategory>
                <h3>{disponibilidade}</h3>
            </InfoContainer>
        </CardContainer>
    )
}

const CardContainer = tw.div` 
        border 
        border-[#dee2e9] 
        rounded-md 
        shadow-md 
        h-[260px]
        bg-bg-card
`

const ImageContainer = tw.div`
        relative 
        w-full 
        h-[150px]
`

const InfoContainer = tw.div`
        text-gray-500
        p-3
`

const InfoCategory = tw.div`
        text-xl 
        font-bold 
        cursor-pointer 
        text-primary-color
`
