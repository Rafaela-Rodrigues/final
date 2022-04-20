import tw from 'twin.macro'
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
    return (
        <FooterContainer>
            <Logo>{`©${new Date().getFullYear()} - Digital Booking`}</Logo>

            <SocialContainer>
                <BsFacebook className="cursor-pointer" />
                <FaLinkedinIn className="cursor-pointer" />
                <BsTwitter className="cursor-pointer" />
                <BsInstagram className="cursor-pointer" />
            </SocialContainer>
        </FooterContainer>
    )
}

const SocialContainer = tw.div`
    flex 
    items-center 
    justify-end 
    text-lg 
    text-white
    gap-5
`

const FooterContainer = tw.div`
    flex 
    items-center 
    w-full 
    bg-primary-color 
    h-10 
    px-4 
    md:px-8 
    shadow-md 
    justify-between
`

const Logo = tw.div`
    text-white
    flex 
    items-center 
    text-xs
`
