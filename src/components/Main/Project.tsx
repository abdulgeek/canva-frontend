/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import Item from '../Home/Item'
import { api } from '../../services/Api'
import { minimalToast } from '../../utils/minimalToast'
import { useAppSelector } from '../../hooks/hooks'

const Projects = ({ type, design_id }: { type?: any, design_id?: any }) => {
    const { access_token } = useAppSelector((state: any) => state.auth)

    const [designs, setDesign] = useState([])

    const get_user_design = async () => {
        try {
            const { data } = await api.design.getAllUserDesign(access_token)
            setDesign(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_user_design()
    }, [])

    const delete_design = async (design_id: any) => {
        try {
            const { data } = await api.design.deleteUserImage(design_id, access_token)
            minimalToast(data.message, 'success')
            get_user_design()
        } catch (error: any) {
            minimalToast(error.response.data.message, 'error')
        }
    }
    return (
        <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full'>
            <div className={type ? 'grid grid-cols-2 gap-2 mt-5 w-full' : 'grid grid-cols-4 gap-2 mt-5 w-full'}>
                {
                    designs.map((d, i) => d?._id !== design_id && <Item key={i} design={d} type={type} delete_design={delete_design} />)
                }
            </div>
        </div>
    )
}

export default Projects