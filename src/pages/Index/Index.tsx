/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { IoMdClose } from 'react-icons/io'
import { useAppDispatch } from "../../hooks/hooks"
import { login, register } from "../../redux/auth/auth.slice"
import { minimalToast } from "../../utils/minimalToast"
import Loader from "../../components/Loader/Loader"

const Index = () => {
    const [show, setShow] = useState(false)
    const [loader, setLoader] = useState(false)
    const [type, setType] = useState('signup')
    const [state, setState] = useState({
        name: '', email: '', password: ''
    })
    const dispatch = useAppDispatch();

    const inputHandler = (e: any) => {
        setState({
            ...state, [e.target.name]: e.target.value
        })
    }

    const userRegistration = async (e: any) => {
        try {
            setLoader(true)
            e.preventDefault();
            await dispatch(register(state));
            setType('signin')
            setLoader(false)
        } catch (error: any) {
            setLoader(false)
            console.log("error", error)
            minimalToast(error.message, "error")
        }
    }

    const userLogin = async (e: any) => {
        try {
            setLoader(true)
            e.preventDefault();
            await dispatch(login(state));
            setShow(false)
            setLoader(false)
        } catch (error: any) {
            setLoader(false)
            console.log("error", error)
            minimalToast(error.message, "error")
        }
    }

    return (
        <Loader loader={loader}>
            <div className="bg-[#18191b] min-h-screen w-full">
                <div className={`w-screen ${show ? 'visible opacity-100' : 'invisible'} transition-none duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center`}>
                    <div className="w-[350px] bg-[#323335] m-auto px-6 py-4 rounded-md relative">
                        <div className="absolute text-xl text-white cursor-pointer right-4 top-4"><IoMdClose onClick={() => setShow(false)} /></div>
                        <h2 className="pb-4 text-xl text-center text-white">Login or Sign up in seconds</h2>
                        {
                            type === 'signin' && (
                                <form onSubmit={userLogin}>
                                    <div className="flex flex-col gap-3 mb-3 text-white">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            onChange={inputHandler}
                                            type="email" name="email" id="email" placeholder="email" value={state.email} className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] hover:border-purple-500 bg-transparent" />
                                    </div>
                                    <div className="flex flex-col gap-3 mb-3 text-white">
                                        <label htmlFor="email">Password</label>
                                        <input
                                            onChange={inputHandler}
                                            type="password" name="password" id="password" placeholder="password" value={state.password} className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] hover:border-purple-500 bg-transparent" />
                                    </div>
                                    <div>
                                        <button className="w-full px-3 py-2 text-white bg-purple-500 rounded-md outline-none hover:bg-purple-600">Sign In</button>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-4">
                                    </div>
                                </form>
                            )
                        }
                        {type === 'signup' && (
                            <form onSubmit={userRegistration}>
                                <div className="flex flex-col gap-3 mb-3 text-white">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                        onChange={inputHandler}
                                        name="name" id="name" placeholder="name" value={state.name} className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] hover:border-purple-500 bg-transparent" />
                                </div>
                                <div className="flex flex-col gap-3 mb-3 text-white">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        onChange={inputHandler}
                                        type="email" name="email" id="email" placeholder="email" value={state.email} className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] hover:border-purple-500 bg-transparent" />
                                </div>
                                <div className="flex flex-col gap-3 mb-3 text-white">
                                    <label htmlFor="email">Password</label>
                                    <input
                                        onChange={inputHandler}
                                        type="password" name="password" id="password" placeholder="password" value={state.password} className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] hover:border-purple-500 bg-transparent" />
                                </div>
                                <div>
                                    <button className="w-full px-3 py-2 text-white bg-purple-500 rounded-md outline-none hover:bg-purple-600">Sign Up</button>
                                </div>
                                <div className="flex items-center justify-between px-3 py-4">
                                </div>
                            </form>
                        )}

                    </div>
                </div>
                <div className="bg-[#252627] shadow-md">
                    <div className="w-[93%] m-auto py-3">
                        <div className="flex items-center justify-between">
                            <div className="w-[80px] h-[48px]">
                                <img className="w-full h-full" src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg" alt="logo" />
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => { setShow(true), setType('signin') }} className="py-2 w-[80px] text-center bg-blue-500 text-white transition-all hover:bg-blue-600 rounded-[5px] font-medium">
                                    Sign In
                                </button>
                                <button onClick={() => { setShow(true), setType('signup') }} className="py-2 w-[80px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items-center justify-center w-full h-full p-4">
                    <div className="py-[168px] flex justify-center items-center flex-col gap-6">
                        <h2 className="text-5xl text-[#c7c5c5]">What will you design today??</h2>
                        <span className="text-[#aca9a9] text-2xl font-medium">Canva makes it easy to create and share professional designs.</span>
                        <button onClick={() => setShow(true)} className="py-2 w-[200px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium">Sign Up for free</button>
                    </div>
                </div>
            </div >
        </Loader>
    )
}

export default Index