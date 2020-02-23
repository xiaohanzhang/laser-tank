import { map, toNumber, isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'app/rootReducer';
import Popup from 'components/Popup';
import gameSlice, { exec, db, CMD, isDirection, TLEVEL } from '../game/game';
import uiSlice from '../ui/ui';
import EditorControl from './EditorPanel';

import './ControlPanel.css';

const { setRenderInterval } = uiSlice.actions;

const LevelsPopup = (
    { levels, onClick, onClose }: 
    { levels: TLEVEL[], onClick: (i: number) => void , onClose: () => void}
) => {
    return <Popup className="LevelsPopup" onClose={onClose}>
        <table>
            <thead>
                <tr>
                    <th>Lev #</th>
                    <th>Name</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                {map(levels, (level, i) => {
                    return <tr key={i} className={i % 2 === 0 ? 'odd' : 'even'} onClick={() => {
                        onClick(i);
                    }}>
                        <td>{i + 1}</td>
                        <td>{level.levelName}</td>
                        <td>{level.author}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </Popup>
}

export default () => {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game);
    const ui = useSelector((state: RootState) => state.ui);
    const [showPopup, setShowPopup] = useState(false);
    const { levelIndex, level, positionSaved, frameIndex, pendingMoves, autoRec, editor } = game;
    const { record } = db;
    let lastCmd = CMD.UP;
    let numShoot = 0;
    let numMove = 0;
    map(record, (cmd) => {
        if (!isDirection(cmd)) {
            numShoot += 1;
        } else if (cmd === lastCmd) {
            numMove += 1;
        } else {
            lastCmd = cmd;
        }
    });

    return <div className="control-panel">
        <div className="info" style={{ position: 'relative' }}>
            {level && <>
                <div style={{ 
                    position: 'absolute', 
                    // top: '16%', left: '24%', height: '8%', width: '52%',
                    top: 39, left: 43, height: 20, width: 93,
                    textAlign: 'center', color: '#0df90a',
                }}>{levelIndex + 1}</div>
                <div style={{ 
                    position: 'absolute', 
                    // top: '39%', left: '5%', height: '8%', width: '90%',
                    top: 95, left: 9, height: 20, width: 160,
                    textAlign: 'center', color: '#0df90a', 
                    fontSize: level.levelName.length > 20 ? 11 : 14
                }}>{level.levelName}</div>
                <div style={{ 
                    position: 'absolute', 
                    // top: '59%', left: '5%', height: '8%', width: '90%',
                    top: 144, left: 9, height: 20, width: 160,
                    textAlign: 'center', color: '#0df90a',
                    fontSize: level.author.length > 20 ? 11 : 14
                }}>{level.author}</div>
                {/* <div>{level.scoreDifficulty}</div> */}
                <div style={{ 
                    position: 'absolute',
                    // top: '82%', left: '11%', height: '8%', width: '32%',
                    top: 200, left: 20, height: 20, width: 57,
                    textAlign: 'center', color: '#0df90a',
                }}>{numMove}</div>
                <div style={{ 
                    position: 'absolute', 
                    // top: '82%', left: '58%', height: '8%', width: '32%',
                    top: 200, left: 103, height: 20, width: 57,
                    textAlign: 'center', color: '#0df90a',
                }}>{numShoot}</div>

                <div>{}</div>
            </>}
        </div>
        {editor ? <EditorControl/> : <div className="control">
            {map([
                isEmpty(pendingMoves) && [
                    { name: 'Undo', cmd: CMD.UNDO, disabled: frameIndex > 0 }, 
                    { name: 'Hint', onClick: () => {
                        if (level?.hint) {
                            alert(level?.hint);
                        }
                    }},
                ],
                isEmpty(pendingMoves) && [
                    { name: 'Save', disabled: frameIndex > 0, cmd: CMD.SAVE_POSITION }, 
                    { 
                        name: 'Restore', cmd: CMD.RESTORE_POSITION, 
                        disabled: frameIndex > 0 && !positionSaved 
                    },
                ],
                isEmpty(pendingMoves) && [
                    { name: 'Restart', cmd: CMD.RESTART }, 
                    { name: 'Load Level', onClick: () => { setShowPopup(true); }}
                ],
                isEmpty(pendingMoves) && [
                    { name: '<< Level', cmd: CMD.PREV_LEVEL }, 
                    { name: 'Level >>', cmd: CMD.NEXT_LEVEL }

                ],
                !isEmpty(pendingMoves) && [
                    { name: autoRec ? 'Pause' : 'Auto', cmd: CMD.TOGGLE_AUTO_REC }, 
                    { name: 'Close Rec', cmd: CMD.CLOSE_REC }, 
                ],
                !isEmpty(pendingMoves) && !autoRec && [
                    { name: '<< Step', cmd: CMD.PREV_REC }, 
                    { name: 'Step >>', cmd: CMD.NEXT_REC }, 
                ],
                isEmpty(pendingMoves) && [
                    { name: '<< Frame', cmd: CMD.PREV_FRAME }, 
                    { name: 'Frame >>', cmd: CMD.NEXT_FRAME, disabled: frameIndex === 0 }
                ],
            ].filter(Boolean), (row: [], i) => {
                return <div key={i}>
                    {map(row, (
                        { name, cmd, onClick, disabled }: 
                        { name: string, cmd?: CMD, onClick?: any, disabled?: boolean }, 
                        j
                    ) => {
                        return <button key={j} disabled={disabled} onClick={(e) => {
                            if (onClick) {
                                onClick(e);
                            } else if (cmd) {
                                dispatch(exec(cmd))
                            }
                        }}>{name}</button>
                    })}
                </div>
            })}
            <div style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div>
                    <label style={{ flex: 1 }}>speed(0 - 10000): </label>
                </div>
                <div>
                    <input style={{ flex: 3 }} value={ui.renderInterval} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch(setRenderInterval(toNumber(e.target.value)));
                        }}
                    />
                    <span>ms</span>
                </div>
            </div>
        </div>}
        {showPopup && <LevelsPopup levels={db.levels} 
            onClose={() => setShowPopup(false)}
            onClick={(i) => {
                dispatch(gameSlice.actions.loadLevel(i));
                setShowPopup(false);
            }}
        />}
    </div>
}