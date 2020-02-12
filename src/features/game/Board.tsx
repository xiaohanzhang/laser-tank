import { map, min, range, bindAll, debounce } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/rootReducer';
import { BOARD_SIZE, CMD, exec, renderFrame, GameState, loadLevel, DIRECTION } from './game';
import { Tile, GameBackgrounds, GameObject } from './tiles';

import './Board.css';

interface BoardProps {
    game: GameState,
}

interface BoardState {
    limit: number,
}

const BoardTile = React.memo(({ tile, tileSize }: { tile: Tile, tileSize: number }) => {
    return <div style={{ width: tileSize, height: tileSize }} className={[
        'board-object',
        GameObject.getBackgroundCss(tile),
    ].filter(Boolean).join(' ')}>
        {tile.background === GameBackgrounds.TUNNEL && <div style={{ 
            background: 'transparent',
            borderRadius: '50%',
            border: `${tileSize/8}px solid #${tile.color}`,
            boxSizing: 'border-box',
        }}/>}
        {tile.object && <div className={GameObject.getObstacleCss(tile)}/>} 
    </div>
});

const BoardRow = React.memo(({ row, tileSize }: {row: Tile[], tileSize: number}) => {
    return <div className="row">
        {map(row, (tile, j) => {
            return <BoardTile key={j} tile={tile} tileSize={tileSize}/>
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
    interval!: NodeJS.Timeout;

    constructor(props: BoardProps) {
        super(props)
        bindAll(this, ['handleResize']);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        const animations = ['bg0', 'bg1', 'bg2'];
        this.interval = setInterval(async () => {
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
        const { game } = this.props;
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
                    return <BoardRow key={i} row={row} tileSize={tileSize}/>
                })}
                {map(range(BOARD_SIZE), (i) => {
                    return <div key={i} style={{
                        position: 'absolute', verticalAlign: 'center', lineHeight: `${tileSize}px`,
                        left: -tileSize, top: i * tileSize
                    }}>{i + 1}</div>
                })}
                <div className={`tank TANK_${directionToStr(tank.direction)}`} style={{ 
                    left: tank.x * tileSize, top: tank.y * tileSize, ...tileStyle
                }}/>
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
    const { status, levelIndex } = game;
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
            dispatch(loadLevel(levelIndex + 1));
        }
    }, [dispatch, levelIndex, status, debounceRenderFrame])

    return <Board game={game}/>
}