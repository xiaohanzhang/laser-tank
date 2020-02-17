import { map, min, range, bindAll, debounce } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/rootReducer';
import gameSlice, { 
    fire, clickBoard, exec, renderFrame, BOARD_SIZE, CMD, GameState, DIRECTION, 
} from './game';
import { Tile } from './tiles';
import BoardTile from './BoardTile';
import './Board.css';

interface BoardProps {
    game: GameState,
    animation: boolean,
    dispatch: any,
}

interface BoardState {
    limit: number,
}

const BoardRow = React.memo((
    { row, rowIndex, tileSize }: {row: Tile[], rowIndex: number, tileSize: number}
) => {
    const dispatch = useDispatch();
    return <div className="row">
        {map(row, (tile, j) => {
            const x = j;
            const y = rowIndex;
            return <BoardTile key={j} tile={tile} tileSize={tileSize}
                onClick={(e) => {
                    dispatch(clickBoard(x, y));
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    dispatch(fire(x, y));
                }}
            />
        })}
    </div>
});

const directionToStr = (direction: DIRECTION) => {
    const directionMap: {[key in DIRECTION]: string} = {
        [CMD.UP]: 'N',
        [CMD.DOWN]: 'S',
        [CMD.LEFT]: 'W',
        [CMD.RIGHT]: 'E',
    };
    return directionMap[direction];
}

class Board extends React.Component<BoardProps, BoardState> {
    state = { limit: 0 };
    boardRef = React.createRef<HTMLInputElement>();
    interval!: number;

    constructor(props: BoardProps) {
        super(props)
        bindAll(this, ['handleResize']);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        const animations = ['bg0', 'bg1', 'bg2'];
        this.interval = setInterval(async () => {
            if (this.props.animation) {
                const el = this.boardRef.current;
                if (el) {
                    const backgrounds = el.querySelectorAll([
                        '.ANTI_TANK_N', '.ANTI_TANK_E', '.ANTI_TANK_S', '.ANTI_TANK_W',
                        '.TANK_MOVER_N', '.TANK_MOVER_S', '.TANK_MOVER_W', '.TANK_MOVER_E',
                        '.FLAG', '.WATER',
                    ].join(', '));
                    const bg = animations.shift() || '';
                    backgrounds.forEach((background) => {
                        background.classList.remove(...animations);
                        background.classList.add(bg);
                    });
                    animations.push(bg);
                }
            }
        }, 600);
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        clearInterval(this.interval);
    }

    handleResize() {
        if (this.boardRef.current) {
            const { offsetWidth: width, offsetHeight: height } = this.boardRef.current;
            this.setState({ limit: min([width, height]) ?? 0 });
        }
    }

    shouldComponentUpdate(nextProps: BoardProps, nextState: BoardState) {
        return nextState.limit !== this.state.limit ||
            nextProps.game.timer !== this.props.game.timer 
        ;
    }

    render() {
        const { game, dispatch } = this.props;
        const { limit } = this.state;
        const { board, tank, laser } = game;
        const tileSize = Math.floor(limit / (BOARD_SIZE + 2));
        const tileStyle = { width: tileSize, height: tileSize };
        return <div ref={this.boardRef} className="Board">
            <div>
                {map([
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'
                ], (letter, i) => {
                    return <div key={i} style={{ width: tileSize, display: 'inline-block' }}>{letter}</div>
                })}
            </div>
            <div style={{
                width: tileSize * BOARD_SIZE, height: tileSize * BOARD_SIZE, margin: '0 auto'
            }}>
                {map(board, (row, i) => {
                    return <BoardRow key={i} rowIndex={i} row={row} tileSize={tileSize}/>
                })}
                {map(range(BOARD_SIZE), (i) => {
                    return <div key={i} style={{
                        position: 'absolute', verticalAlign: 'center', lineHeight: `${tileSize}px`,
                        left: -tileSize, top: i * tileSize
                    }}>{i + 1}</div>
                })}
                <div className={`tank TANK_${directionToStr(tank.direction)}`} 
                    style={{ 
                        left: tank.x * tileSize, top: tank.y * tileSize, ...tileStyle
                    }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        dispatch(fire(tank.x, tank.y));
                    }}
                />
                {laser && <div className={`laser ${directionToStr(laser.direction)}`} 
                    style={[CMD.UP, CMD.DOWN].includes(laser.direction) ? { 
                        left: laser.x * tileSize + (tileSize / 2 - 2), 
                        top: laser.y * tileSize, 
                        ...tileStyle, width: 4,
                    } : {
                        left: laser.x * tileSize, 
                        top: laser.y * tileSize + (tileSize / 2 - 1), 
                        ...tileStyle, height: 4,
                    }}
                />}
            </div>
            <div>
                {map(range(0, 16), (i) => {
                    return <div key={i} style={{ width: tileSize, display: 'inline-block' }}>{i + 1}</div>
                })}
            </div>
        </div>
    }
}

export default () => {
    const game = useSelector((state: RootState) => state.game)
    const ui = useSelector((state: RootState) => state.ui)
    const dispatch = useDispatch();
    const { status, levelIndex, } = game;
    const debounceRenderFrame = debounce(() => {
        return dispatch(renderFrame());
    }, ui.renderInterval);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const cmdMap: {[key: string]: CMD} = {
                ARROWUP: CMD.UP,
                ARROWDOWN: CMD.DOWN,
                ARROWLEFT: CMD.LEFT,
                ARROWRIGHT: CMD.RIGHT,
                'U': CMD.UNDO,
                ' ': CMD.FIRE,
                'P': CMD.PAUSE,
            };
            const cmd = cmdMap[e.key.toUpperCase()];
            if (cmd) {
                dispatch(exec(cmd));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [dispatch]);

    useEffect(() => {
        if (game.rendering && !game.pause) {
            debounceRenderFrame();
        }
    }, [debounceRenderFrame, game]);

    useEffect(() => {
        if (status === 'WIN') {
            debounceRenderFrame.cancel();
            dispatch(gameSlice.actions.loadLevel(levelIndex + 1));
        }
    }, [dispatch, levelIndex, status, debounceRenderFrame])

    return <Board game={game} animation={ui.animation} dispatch={dispatch}/>
}