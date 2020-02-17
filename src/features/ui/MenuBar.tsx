import { map } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import gameSlice, { exec, CMD } from '../../features/game/game';
import uiSlice from '../../features/ui/ui';
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
                    dispatch(exec(CMD.LOAD_REC, records));
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
                }, {
                    name: 'Save Recording',
                    onClick: () => {
                        dispatch(exec(CMD.EXPORT_REC))
                    },
                }],
            },
            {
                name: 'Options',
                items: [
                    {name: 'Animation', onClick: () => { 
                        dispatch(uiSlice.actions.toggleAnimation());
                    }},
                    // {name: 'Sound'},
                ],
            },
            {
                name: 'Editor', 
                onClick: () => {
                    setMenu(null);
                    dispatch(exec(CMD.TOGGLE_EDITOR))
                },
            },
            {
                name: 'Help',
                items: [
                    {name: 'About'},
                ],
            },
            {
                name: 'GitHub',
                onClick: () => {
                    window.open('https://github.com/xiaohanzhang/laser-tank');
                },
            }
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
            {map(currentMenu?.menu.items, ({ name, render, ...props }, i) => {
                return <li key={i}>
                    {render ? render() : <div {...props}>{name}</div>}
                </li>;
            })}
        </ul>}
    </div>
}