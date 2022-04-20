import tw from 'twin.macro'
import { useTheme } from 'next-themes'
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'

export default function SocialMedia({ className }) {
    const { theme } = useTheme()

    return (
        <>
            {theme === 'dark-theme' && (
                <SocialContainer
                    className={`text-white flex items-center justify-end text-lg ${className}`}
                >
                    <BsFacebook className="cursor-pointer" />
                    <FaLinkedinIn className="cursor-pointer" />
                    <BsTwitter className="cursor-pointer" />
                    <BsInstagram className="cursor-pointer" />
                </SocialContainer>
            )}
            {theme === 'light' && (
                <SocialContainer
                    className={`text-[#282c35] flex items-center justify-end text-lg ${className}`}
                >
                    <BsFacebook className="cursor-pointer" />
                    <FaLinkedinIn className="cursor-pointer" />
                    <BsTwitter className="cursor-pointer" />
                    <BsInstagram className="cursor-pointer" />
                </SocialContainer>
            )}
            {theme === 'system' && (
                <SocialContainer
                    className={`text-[#282c35] flex items-center justify-end text-lg ${className}`}
                >
                    <BsFacebook className="cursor-pointer" />
                    <FaLinkedinIn className="cursor-pointer" />
                    <BsTwitter className="cursor-pointer" />
                    <BsInstagram className="cursor-pointer" />
                </SocialContainer>
            )}
        </>
    )
}

const SocialContainer = tw.div`
    gap-5
`
