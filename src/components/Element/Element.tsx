/* eslint-disable @typescript-eslint/no-explicit-any */
const Element = ({ id, info, exId }: { id: any, info: any, exId: any }) => {
    return (
        <>
            {
                exId ? <>
                    <div onMouseDown={() => info.resizeElement(exId, info)} className="absolute hidden group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nesw-resize bg-green-500 z-[999999]">
                    </div>
                    <div onMouseDown={() => info.resizeElement(exId, info)} className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 Z-[99999]'>
                    </div>
                    <div onMouseDown={() => info.resizeElement(exId, info)} className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'></div>
                    
                </> : <>
                    <div onMouseDown={() => info.resizeElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999] '></div>
                    <div onMouseDown={() => info.resizeElement(id, info)} className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 Z-[99999]'>
                    </div>
                    <div onMouseDown={() => info.resizeElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'></div>
                </>
            }
            <div onMouseDown={() => info.rotateElement(id, info)} className='hidden absolute group-hover:block -top-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'></div>

            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block -top-[3px] left-[50%] translate-[-50%, 0] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'></div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block top-[50%] -left-[3px] translate-[0%, -50%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'></div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block top-[50%] -right-[3px] translate-[0%, -50%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'></div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] left-[50%] translate-[-50%, 0] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'></div>
        </>
    )
}

export default Element