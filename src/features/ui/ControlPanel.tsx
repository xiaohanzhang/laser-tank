import { get, map, max, filter } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/rootReducer';
import { exec, db, CMD, isDirection } from '../game/game';

export default () => {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game);
    const { levelIndex, levels } = game;
    const { record } = db;
    const level = get(levels, [levelIndex]);
    const numShoot = filter(record, (cmd) => !isDirection(cmd)).length;
    const numMove = record.length - numShoot;

    return <div className="control-panel">
        <div className="info" style={{ position: 'relative' }}>
            {level && <>
                <div style={{ 
                    position: 'absolute', top: '16%', left: '24%', height: '8%', width: '52%',
                    textAlign: 'center', color: '#0df90a',
                }}>{levelIndex + 1}</div>
                <div style={{ 
                    position: 'absolute', top: '39%', left: '5%', height: '8%', width: '90%',
                    textAlign: 'center', color: '#0df90a', fontSize: `${max([0.25 * 0.90 / level.levelName.length, 1.7])}vw`
                }}>{level.levelName}</div>
                <div style={{ 
                    position: 'absolute', top: '59%', left: '5%', height: '8%', width: '90%',
                    textAlign: 'center', color: '#0df90a',
                }}>{level.author}</div>
                {/* <div>{level.scoreDifficulty}</div> */}
                <div style={{ 
                    position: 'absolute', top: '82%', left: '11%', height: '8%', width: '32%',
                    textAlign: 'center', color: '#0df90a',
                }}>{numMove}</div>
                <div style={{ 
                    position: 'absolute', top: '82%', left: '58%', height: '8%', width: '32%',
                    textAlign: 'center', color: '#0df90a',
                }}>{numShoot}</div>

                <div>{}</div>
            </>}
        </div>
        <div className="control">
            {map([
                [
                    { name: 'Undo', cmd: CMD.UNDO },
                    {
                        name: 'Hint', onClick: () => {
                            if (level?.hint) {
                                alert(level?.hint);
                            }
                        }
                    },
                ],
                [{ name: 'Save Position' }],
                [{ name: 'Restore Position' }],
                [{ name: 'New' }, { name: 'Restart' }],
                [{ name: 'Load Level' }],
                [{ name: '<< Level', cmd: CMD.PREV_LEVEL }, { name: 'Level >>', cmd: CMD.NEXT_LEVEL }],
            ], (row, i) => {
                return <div key={i}>
                    {map(row, ({ name, cmd, onClick }: { name: string, cmd?: CMD, onClick?: any }, j) => {
                        return <div key={j} onClick={(e) => {
                            if (onClick) {
                                onClick(e);
                            } else if (cmd) {
                                dispatch(exec(cmd))
                            }
                        }}>{name}</div>
                    })}
                </div>
            })}
        </div>
    </div>
}