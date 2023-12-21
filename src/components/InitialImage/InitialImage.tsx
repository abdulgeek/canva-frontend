/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import Image from '../Main/Image'
import { api } from '../../services/Api'
import { useAppSelector } from '../../hooks/hooks'

const InitialImage = ({ add_image }: { add_image: any }) => {

    const [images, setImages] = useState([])
    const { access_token } = useAppSelector((state: any) => state.auth)

    useEffect(() => {
        const getImages = async () => {
            try {
                const { data } = await api.design.getUserImage(access_token)
                setImages(data)
            } catch (error) {
                console.log(error)
            }
        }
        getImages()
    }, [])


    return (
        <Image add_image={add_image} images={images} type={undefined} setImage={setImages} />
    )
}

export default InitialImage