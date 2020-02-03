import { map } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { openDataFile } from '../../features/game/game';

import './MenuBar.css';

export default () => {
    const dispatch = useDispatch();
    const [currentMenu, setMenu] = useState<null|{ menu: any, top: number, left: number}>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(e.target?.result);
            if (e.target?.result) {
                dispatch(openDataFile(e.target?.result as ArrayBuffer));
            }
        };
        reader.readAsArrayBuffer(file);
    }

    return <div className="MenuBar">
        {map([
            {
                name: 'Game',
                items: [
                    {
                        render: () => {
                            return <div>
                                <label>
                                    Open Data File
                                    <input id="fileInput" type="file" 
                                        style={{display: 'none'}} 
                                        onChange={(e) => {
                                            const files = e.currentTarget.files;
                                            if (files?.length) {
                                                handleFile(files[0]);
                                            }
                                            setMenu(null);
                                        }}
                                    />
                                </label>
                            </div>
                        },
                    },
                ],
            },
            {
                name: 'Options',
                items: [
                    {name: 'Animation'},
                    // {name: 'Sound'},
                ],
            },
            {
                name: 'Editor', 
                onClick: () => {
                    setMenu(null);
                },
            },
            {
                name: 'Help',
                items: [
                    {name: 'About'},
                ],
            },
        ], (menu, i) => {
            const { name, ...props } = menu;
            return <div key={i}
                className={`MenuBarItem ${name === currentMenu?.menu.name ? 'active ' : ''}`} 
                onClick={(event) => {
                    const { offsetTop, offsetHeight, offsetLeft } = event.currentTarget;
                    setMenu(currentMenu ? null : {
                        menu,
                        top: offsetTop + offsetHeight,
                        left: offsetLeft,
                    });
                }}
                onMouseEnter={(event) => {
                    const { offsetTop, offsetHeight, offsetLeft } = event.currentTarget;
                    if (currentMenu) {
                        setMenu({
                            menu,
                            top: offsetTop + offsetHeight,
                            left: offsetLeft,
                        });
                    }
                }}
                {...props}
            >{name}</div>
        })}
        {<ul className="Menu" style={!currentMenu?.menu.items ? {display: 'none'} : {
            top: currentMenu.top,
            left: currentMenu.left,
        }}>
            {map(currentMenu?.menu.items, ({ name, render }, i) => {
                return <li key={i}>
                    {render ? render() : name}
                </li>;
            })}
        </ul>}
    </div>
}