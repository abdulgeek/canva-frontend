/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsGrid1X2 } from "react-icons/bs"
import Header from "../../components/Header/Header"
import { FaShapes } from "react-icons/fa"
import { GoUpload } from "react-icons/go"
import { TfiText } from "react-icons/tfi"
import { FaFolder } from "react-icons/fa"
import { FaImage } from "react-icons/fa";
import { RxTransparencyGrid } from "react-icons/rx";
import { Key, useEffect, useState } from "react"
import { MdKeyboardArrowLeft } from "react-icons/md"
import TemplateDesign from "../../components/Main/TemplateDesign"
import MyImages from "../../components/Main/MyImages"
import Project from "../../components/Main/Project"
import CreateComponent from "../../components/CreateComponent/CreateComponent"
import { useParams } from "react-router-dom"
import { api } from "../../services/Api"
import { useAppSelector } from "../../hooks/hooks"
import InitialImage from "../../components/InitialImage/InitialImage"
import BackgroundImages from "../../components/Main/BackgrounImages"


const Main = () => {
    const { access_token } = useAppSelector((state: any) => state.auth)
    const { design_id } = useParams();
    const [state, setState] = useState('')
    const [currentComponent, setCurrentComponent] = useState<any>('');
    const [color, setColor] = useState('')
    const [image, setImage] = useState('')
    const [rotate, setRotate] = useState(0)
    const [left, setLeft] = useState<any>('');
    const [top, setTop] = useState<any>('');
    const [height, setHeight] = useState<any>('')
    const [width, setWidth] = useState<any>('')
    const [padding, setPadding] = useState('')
    const [font, setFont] = useState('')
    const [weight, setWeight] = useState('')
    const [opacity, setOpacity] = useState<any>('')
    const [zIndex, setZIndex] = useState<any>('')
    const [text, setText] = useState<any>('')
    const [radius, setRadius] = useState<any>(0)
    const [components, setComponents] = useState<any>([
        {
            name: 'main_frame',
            type: 'rect',
            id: Math.floor((Math.random() * 100) + 1),
            height: 450,
            width: 650,
            z_index: 1,
            color: '#fff',
            image: '',
            setCurrentComponent: (a: any) => setCurrentComponent(a)
        }
    ]);

    const [show, setShow] = useState({
        status: true,
        name: ''
    });

    const opacityHandler = (e: any) => {
        setOpacity(parseFloat(e.target.value))
    }

    const setElements = (type: any, name: any) => {
        setState(type)
        setShow({
            status: false,
            name
        })
    }

    const moveElement = (id: any, currentInfo: any) => {
        setCurrentComponent(currentInfo)
        const isMoving = true;
        const currentDiv: any = document.getElementById(id)
        const mouseMove = ({ movementX, movementY }: { movementX: any, movementY: any }) => {
            const getStyle = window.getComputedStyle(currentDiv);
            const left = parseInt(getStyle.left);
            const top = parseInt(getStyle.top);
            if (isMoving) {
                currentDiv.style.left = `${left + movementX}px`
                currentDiv.style.top = `${top + movementY}px`
            }
        }

        const mouseUp = (e: any) => {
            const isMoving = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            setLeft(parseInt(currentDiv.style.left));
            setTop(parseInt(currentDiv.style.top));
        }


        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    }

    const removeComponent = (id: any) => {
        const temp = components.filter((c: any) => c.id !== id)
        setCurrentComponent('')
        setComponents(temp)
    }

    const resizeElement = (id: any, currentInfo: any) => {
        setCurrentComponent(currentInfo)
        const isMoving = true;
        const currentDiv: any = document.getElementById(id)
        const mouseMove = ({ movementX, movementY }: { movementX: any, movementY: any }) => {
            const getStyle = window.getComputedStyle(currentDiv);
            const width = parseInt(getStyle.width);
            const height = parseInt(getStyle.height);
            if (isMoving) {
                currentDiv.style.width = `${width + movementX}px`
                currentDiv.style.height = `${height + movementY}px`
            }
        }

        const mouseUp = (e: any) => {
            const isMoving = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            setWidth(parseInt(currentDiv.style.width));
            setHeight(parseInt(currentDiv.style.height));
        }

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    }

    const rotateElement = (id: any, currentInfo: any) => {
        setCurrentComponent('')
        setCurrentComponent(currentInfo)
        const target: any = document.getElementById(id)
        const mouseMove = ({ movementX, movementY }: { movementX: any, movementY: any }) => {
            const getStyle = window.getComputedStyle(target)
            const trans = getStyle.transform
            const values: any = trans.split('(')[1].split(')')[0].split(',')
            const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
            let deg = angle < 0 ? angle + 360 : angle;
            if (movementX) {
                deg = deg + movementX;
            }
            target.style.transform = `rotate(${deg}deg)`
        }

        const mouseUp = () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            const getStyle = window.getComputedStyle(target)
            const trans = getStyle.transform
            const values: any = trans.split('(')[1].split(')')[0].split(',')
            const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
            const deg = angle < 0 ? angle + 360 : angle;
            setRotate(deg)
        }
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    }

    const removeBackground = () => {
        const com: any = components.find((c: { id: any }) => c.id === currentComponent.id)
        const temp: any = components.filter((c: { id: any }) => c.id !== currentComponent.id)
        com.color = '#fff'
        com.image = ''
        setImage('')
        setComponents([...temp, com])
    }

    const createShape = (name: any, type: any) => {
        const style = {
            id: components.length + 1,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            rotate,
            z_index: 2,
            color: '#3c3c3d',
            setCurrentComponent: (a: any) => setCurrentComponent(a),
            removeBackground: setImage(''),
            moveElement,
            resizeElement,
            rotateElement
        }
        setComponents([...components, style])
    }

    const addText = (name: any, type: any) => {
        const style = {
            id: components.length + 1,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            rotate,
            z_index: 10,
            padding: 6,
            font: 22,
            title: 'Add a Text',
            weight: 400,
            color: '#3c3c3d',
            setCurrentComponent: (a: any) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }
        setWeight('')
        setFont('')
        setCurrentComponent(style)
        setComponents([...components, style])
    }

    const addImage = (img: any) => {

        const style = {
            id: components.length + 1,
            name: 'image',
            type: 'image',
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            rotate,
            z_index: 2,
            image: img,
            radius: 0,
            setCurrentComponent: (a: any) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }
        setCurrentComponent(style)
        setComponents([...components, style])
    }

    useEffect(() => {
        if (currentComponent) {
            const index = components.findIndex((c: { id: any }) => c.id === currentComponent.id)
            const temp = components.filter((c: any) => c.id !== currentComponent.id);
            setComponents([...temp, components[index]]);
            if (currentComponent.name !== 'text') {
                components[index].width = width || currentComponent.width
                components[index].height = height || currentComponent.height
                components[index].rotate = rotate || currentComponent.rotate
            }
            if (currentComponent.name === 'text') {
                components[index].padding = padding || currentComponent.padding
                components[index].font = font || currentComponent.font
                components[index].weight = weight || currentComponent.weight
                components[index].title = text || currentComponent.title
            }
            if (currentComponent.name === 'image') {
                components[index].radius = radius || currentComponent.radius
            }

            if (currentComponent.name === 'main_frame' && image) {
                console.log(image)
                components[index].image = image || currentComponent.image
            }
            components[index].color = color || currentComponent.color
            if (currentComponent.name !== 'main_frame') {
                components[index].left = left || currentComponent.left
                components[index].top = top || currentComponent.top
                components[index].opacity = opacity || currentComponent.opacity
                components[index].z_index = zIndex || currentComponent.zIndex
                // components[index].rotate = rotate || currentComponent.rotate
            }
            setComponents([...temp, components[index]])
            setTop('')
            setHeight('')
            setLeft('')
            setColor('')
            setWidth('')
            setOpacity('')
            setZIndex('')
            setRotate(0)
        }
    }, [color, image, left, top, height, width, rotate, opacity, zIndex, padding, font, weight, text, radius])

    useEffect(() => {
        const getDesign = async () => {
            try {
                const { data } = await api.design.getUserDesign(`${design_id}`, access_token)
                console.log(data)
                const { components } = data

                for (let i = 0; i < data.length; i++) {
                    components[i].setCurrentComponent = (a: any) => setCurrentComponent(a)
                    components[i].moveElement = moveElement
                    components[i].resizeElement = resizeElement
                    components[i].rotateElement = rotateElement
                    components[i].remove_background = removeBackground

                }
                setComponents(components)
            } catch (error) {
                console.log(error)
            }
        }
        getDesign()
    }, [design_id])

    return (
        <div className="h-screen bg-black min-w-screen">
            <Header components={components} design_id={design_id} />
            <div className="flex h-[calc(100%-60px)] w-screen">
                <div className={"w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto"}>
                    <div onClick={() => setElements('design', 'design')} className={`${show.name === 'design' ? "bg-[#252627]" : ""} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className="text-2xl"><BsGrid1X2 /></span>
                        <span className="text-xs font-medium">Design</span>
                    </div>
                    <div onClick={() => setElements('shape', 'shape')} className={`${show.name === 'shape' ? "bg-[#252627]" : ""} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className="text-2xl"><FaShapes /></span>
                        <span className="text-xs font-medium">Shapes</span>
                    </div>
                    <div onClick={() => setElements('image', 'uploadImage')} className={`${show.name === 'uploadImage' ? "bg-[#252627]" : ""} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className="text-2xl"><GoUpload /></span>
                        <span className="text-xs font-medium">Upload</span>
                    </div>
                    <div onClick={() => setElements('text', 'text')} className={`${show.name === 'text' ? "bg-[#252627]" : ""} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className="text-2xl"><TfiText /></span>
                        <span className="text-xs font-medium">Text</span>
                    </div>
                    <div onClick={() => setElements('project', 'projects')} className={`${show.name === 'projects' ? "bg-[#252627]" : ""} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className="text-2xl"><FaFolder /></span>
                        <span className="text-xs font-medium">Project</span>
                    </div>
                    <div onClick={() => setElements('initImage', 'images')} className={`${show.name === 'images' ? "bg-[#252627]" : ""} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className="text-2xl"><FaImage /></span>
                        <span className="text-xs font-medium">Images</span>
                    </div>
                    <div onClick={() => setElements('background', 'background')} className={`${show.name === 'background' ? "bg-[#252627]" : ""} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className="text-2xl"><RxTransparencyGrid /></span>
                        <span className="text-xs font-medium">Background</span>
                    </div>
                </div>
                <div className="h-full w-[calc(100% - 75px)]">
                    <div className={`${show.status ? 'p-0 -left-[350px]' : 'px-8 left-[75px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
                        <div
                            onClick={() => setShow({
                                name: "",
                                status: true
                            })}
                            className="absolute flex items-center justify-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full ">
                            <MdKeyboardArrowLeft />
                        </div>
                        {
                            state === 'design' && <div>
                                <TemplateDesign type='main' />
                            </div>
                        }
                        {
                            state === 'shape' && <div className="grid grid-cols-3 gap-2">
                                <div onClick={() => createShape('shape', 'rect')} className="h-[90px] bg-[#3c3c3d] cursor-pointer"></div>
                                <div onClick={() => createShape('shape', 'circle')} className="h-[90px] bg-[#3c3c3d] rounded-full cursor-pointer"></div>
                                <div
                                    onClick={() => createShape('shape', 'traingle')}
                                    style={{
                                        clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'
                                    }}
                                    className="h-[90px] bg-[#3c3c3d] cursor-pointer"></div>
                            </div>
                        }
                        {
                            state === 'image' && <div>
                                <MyImages add_image={addImage} />
                            </div>
                        }
                        {
                            state === 'text' && <div>
                                <div className="grid grid-cols-1 gap-2">
                                    <div onClick={() => addText('text', 'title')} className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm">
                                        <h2>Add a Text</h2>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            state === 'project' && <div>
                                <Project type='main' design_id={design_id} />
                            </div>
                        }
                        {
                            state === 'initImage' && <div>
                                <InitialImage add_image={addImage} />
                            </div>
                        }
                        {
                            state === 'background' && <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                <BackgroundImages type='background' setImage={setImage} />
                            </div>
                        }
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className={`flex justify-center relative items-center h-full ${!currentComponent ? 'w-full' : 'w-[calc(100% - 250px)] overflow-hidden'}`}>
                        <div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
                            <div id="main_design" className="relative w-auto h-auto overflow-hidden">
                                {
                                    components.map((c: any, i: Key | null | undefined) => <CreateComponent key={i} info={c} currentComponent={currentComponent} removeComponent={removeComponent} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {currentComponent && (
                    <div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2">
                        <div className="flex flex-col items-start justify-start h-full gap-6 px-3">
                            <div className="flex items-start justify-start gap-4 mt-4">
                                <span>Color: </span>
                                <label className="w-[30px] h-[30px] cursor-pointer rounded-sm" htmlFor="color" style={{ background: `${currentComponent.color && currentComponent.color !== '#fff' ? currentComponent.color : 'gray'}` }}></label>
                                <input
                                    onChange={(e: any) => setColor(e.target.value)}
                                    type="color" className="invisible" id="color" />
                            </div>
                            {(currentComponent.name === 'main_frame' && image || color) && <div>
                                <button onClick={removeBackground}>Remove Background</button>
                            </div>}
                            {
                                currentComponent.name !== 'main_frame' && <div className='flex flex-col gap-3'>
                                    <div className='flex items-start justify-start gap-1'>
                                        <span className='text-md w-[70px]'>Opacity: </span>
                                        <input
                                            onChange={opacityHandler}
                                            className='w-[70px] border border-gray-700 bg-transparent outline-none px-3 rounded-md'
                                            type="number" step={0.1} min={0.1} max={1} value={currentComponent.opacity} />
                                    </div>
                                    <div className='flex items-start justify-start gap-1'>
                                        <span className='text-md w-[70px]'>Z-Index: </span>
                                        <input
                                            onChange={e => setZIndex(parseInt(e.target.value))}
                                            className='w-[70px] border border-gray-700 bg-transparent outline-none px-3 rounded-md'
                                            type="number" step={1} value={currentComponent.z_index} />
                                    </div>
                                    {
                                        currentComponent.name === 'image' && <div className='flex items-start justify-start gap-1'>
                                            <span className='text-md w-[70px]'>Radius : </span>
                                            <input onChange={(e) => setRadius(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={currentComponent.radius} />
                                        </div>
                                    }
                                    {
                                        currentComponent.name === 'text' && <> <div className='flex items-start justify-start gap-1'>
                                            <span className='text-md w-[70px]'>Padding: </span>
                                            <input
                                                onChange={e => setPadding(e.target.value)}
                                                className='w-[70px] border border-gray-700 bg-transparent outline-none px-3 rounded-md'
                                                type="number" step={1} value={currentComponent.padding} />
                                        </div>
                                            <div className='flex items-start justify-start gap-1'>
                                                <span className='text-md w-[70px]'>Font Size: </span>
                                                <input
                                                    onChange={e => setFont(e.target.value)}
                                                    className='w-[70px] border border-gray-700 bg-transparent outline-none px-3 rounded-md'
                                                    type="number" step={1} value={currentComponent.font} />
                                            </div>
                                            <div className='flex items-start justify-start gap-1'>
                                                <span className='text-md w-[70px]'>Font Weight: </span>
                                                <input
                                                    onChange={e => setWeight(e.target.value)}
                                                    className='w-[70px] border border-gray-700 bg-transparent outline-none px-3 rounded-md'
                                                    type="number" step={100} min={100} max={900} value={currentComponent.weight} />
                                            </div>
                                            <div className='flex items-start justify-start gap-2'>
                                                <input
                                                    onChange={e => setCurrentComponent({
                                                        ...currentComponent,
                                                        title: e.target.value,
                                                    })}
                                                    className='p-2 px-3 bg-transparent border border-gray-700 rounded-md outline-none'
                                                    type="text" value={currentComponent.title} />
                                            </div>
                                            <button
                                                onClick={() => setText(currentComponent.title)}
                                                className="px-4 py-2 text-xs text-white bg-purple-500 rounded-sm">Add</button>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Main