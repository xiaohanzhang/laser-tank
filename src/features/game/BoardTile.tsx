import React, { MouseEventHandler } from 'react';

import { Tile, GameBackgrounds, GameObject } from './tiles';

const BoardTile = React.memo(({ 
    tile, tileSize, onClick, onContextMenu 
}: { 
    tile: Tile, tileSize: number, 
    onClick?: MouseEventHandler, 
    onContextMenu?: MouseEventHandler, 
}) => {
    return <div 
        style={{ width: tileSize, height: tileSize }} 
        className={[
            'board-object',
            GameObject.getBackgroundCss(tile),
        ].filter(Boolean).join(' ')}
        onClick={onClick}
        onContextMenu={onContextMenu}
    >
        {tile.background === GameBackgrounds.TUNNEL && <div style={{ 
            background: 'transparent',
            borderRadius: '50%',
            border: `${tileSize/8}px solid #${tile.color}`,
            boxSizing: 'border-box',
            pointerEvents: 'none'
        }}/>}
        {tile.object && <div className={GameObject.getObstacleCss(tile)} style={{ pointerEvents: 'none' }}/>} 
    </div>
});

export default BoardTile;