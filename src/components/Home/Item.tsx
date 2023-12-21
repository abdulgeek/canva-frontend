/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Item = ({ design, type, delete_design }: { design: any, type: any, delete_design: any }) => {
    return (
        <div className={`relative group w-full  ${type ? "h-[100px]" : " h-[170px] px-2"}`}>
            <Link to={`/design/${design._id}/edit`} className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : 'p-4'}`}>
                <img className='w-full h-full overflow-hidden rounded-md' src={design.image_url} alt="" />
            </Link>
            <div onClick={() => delete_design(design._id)} className='absolute hidden p-2 text-red-500 transition-all duration-500 cursor-pointer top-1 right-2 group-hover:block'><FaTrash /></div>
        </div>
    )
}

export default Item