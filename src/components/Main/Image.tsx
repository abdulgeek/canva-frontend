/* eslint-disable @typescript-eslint/no-explicit-any */

const Image = ({ add_image, images, type, setImage }: { add_image: any, images: any, type: any, setImage: any }) => {
    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                images.map((item: any, i: any) => <div key={i} onClick={() => type === 'background' ? setImage(item.image_url) : add_image(item.image_url)} className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
                    <img className='object-fill w-full h-full' src={item?.image_url} alt="image" />
                </div>)
            }
        </div>
    )
}

export default Image