import React from 'react';

interface LoaderProps {
    children: React.ReactNode;
    loader: boolean;
}

const Loader: React.FC<LoaderProps> = ({ children, loader }) => {
    // The loader visibility is controlled by the `loader` prop.
    return loader ? <div className="loader">{children}</div> : <>{children}</>;
};

export default Loader;
