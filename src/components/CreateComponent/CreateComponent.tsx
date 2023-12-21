/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsTrash } from 'react-icons/bs'
import Element from '../Element/Element';
const CreateComponent = ({
    info,
    currentComponent,
    removeComponent,
}: {
    info: any;
    currentComponent: any;
    removeComponent: any;
}) => {
    const randValue: any = Math.floor(Math.random() * 100);
    let html: any = "";
    if (info.name === "main_frame") {
        html = (
            <div
                onClick={() => (info.setCurrentComponent || (() => {}))(info)}

                className="hover:border-[2px] hover:border-indigo-500 shadow-md"
                style={{
                    width: info.width + "px",
                    height: info.height + "px",
                    background: info.color,
                    zIndex: info.z_index,
                }}
            >
                {info.image && (
                    <img src={info.image} className="w-full h-full" alt="image" />
                )}
            </div>
        );
    }
    if (info.name === 'shape' && info.type === 'rect') {
        html = <div id={randValue} onClick={() => (info.setCurrentComponent || (() => {}))(info)}
 style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)'
        }}
            className="absolute group hover:border-[2px] hover:border-indigo-500"
        >
            <Element id={randValue} info={info} exId={""} />
            {currentComponent.id === info.id && (
                <div
                    onClick={() => removeComponent(info.id)}
                    className='absolute top-0 hidden px-3 py-2 m-2 bg-white rounded-md cursor-pointer group-hover:block'>
                    <BsTrash />
                </div>
            )}

        </div>
    }
    if (info.name === 'shape' && info.type === 'circle') {
        html = <div id={randValue} onClick={() => (info.setCurrentComponent || (() => {}))(info)}
 style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)'
        }}
            className="absolute group hover:border-[2px] hover:border-indigo-500"
        >
            <Element id={randValue} info={info} exId={`${randValue}c`} />
            <div id={`${randValue}c`} className='rounded-full' style={{
                width: info.width + "px",
                height: info.width + "px",
                background: info.color,
                opacity: info.opacity,
            }}>
            </div>
            {currentComponent.id === info.id && (
                <div
                    onClick={() => removeComponent(info.id)}
                    className='absolute top-0 hidden px-3 py-2 m-2 bg-white rounded-md cursor-pointer group-hover:block'>
                    <BsTrash />
                </div>
            )}

        </div>
    }
    if (info.name === 'shape' && info.type === 'traingle') {
        html = <div id={randValue} onClick={() => (info.setCurrentComponent || (() => {}))(info)}
 style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)'
        }}
            className="absolute group hover:border-[2px] hover:border-indigo-500"
        >
            <Element id={randValue} info={info} exId={`${randValue}t`} />
            <div id={`${randValue}t`} style={{
                width: info.width + "px",
                height: info.height + "px",
                background: info.color,
                opacity: info.opacity,
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'
            }}>

            </div>
            {currentComponent.id === info.id && (
                <div
                    onClick={() => removeComponent(info.id)}
                    className='absolute top-0 hidden px-3 py-2 m-2 bg-white rounded-md cursor-pointer group-hover:block'>
                    <BsTrash />
                </div>
            )}

        </div>
    }

    if (info.name === 'text') {
        html = <div id={randValue} onClick={() => (info.setCurrentComponent || (() => {}))(info)}
 style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
            padding: info.padding + "px",
            color: info.color,
            opacity: info.opacity
        }}
            className="absolute group hover:border-[2px] hover:border-indigo-500"
        >
            <Element id={randValue} info={info} exId={`${randValue}t`} />
            <h2
                style={{
                    fontSize: info.font + 'px', fontWeight: info.weight
                }}
                className='w-full h-full'>{info.title}</h2>
            {currentComponent.id === info.id && (
                <div
                    onClick={() => removeComponent(info.id)}
                    className='absolute top-0 hidden px-3 py-2 m-2 bg-white rounded-md cursor-pointer group-hover:block'>
                    <BsTrash />
                </div>
            )}


        </div>
    }
    if (info.name === 'image') {
        html = <div id={randValue} onClick={() => (info.setCurrentComponent || (() => {}))(info)}
 style={{
            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
            opacity: info.opacity,
        }}
            className='absolute group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId={`${randValue}img`} />
            <div className='overflow-hidden' id={`${randValue}img`} style={{
                width: info.width + 'px',
                height: info.height + 'px',
                borderRadius: `${info.radius}%`
            }}>
                <img className='w-full h-full' src={info.image} alt="image" />
            </div>
            {
                currentComponent.id === info.id && <div onClick={() => removeComponent(info.id)} className='absolute top-0 hidden px-3 py-2 bg-white rounded-md cursor-pointer group-hover:block'>
                    <BsTrash />
                </div>
            }
        </div>
    }
    return html;
};

export default CreateComponent;
