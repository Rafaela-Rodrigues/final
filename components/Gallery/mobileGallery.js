import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'

export default function MobileGallery({ imgs }) {
    return (
        <Carousel
            interval={3000}
            autoPlay
            infiniteLoop
            showThumbs={false}
            stopOnHover
        >
            {imgs.map((item) => (
                <Image
                    key={item.id}
                    src={item.url}
                    width={700}
                    height={420}
                    objectFit="cover"
                    objectPosition="center"
                    alt="imagem"
                />
            ))}
        </Carousel>
    )
}
