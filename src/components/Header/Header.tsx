/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom"
import * as htmlToImage from 'html-to-image';
import { useState } from "react";
import { api } from "../../services/Api";
import { minimalToast } from "../../utils/minimalToast";
import { useAppSelector } from "../../hooks/hooks";


const Header = ({ components, design_id }: { components: any, design_id: any }) => {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const { access_token } = useAppSelector((state: any) => state.auth)

    const saveImage = async () => {

        const getDiv: any = document.getElementById('main_design')
        const image = await htmlToImage.toBlob(getDiv)

        if (image) {

            const obj = {
                design: components
            }
            console.log(obj)
            const formData = new FormData()
            formData.append('design', JSON.stringify(obj))
            formData.append('image', image)
            try {
                setLoader(true)
                const { data } = await api.design.updateUserDesign(design_id, formData, access_token)
                minimalToast(data.message, 'success')
                setLoader(false)
            } catch (error: any) {
                setLoader(false)
                minimalToast(error.response.data.message, 'error')
            }
        }

    }

    const downloadImage = async () => {

        const getDiv: any = document.getElementById('main_design')
        const dataUrl = await htmlToImage.toPng(getDiv, {
            style: {
                transform: 'scale(1)'
            }
        })

        const link = document.createElement("a");
        link.download = 'image';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    return (
        <div className="h-[60px] bg-gradient-to-r from-[#21212122] via-[#27282b] to-[#2a2b2c] w-full">
            <div className="flex items-center justify-between h-full px-10 text-gray-300">
                <Link to={"/"}>
                    <img src="https://lh3.googleusercontent.com/ogw/ANLem4aWFfga0zjLF30VNGKhwJTLhIRNY-DP5zmKPFmM=s32-c-mo" alt="" />
                </Link>
                <span className="text-xl">Canva</span>
                <div className='flex items-center justify-center gap-2 text-gray-300'>
                    <button disabled={loader} onClick={saveImage} className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'>{loader ? 'Loading...' : 'Save'}</button>
                    <button onClick={downloadImage} className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'>Download</button>
                </div>
            </div>
        </div>
    )
}

export default Header