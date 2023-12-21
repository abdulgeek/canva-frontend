/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from 'react-router-dom'
import * as htmlToImage from 'html-to-image';
import { useEffect, useRef, useState } from "react";
import CreateComponent from "../CreateComponent/CreateComponent";
import { api } from '../../services/Api';
import { useAppSelector } from '../../hooks/hooks';

const CreateDesign = () => {
    const [loader, setLoader] = useState(false);
    console.log(loader)
    const ref = useRef<any>(null)
    const { access_token } = useAppSelector((state: any) => state.auth)

    const { state } = useLocation()

    const navigate = useNavigate()
    const obj = {
        name: 'main_frame',
        type: 'rect',
        id: Math.floor((Math.random() * 100) + 1),
        height: state.height,
        width: state.width,
        z_index: 1,
        color: 'green',
        image: '',
    }


    const createDesign = async () => {
        try {
            const imageBlob = await htmlToImage.toBlob(ref.current);
            console.log("Image Blob: ", imageBlob);

            if (imageBlob) {
                const design = JSON.stringify(obj);
                const formData = new FormData();
                formData.append('design', design);
                formData.append('image', imageBlob, 'design.png');
                console.log("formData", formData)
                for (const pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }

                setLoader(true);
                const { data } = await api.design.createUserDesign(formData, access_token);
                console.log("data", data)
                navigate(`/design/${data._id}/edit`);
                setLoader(false);
            } else {
                console.error("Image Blob is empty");
            }
        } catch (error) {
            setLoader(false);
            console.error("Error in createDesign: ", error);
        }
    }

    useEffect(() => {
        if (state && ref.current) {
            createDesign()
        } else {
            navigate('/')
        }
    }, [state, ref])

    return (
        <div className="relative flex items-center justify-center w-screen h-screen">
            <div ref={ref} className="relative w-auto h-auto overflow-auto">
                <CreateComponent info={obj} currentComponent={undefined} removeComponent={undefined} />
            </div>
        </div>
    )
}

export default CreateDesign