/* eslint-disable import/prefer-default-export */
import tw from 'twin.macro'

export const ModalContainer = tw.div`
        relative 
        flex 
        flex-col 
        items-center 
        max-w-xl 
        p-2 
        mx-auto 
        bg-modal-bg-color 
        rounded 
        sm:p-5
`

export const Container = tw.div`
        flex 
        flex-col 
        items-center 
        flex-grow 
        justify-center 
        text-text-color 
        px-4 
        md:px-8 
        flex-wrap
`

export const Title = tw.h1`
        font-bold 
        text-2xl 
        text-primary-color 
        text-center 
        mb-2 
        md:mb-8
`

export const Button = tw.button`
        bg-primary-color 
        hover:bg-primary-hover-color 
        text-white 
        font-bold 
        py-2 
        mt-5 
        w-full 
        rounded
`
