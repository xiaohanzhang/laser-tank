import { map } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import gameSlice from '../../features/game/game';
import { openDataFile, openReplayFile } from '../../features/game/files';

import './MenuBar.css';

export default () => {
    const dispatch = useDispatch();
    const { actions } = gameSlice;
    const [currentMenu, setMenu] = useState<null|{ menu: any, top: number, left: number}>(null);

    const handleFile = (file: File, fileType: string) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const buffer = e.target?.result as ArrayBuffer
                if (fileType === 'lvl') {
                    dispatch(actions.loadLevels({
                        levels: openDataFile(buffer),
                        levelIndex: 0
                    }));
                } else {
                    const { records } = openReplayFile(buffer);
                    dispatch(actions.pendingMoves(records));
                }
            }
        };
        reader.readAsArrayBuffer(file);
    }

    return <div className="MenuBar">
        {map([
            {
                name: 'Game',
                items: [{
                    render: () => {
                        return <div>
                            <label>
                                Open Data File
                                <input type="file" style={{display: 'none'}} 
                                    onChange={(e) => {
                                        const files = e.currentTarget.files;
                                        if (files?.length) {
                                            handleFile(files[0], 'lvl');
                                        }
                                        setMenu(null);
                                    }}
                                />
                            </label>
                        </div>
                    },
                }, {
                    render: () => {
                        return <div>
                            <label>
                                Open Playback File
                                <input type="file" style={{display: 'none'}} 
                                    onChange={(e) => {
                                        const files = e.currentTarget.files;
                                        if (files?.length) {
                                            handleFile(files[0], 'lpb');
                                        }
                                        setMenu(null);
                                    }}
                                />
                            </label>
                        </div>
                    },
                }],
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