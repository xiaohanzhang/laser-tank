import React from 'react';
import styled from 'styled-components';

const PopupWindow = styled.div`
    position: fixed; 
    overflow: scroll;
    padding: 0 10px 10px 10px;
    width: 80%;
    height: 70%; 
    left: 10%; 
    top: 10%;
    background: white;

    box-shadow: 2px 2px 10px -1px rgba(0,0,0,0.2);
    border-radius: 7px;
`;

export const PopupHeader = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: white;
    padding: 3px;

    .title {
        padding: 7px;
        font-size: 20px;
        font-weight: bolder;
    }

    .close {
        font-size: 24px;
        font-weight: bolder;
        text-align: top;
        cursor: pointer;
    }
`;

export type PopupProps = React.PropsWithChildren<{ 
    header?: React.Component,
    title?: string|React.Component,
    onClose: (event?: React.MouseEvent) => void,
}> & React.HTMLAttributes<HTMLDivElement>;

const Popup = ({ header, title, children, onClose, ...props }: PopupProps) => {
    return <PopupWindow {...props}>
        {header ? header : <PopupHeader>
            <span></span>
            <span className="title">{title}</span>
            <span className="close" onClick={onClose}>&times;</span>
        </PopupHeader>}
        {children}
    </PopupWindow>
}

export default Popup;
