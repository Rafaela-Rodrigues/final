import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import tw from 'twin.macro'
import { AiOutlineClose } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { destroyCookie } from 'nookies'
import DarkMode from '../DarkMode'
import Sidebar from '../Sidebar'
import logo from '../../public/assets/logo.svg'
import whiteLogo from '../../public/assets/whiteLogo.svg'
import logoMobile from '../../public/assets/logoMobile.svg'

import { AccountContext } from '../../contexts/AccountContext'
import SignUpModal from '../Modal/signup'
import LoginModal from '../Modal/login'

export default function Header() {
    const { theme } = useTheme()

    const { user, setUser, setIsSignUpOpen, setIsLoginOpen } =
        useContext(AccountContext)

    return (
        <HeaderContainer>
            <Nav>
                <Link href="/" passHref>
                    <Logo>
                        <MobileLogo>
                            <Image
                                className="cursor-pointer"
                                src={logoMobile}
                                fill="primary-color"
                                alt="logo da Digital Booking"
                                objectFit="contain"
                            />
                        </MobileLogo>
                        <DesktopLogo>
                            <Image
                                className="cursor-pointer"
                                src={theme === 'dark-theme' ? whiteLogo : logo}
                                fill="primary-color"
                                alt="logo da Digital Booking"
                                objectFit="contain"
                            />
                        </DesktopLogo>
                    </Logo>
                </Link>
                <Sidebar />
            </Nav>

            <AccountAndLogin>
                <DarkMode />
                {!user ? (
                    <NotLoggedIn>
                        <Button
                            onClick={() => {
                                setIsSignUpOpen(true)
                            }}
                        >
                            Criar conta
                        </Button>
                        <Button
                            onClick={() => {
                                setIsLoginOpen(true)
                            }}
                        >
                            Iniciar Sessão
                        </Button>
                    </NotLoggedIn>
                ) : (
                    <LoggedIn>
                        <UserInitials>
                            {user.nome[0]}
                            {user.sobrenome[0]}
                        </UserInitials>
                        <UserMessage>
                            <span>Olá,</span>
                            <UserInfo>
                                <span>
                                    {user.nome} {user.sobrenome}
                                </span>
                            </UserInfo>
                        </UserMessage>
                        <AiOutlineClose
                            className="mb-5 cursor-pointer text-text-color"
                            onClick={() => {
                                setUser(undefined)
                                destroyCookie(null, 'DB_booking_token')
                            }}
                        />
                    </LoggedIn>
                )}
            </AccountAndLogin>
            <SignUpModal />
            <LoginModal />
        </HeaderContainer>
    )
}

const HeaderContainer = tw.header`
    flex 
    items-center 
    sticky 
    top-0 
    w-full 
    bg-header-color 
    text-header-text-color 
    py-3 
    md:py-4 
    px-4 
    md:px-8 
    shadow-lg 
    z-50
`

const Nav = tw.nav`
    flex 
    items-center 
    justify-between 
    w-full 
    gap-1
`

const Logo = tw.div`
`

const MobileLogo = tw.div`
    w-12 
    sm:w-28 
    sm:hidden
`

const DesktopLogo = tw.div`
    hidden 
    sm:flex 
    sm:w-28
`

const AccountAndLogin = tw.div`
    items-center 
    justify-between 
    hidden 
    sm:flex
`

const Button = tw.button`
    border 
    border-header-button-color 
    bg-transparent 
    hover:bg-header-button-hover 
    text-header-button-color 
    hover:text-white 
    font-bold 
    py-1 
    w-36 
    rounded
`

const NotLoggedIn = tw.div`
    flex 
    gap-3
`

const LoggedIn = tw.div`
    flex 
    items-center 
    gap-2
`

const UserInitials = tw.div`
    p-1 
    text-white 
    rounded-full 
    bg-primary-color
`

const UserMessage = tw.div`
    flex 
    flex-col 
    text-text-color
`

const UserInfo = tw.div`
    flex 
    text-primary-color 
    font-bold 
    min-w-max
`
