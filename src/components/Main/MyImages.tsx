/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import Image from "./Image"
import { api } from "../../services/Api"
import { useAppSelector } from "../../hooks/hooks"
import { minimalToast } from "../../utils/minimalToast"
import { BarLoader } from "react-spinners"

const MyImages = ({ add_image }: { add_image: any }) => {

    const [images, setImages] = useState<any>([])
    const [loader, setLoader] = useState(false)
    const { access_token } = useAppSelector((state: any) => state.auth)

    const imageUpload = async (e: any) => {
        if (e.target.files.length > 0) {
            const formData = new FormData()
            formData.append('image', e.target.files[0])

            try {
                setLoader(true)
                const { data } = await api.design.addUserImage(formData, access_token)
                setImages([...images, data.userImage])
                setLoader(false)
            } catch (error: any) {
                setLoader(false)
                minimalToast(error.response.data.message, "error")
            }
        }
    }

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
        <div>
            <div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3'>
                <label className='text-center cursor-pointer' htmlFor="image">Upload image</label>
                <input readOnly={loader} onChange={imageUpload} type="file" id='image' className='hidden' />
            </div>
            {
                loader && <div className='flex items-center justify-center mb-2'>
                    <BarLoader color='#fff' />
                </div>
            }
            <div className='h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                <Image add_image={add_image} images={images} type={undefined} setImage={setImages} />
            </div>
        </div>
    )
}

export default MyImages