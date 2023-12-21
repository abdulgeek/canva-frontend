/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { api } from '../../services/Api'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'

const TemplateDesign = ({ type }: { type?: any }) => {
    const { access_token } = useAppSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        const get_templates = async () => {
            try {
                const { data } = await api.design.getTemplate(access_token)
                setTemplates(data)
            } catch (error) {
                console.log(error)
            }
        }
        get_templates()
    }, [])


    const add_template = async (id: any) => {

        try {
            const { data } = await api.design.getTemplateById(id, access_token)
            navigate(`/design/${data.design?._id}/edit`)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("templates", templates)
    return (
        <>
            <div className={`grid gap-2 ${type ? "grid-cols-2" : 'grid-cols-4 mt-5'}`}>
                {
                    templates.map((design, i) => <div onClick={() => add_template(design._id)} className={`relative cursor-pointer group w-full  ${type ? "h-[100px]" : " h-[170px] px-2"}`}>
                        <div className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : 'p-4'}`}>
                            <img className='w-full h-full overflow-hidden rounded-md' src={design.image_url} alt="" />
                        </div>
                    </div>)
                }
            </div >
        </>
    )
}

export default TemplateDesign