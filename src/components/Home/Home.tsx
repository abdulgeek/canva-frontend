/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { api } from "../../services/Api";
import { useAppSelector } from "../../hooks/hooks";
import { minimalToast } from "../../utils/minimalToast";
import Item from "./Item";

const Home = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { access_token } = useAppSelector((state: any) => state.auth)
    const [designs, setDesign] = useState([])
    const [state, setState] = useState({
        width: 0,
        height: 0
    })
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4
        }
    };

    const inputHandler = (e: any) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const create = (e: any) => {
        e.preventDefault();
        navigate('/design/create', {
            state: {
                type: 'create',
                width: state.width,
                height: state.height
            }
        })
    }

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
        <div className='w-full pt-5'>
            <div className='w-full flex justify-center items-center h-[250px] bg-gradient-to-r from-[#4c76cf] to-[#552ab8] relative rounded-md overflow-hidden'>
                <button
                    onClick={() => setShow(!show)}
                    className="px-4 py-2 text-[15px] overflow-hidden text-center bg-[#8b3fad] text-white rounded-[3px] font-medium hover:bg-[#8b3dffd3] absolute top-3 right-3"
                >
                    Custom Size
                </button>
                <form
                    onSubmit={e => create(e)}
                    className={`absolute top-16 right-3 bg-[#252627] w-[250px] p-4 text-white ${show ? "visible opacity-100" : "invisible opacity-50"} transition-all duration-500`}
                >
                    <div className="grid grid-cols-2 gap-3 pb-4">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <label htmlFor="width">Width</label>
                            <input required onChange={inputHandler} type="number" id="width" name="width" className="w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md" />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <label htmlFor="height">Height</label>
                            <input required onChange={inputHandler} type="number" id="height" name="height" className="w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md" />
                        </div>
                    </div>
                    <button
                        className="w-full px-4 py-2 text-[13px] text-center bg-[#8b3dffad] text-white rounded-[3px] font-medium hover:bg-[#8b3dffd3] mt-3"
                    >
                        Create New Design
                    </button>
                </form>
                <div>
                    <h2 className="pt-6 pb-10 text-3xl font-semibold text-white">What will you design today?</h2>
                </div>
            </div>
            <div>
                <h2 className="pt-6 pb-10 text-xl font-semibold text-white">Your recent designs</h2>
                <Carousel responsive={responsive} autoPlay={true} infinite transitionDuration={500}>
                    {
                        designs.map((d, i) => <Item delete_design={delete_design} design={d} key={i} type={undefined} />)
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default Home;
