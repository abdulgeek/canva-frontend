/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsTrash, BsFiles, BsThreeDots } from "react-icons/bs";
import { FaCopy, FaPaste, FaCommentDots, FaLink, FaLock } from "react-icons/fa";
import Element from "../Element/Element";
import { useState } from "react";
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
    const [showToolbar, setShowToolbar] = useState(false);

    const renderToolbar = () => (
        <div className="absolute top-0 z-50 flex flex-col gap-1 p-2 mt-8 bg-white rounded-md left-10">
            <div className="flex items-center gap-1 cursor-pointer">
                <FaCopy title="Copy" /> <span>Copy</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
                <FaPaste title="Paste" /> <span>Paste</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
                <FaCommentDots title="Comment" /> <span>Comment</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
                <FaLink title="Link" /> <span>Link</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
                <FaLock title="Lock" /> <span>Lock</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
                <FaLock title="Alt Text" /> <span>Alt Text</span>
            </div>
        </div>
    );

    const renderControls = () => (
        <div className="absolute flex gap-2 p-2 bg-white rounded-md -top-8 -left-18">
            <BsTrash
                className="cursor-pointer"
                onClick={() => removeComponent(info.id)}
                title="Delete"
            />
            <BsFiles
                className="cursor-pointer"
                onClick={() => { }}
                title="Duplicate"
            />
            <BsThreeDots
                className="cursor-pointer"
                onClick={() => setShowToolbar(!showToolbar)}
                title="More"
            />
            {showToolbar && renderToolbar()}
        </div>
    );


    let html: any = "";
    if (info.name === "main_frame") {
        html = (
            <div
                onClick={() => (info.setCurrentComponent || (() => { }))(info)}
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
    if (info.name === "shape" && info.type === "rect") {
        html = (
            <div
                id={randValue}
                onClick={() => (info.setCurrentComponent || (() => { }))(info)}
                style={{
                    width: info.width + "px",
                    height: info.height + "px",
                    background: info.color,
                    opacity: info.opacity,
                    left: info.left + "px",
                    top: info.top + "px",
                    zIndex: info.z_index,
                    transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
                }}
                className="absolute group hover:border-[2px] hover:border-indigo-500"
            >
                <Element id={randValue} info={info} exId={""} />
                {currentComponent.id === info.id && renderControls()}
            </div>
        );
    }
    if (info.name === "shape" && info.type === "circle") {
        html = (
            <div
                id={randValue}
                onClick={() => (info.setCurrentComponent || (() => { }))(info)}
                style={{
                    left: info.left + "px",
                    top: info.top + "px",
                    zIndex: info.z_index,
                    transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
                }}
                className="absolute group hover:border-[2px] hover:border-indigo-500"
            >
                <Element id={randValue} info={info} exId={`${randValue}c`} />
                {currentComponent.id === info.id && renderControls()}
                <div
                    id={`${randValue}c`}
                    className="rounded-full"
                    style={{
                        width: info.width + "px",
                        height: info.width + "px",
                        background: info.color,
                        opacity: info.opacity,
                    }}
                ></div>
            </div>
        );
    }
    if (info.name === "shape" && info.type === "traingle") {
        html = (
            <div
                id={randValue}
                onClick={() => (info.setCurrentComponent || (() => { }))(info)}
                style={{
                    left: info.left + "px",
                    top: info.top + "px",
                    zIndex: info.z_index,
                    transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
                }}
                className="absolute group hover:border-[2px] hover:border-indigo-500"
            >
                {currentComponent.id === info.id && renderControls()}
                <Element id={randValue} info={info} exId={`${randValue}t`} />
                <div
                    id={`${randValue}t`}
                    style={{
                        width: info.width + "px",
                        height: info.height + "px",
                        background: info.color,
                        opacity: info.opacity,
                        clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                    }}
                ></div>
            </div>
        );
    }

    if (info.name === "text") {
        html = (
            <div
                id={randValue}
                onClick={() => (info.setCurrentComponent || (() => { }))(info)}
                style={{
                    left: info.left + "px",
                    top: info.top + "px",
                    zIndex: info.z_index,
                    transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
                    padding: info.padding + "px",
                    color: info.color,
                    opacity: info.opacity,
                }}
                className="absolute group hover:border-[2px] hover:border-indigo-500"
            >
                {currentComponent.id === info.id && renderControls()}
                <Element id={randValue} info={info} exId={`${randValue}t`} />
                <h2
                    style={{
                        fontSize: info.font + "px",
                        fontWeight: info.weight,
                    }}
                    className="w-full h-full"
                >
                    {info.title}
                </h2>
            </div>
        );
    }
    if (info.name === "image") {
        html = (
            <div
                id={randValue}
                onClick={() => (info.setCurrentComponent || (() => { }))(info)}
                style={{
                    left: info.left + "px",
                    top: info.top + "px",
                    zIndex: info.z_index,
                    transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
                    opacity: info.opacity,
                }}
                className="absolute group hover:border-[2px] hover:border-indigo-500"
            >
                <Element id={randValue} info={info} exId={`${randValue}img`} />
                {currentComponent.id === info.id && renderControls()}{" "}
                <div
                    className="overflow-hidden"
                    id={`${randValue}img`}
                    style={{
                        width: info.width + "px",
                        height: info.height + "px",
                        borderRadius: `${info.radius}%`,
                    }}
                >
                    <img className="w-full h-full" src={info.image} alt="image" />
                </div>
            </div>
        );
    }
    return html;
};

export default CreateComponent;
