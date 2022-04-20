import Calendar from '../Calendar/calendar'

export default function SeachBar({ cidades }) {
    const cidadeOption = cidades.map((item) => item.nome)

    return (
        <div className="bg-primary-color flex h-96 flex-col items-center justify-center w-full z-20 mb-8 text-xl backdrop-blur-[0px] backdrop-filter text-white  sm:gap-5">
            <span className="p-3 text-2xl font-extrabold text-center text-white md:text-4xl">
                Buscar ofertas em hotéis, resorts e muito mais
            </span>
            <div />

            <div className="flex flex-col items-center justify-center w-[90%] 2xl:w-[70%] gap-3 lg:flex-row">
                <div className="w-[100%] lg:w-[80%]">
                    <div>
                        <Calendar cidades={cidadeOption} />
                    </div>
                </div>
            </div>
        </div>
    )
}
