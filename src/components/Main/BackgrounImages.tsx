/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import Image from './Image'
import { api } from '../../services/Api'
import { useAppSelector } from '../../hooks/hooks'

const BackgroundImages = ({ setImage, type }: { setImage: any, type: any }) => {
    const { access_token } = useAppSelector((state: any) => state.auth)

    const [images, setImages] = useState([])

    useEffect(() => {
        const getImages = async () => {
            try {
                const { data } = await api.design.getBackgrounImage(access_token)
                setImages(data)
            } catch (error) {
                console.log(error)
            }
        }
        getImages()
    }, [])

    return (
        <Image setImage={setImage} type={type} images={images} add_image={undefined} />
    )
}

export default BackgroundImages