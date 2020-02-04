import { get, map } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/rootReducer';
import { exec } from '../game/game';

export default () => {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game);
    const { levelIndex, levels } = game;
    const level = get(levels, [levelIndex]);

    return <div className="control-panel">
        <div className="info"></div>
        <div className="control">
            {map([
                [
                    { name: 'Undo', cmd: 'UNDO' },
                    {
                        name: 'Hint', cmd: 'HINT', onClick: () => {
                            if (level?.hint) {
                                alert(level?.hint);
                            }
                        }
                    },
                ],
                [{ name: 'Save Position', cmd: '' }],
                [{ name: 'Restore Position', cmd: '' }],
                [{ name: 'New', cmd: '' }, { name: 'Restart', cmd: '' }],
                [{ name: 'Load Level', cmd: '' }],
                [{ name: '<< Level', cmd: 'PREV_LEVEL' }, { name: 'Level >>', cmd: 'NEXT_LEVEL' }],
            ], (row, i) => {
                return <div key={i}>
                    {map(row, ({ name, cmd, onClick }: { name: string, cmd: string, onClick?: any }, j) => {
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