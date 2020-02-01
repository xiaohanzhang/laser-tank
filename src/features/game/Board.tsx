import { map, min, bindAll, debounce } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/rootReducer';
import { BOARD_SIZE, CMD, exec, renderFrame, GameState } from './game';
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
})

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
        return nextProps.game.timer !== this.props.game.timer ||
            nextState.limit !== this.state.limit
        ;
    }

    render() {
        const { game } = this.props;
        const { limit } = this.state;
        const { board, tank, laser } = game;
        const tileSize = Math.floor(limit / BOARD_SIZE);
        const tileStyle = { width: tileSize, height: tileSize };
        return <div ref={this.boardRef} className="Board">
            <div style={{
                width: tileSize * BOARD_SIZE, height: tileSize * BOARD_SIZE, margin: '0 auto'
            }}>
                {map(board, (row, i) => {
                    return <BoardRow key={i} row={row} tileSize={tileSize}/>
                })}
                <div className={`tank TANK_${tank.direction}`} style={{ 
                    left: tank.x * tileSize, top: tank.y * tileSize, ...tileStyle
                }}/>
                {laser && <div className={`laser ${laser.direction}`} style={{ 
                    left: laser.x * tileSize, top: laser.y * tileSize, ...tileStyle
                }}/>}
            </div>
        </div>
    }
}

export default () => {
    const game = useSelector((state: RootState) => state.game)
    const dispatch = useDispatch();
    const { next, status } = game;
    const debounceRenderFrame = debounce(() => {
        return dispatch(renderFrame(null));
    }, 10);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const cmdMap: {[key: string]: CMD} = {
                ArrowUp: 'N',
                ArrowDown: 'S',
                ArrowLeft: 'W',
                ArrowRight: 'E',
                'u': 'UNDO',
                'U': 'UNDO',
                ' ': 'FIRE',
            };
            const cmd = cmdMap[e.key];
            if (cmd) {
                dispatch(exec(cmd));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [dispatch]);

    useEffect(() => {
        if (next.length > 0 && status !== 'FAIL') {
            debounceRenderFrame();
        }
    }, [debounceRenderFrame, next, status]);

    return <Board game={game}/>
}