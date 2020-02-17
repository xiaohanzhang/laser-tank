import styled from 'styled-components';

const Popup = styled.div`
    position: fixed; 
    overflow: scroll;
    padding: 10px;
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
`;

export default Popup;
