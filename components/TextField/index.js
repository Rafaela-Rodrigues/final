import { useField } from 'formik'
import tw from 'twin.macro'

export default function TextField({ label, className, ...props }) {
    const [field] = useField(props)
    return (
        <TextFieldContainer>
            <Label htmlFor={field.name}>{label}</Label>
            <Input
                autoComplete="off"
                {...field}
                {...props}
                className={`outline-primary-color ${className} `}
            />
        </TextFieldContainer>
    )
}

const TextFieldContainer = tw.div`
    flex 
    flex-col 
    w-full 
    gap-1 
    items-center
`

const Input = tw.input`
    shadow-md 
    border 
    w-full 
    p-2 
    sm:p-3 
    rounded-md 
    focus:caret-primary-color 
    text-input-text-color 
    bg-input-bg
`

const Label = tw.label`
    text-text-color 
    text-sm 
    text-left 
    w-full
`
