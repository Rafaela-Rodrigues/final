import React from 'react'
import Image from 'next/image'
import { SRLWrapper } from 'simple-react-lightbox'

const options = {
    buttons: {
        backgroundColor: 'rgba(30,30,36,0.8)',
        iconColor: 'rgba(255, 255, 255, 0.8)',
        iconPadding: '10px',
        showAutoplayButton: true,
        showCloseButton: true,
        showDownloadButton: false,
        showFullscreenButton: true,
        showNextButton: true,
        showPrevButton: true,
        showThumbnailsButton: true,
        size: '40px',
    },
}

export default function DesktopGallery({ imgs }) {
    return (
        <SRLWrapper options={options}>
            <div className="hidden md:grid grid-cols-2 gap-2 w-full h-[350px] px-8">
                <div className="relative xl:w-[565px] h-[350px]">
                    <Image
                        className="rounded-md cursor-pointer"
                        src={imgs[0].url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        <div className=" w-[200] h-[200] relative">
                            <Image
                                className="rounded-md cursor-pointer"
                                src={imgs[1].url}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        </div>
                        <div className=" w-[200] h-[200] relative">
                            <Image
                                className="rounded-md cursor-pointer"
                                src={imgs[2].url}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <div className=" w-[200] h-[200] relative">
                            <Image
                                className="rounded-md cursor-pointer"
                                src={imgs[3].url}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        </div>
                        <div className=" w-[200] h-[200] relative">
                            <Image
                                className="rounded-md cursor-pointer"
                                src={imgs[4].url}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SRLWrapper>
    )
}
