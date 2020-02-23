import { map, toNumber, isEmpty } from 'lodash';
import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { GameBackgrounds, GameObstacles, Tile } from '../game/tiles';
import gameSlice, { CMD, exec } from '../game/game';
import BoardTile from '../game/BoardTile';
import { getTunnelColor } from '../game/files';
import ControlButton from '../../components/ControlButton';
import Popup from '../../components/Popup';

const EditorPanel = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    padding: 0 1px;

    div {
        flex: 0 0 42px;
        margin: 1px;
    }
`;

const FormTable = styled.table`
    width: 100%;
    font-size: 18px;

    th {
        text-align: left;
    }

    td > * {
        width: 100%;
    }

    input, textarea {
        font-size: 18px;
    }
`;

const EditorControl = () => {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const formData: {[key: string]: any} = {};
    const handleChange = (field: string) => {
        return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            formData[field] = e.target.value;
        }
    }

    return <EditorPanel>
        {map([{
            background: GameBackgrounds.DIRT,
        }, {
            object: GameObstacles.TANT,
        }, {
            background: GameBackgrounds.FLAG,
        }, {
            background: GameBackgrounds.WATER,
        }, {
            object: GameObstacles.SOLID_BLOCK,
        }, {
            object: GameObstacles.MOVABLE_BLOCK,
        }, {
            object: GameObstacles.BRICKS,
        }, {
            object: GameObstacles.ANTI_TANK_N,
        }, {
            object: GameObstacles.ANTI_TANK_E,
        }, {
            object: GameObstacles.ANTI_TANK_S,
        }, {
            object: GameObstacles.ANTI_TANK_W,
        }, {
            object: GameObstacles.MIRROR_NW,
        }, {
            object: GameObstacles.MIRROR_NE,
        }, {
            object: GameObstacles.MIRROR_SE,
        }, {
            object: GameObstacles.MIRROR_SW,
        }, {
            background: GameBackgrounds.TANK_MOVER_N,
        }, {
            background: GameBackgrounds.TANK_MOVER_E,
        }, {
            background: GameBackgrounds.TANK_MOVER_S,
        }, {
            background: GameBackgrounds.TANK_MOVER_W,
        }, {
            object: GameObstacles.CRYSTAL_BLOCK,
        }, {
            object: GameObstacles.ROTARY_MIRROR_NW,
        }, {
            object: GameObstacles.ROTARY_MIRROR_NE,
        }, {
            object: GameObstacles.ROTARY_MIRROR_SE,
        }, {
            object: GameObstacles.ROTARY_MIRROR_SW,
        }, {
            background: GameBackgrounds.ICE,
        }, {
            background: GameBackgrounds.THIN_ICE,
        }, {
            background: GameBackgrounds.TUNNEL,
        }], (data, i) => {
            const tile: Tile = {
                background: GameBackgrounds.DIRT,
                ...data,
            };
            return <BoardTile key={i}
                tile={tile}
                tileSize={42}
                onClick={(e) => {
                    if (tile.background === GameBackgrounds.TUNNEL) {
                        const id = toNumber(prompt('Enter the ID Number for this Tunnel (0-7): '));
                        if (id >= 0 && id <= 7) {
                            tile.color = getTunnelColor(id);
                        }
                    }
                    dispatch(gameSlice.actions.selectEditorTile(tile));
                }}
            />
        })}
        <div style={{ flex: '1 0 178px' }}>
            {map([
                [
                    { name: 'Save Level', onClick: () => {
                        setShowPopup(true);
                    }}, 
                    { name: 'Close Editor', cmd: CMD.TOGGLE_EDITOR },
                ],
            ], (row: [], i) => {
                return <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                    {map(row, (
                        { name, cmd, onClick, disabled }: 
                        { name: string, cmd?: CMD, onClick?: any, disabled?: boolean }, 
                        j
                    ) => {
                        return <ControlButton key={j} disabled={disabled} onClick={(e) => {
                            if (onClick) {
                                onClick(e);
                            } else if (cmd) {
                                dispatch(exec(cmd))
                            }
                        }}>{name}</ControlButton>
                    })}
                </div>
            })}
        </div>
        {showPopup && <Popup onClose={() => setShowPopup(false)}>
            <FormTable style={{ padding: '0 15px' }}>
                <tbody>
                    <tr><th>Level Name: </th><td><input type="text" onChange={handleChange('levelName')}/></td></tr>
                    <tr><th>Author: </th><td><input type="text" onChange={handleChange('author')}/></td></tr>
                    <tr>
                        <th>Difficulty: </th>
                        <td>
                            <select onChange={handleChange('scoreDifficulty')}>
                                <option value="1">Kids</option>
                                <option value="2">Easy</option>
                                <option value="4">Medium</option>
                                <option value="8">Hard</option>
                                <option value="16">Deadly</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Hint: </th>
                        <td><textarea rows={8} onChange={handleChange('hint')}></textarea></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <ControlButton onClick={() => {
                                const errors = [];
                                if (!(formData.levelName && formData.author)) {
                                    errors.push('Level Name and Author can not be empty.');
                                }
                                const scoreDifficulty = toNumber(formData.scoreDifficulty) || 1;
                                if (![1, 2, 4, 8, 16].includes(scoreDifficulty)) {
                                    errors.push('Please select a difficulty from dropdown.')
                                }
                                if (!isEmpty(errors)) {
                                    alert(errors.join('\n'));
                                } else {
                                    setShowPopup(false);
                                    dispatch(exec(CMD.SAVE_LEVEL, formData));
                                }
                            }}>Save Level</ControlButton>
                        </td>
                    </tr>
                </tbody>
            </FormTable>
        </Popup>}
    </EditorPanel>
}

export default EditorControl;