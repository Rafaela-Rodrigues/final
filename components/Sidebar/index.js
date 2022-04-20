import { useState, useContext } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { AiOutlineClose } from 'react-icons/ai'
import { FiMenu } from 'react-icons/fi'
import tw from 'twin.macro'
import { destroyCookie } from 'nookies'
import DarkMode from '../DarkMode'
import { AccountContext } from '../../contexts/AccountContext'

import SocialMedia from '../SocialMedia'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const { theme } = useTheme()
    const { pathname } = useRouter()
    const { user, setUser } = useContext(AccountContext)

    return (
        <SideBarContainer>
            {!isOpen && (
                <FiMenu
                    className="cursor-pointer text-text-color"
                    size={30}
                    onClick={() => {
                        setIsOpen(true)
                    }}
                />
            )}

            <SidebarMenu
                className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <AiOutlineClose
                    size={30}
                    className="fixed text-white cursor-pointer top-5 left-5"
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                />

                {user ? (
                    <>
                        <MenuHead className="flex-col gap-1">
                            <div className="p-1 bg-white rounded-full text-input-text-color">
                                {user.nome[0]}
                                {user.sobrenome[0]}
                            </div>
                            <span>Olá,</span>
                            <div className="flex flex-col text-text-color">
                                <UserInfo>
                                    <DarkMode className="pb-2 text-xl" />
                                    <span>
                                        {user.nome} {user.sobrenome}
                                    </span>
                                </UserInfo>
                            </div>
                        </MenuHead>
                        <MenuBody className="flex items-end justify-end">
                            <div>
                                <span
                                    className={`${
                                        theme === 'dark-theme'
                                            ? 'text-white'
                                            : 'text-[#282c35]'
                                    }`}
                                >
                                    Deseja{' '}
                                    <button
                                        type="button"
                                        className="text-primary-color"
                                        onClick={() => {
                                            setIsOpen(!isOpen)
                                            setUser(undefined)
                                            destroyCookie(
                                                null,
                                                'DB_booking_token'
                                            )
                                            Router.push('/')
                                        }}
                                    >
                                        encerrar a sessão
                                    </button>
                                    ?
                                </span>
                            </div>
                            <span className="w-full mb-3 border border-text-color" />
                            <SocialMedia />
                        </MenuBody>
                    </>
                ) : (
                    <>
                        <MenuHead>
                            <DarkMode className="pb-2 text-xl" />
                            <h1 className="text-2xl font-bold">MENU</h1>
                        </MenuHead>
                        <MenuBody className="justify-between">
                            {pathname === '/login' && (
                                <MenuOptions>
                                    <Link href="/signup" passHref>
                                        <Button
                                            onClick={() => {
                                                setIsOpen(!isOpen)
                                            }}
                                        >
                                            Criar conta
                                        </Button>
                                    </Link>
                                </MenuOptions>
                            )}
                            {pathname === '/signup' && (
                                <MenuOptions>
                                    <Link href="/login" passHref>
                                        <Button
                                            onClick={() => {
                                                setIsOpen(!isOpen)
                                            }}
                                        >
                                            Fazer login
                                        </Button>
                                    </Link>
                                </MenuOptions>
                            )}
                            {pathname !== '/login' && pathname !== '/signup' && (
                                <MenuOptions>
                                    <Link href="/signup" passHref>
                                        <Button
                                            onClick={() => {
                                                setIsOpen(!isOpen)
                                            }}
                                        >
                                            Criar conta
                                        </Button>
                                    </Link>
                                    <span className="w-full border border-text-color" />
                                    <Link href="/login" passHref>
                                        <Button
                                            onClick={() => {
                                                setIsOpen(!isOpen)
                                            }}
                                        >
                                            Fazer login
                                        </Button>
                                    </Link>
                                </MenuOptions>
                            )}
                            <SocialMedia />
                        </MenuBody>
                    </>
                )}
            </SidebarMenu>
        </SideBarContainer>
    )
}

const SideBarContainer = tw.div`
    sm:hidden
`

const SidebarMenu = tw.div`
    top-0 
    right-0 
    fixed 
    bg-bg-color 
    w-full 
    h-screen 
    ease-in-out 
    duration-300 
    flex 
    flex-col 
    justify-between
`

const MenuHead = tw.div`
    h-60 
    bg-primary-color 
    bg-building 
    bg-top 
    bg-no-repeat 
    flex 
    justify-end 
    items-end 
    text-white 
    p-4
`

const MenuBody = tw.div`
    flex 
    flex-col 
    h-full 
    p-4 
    pt-10 
    pb-10
`

const MenuOptions = tw.div`
    flex 
    flex-col 
    w-full 
    gap-5 
    items-end 
    text-text-color
`

const UserInfo = tw.div`
    flex 
    text-white 
    font-bold 
    min-w-max
`

const Button = tw.button`
    text-xl 
    font-bold 
    cursor-pointer
`
