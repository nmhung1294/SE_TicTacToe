import "./Play.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Button } from "reactstrap";
import Sidebar from "../Components/Sidebar";
import Signout from "../Components/Signout";
import { useLocation } from "react-router-dom";



//Set up initial data for game

const X = 'cell-x'
const O = 'cell-o'
const X_WIN = 'cell-x-win'
const O_WIN = 'cell-o-win'
let isPlayerSideX = true;
let currentTurn = 'X'
enum Direction {
    NO_DIRECTION,
    HORIZONTAL,
    VERTICAL,
    MAIN_DIAGONAL,
    SECOND_DIAGONAL
}
let endGame = true;
const setGameStatus = (status: boolean) => {
    endGame = status;
}
let resetGame = false;
const setResetGame = (status: boolean) => {
    resetGame = status;
}
//================================
//room information
let roomID = "";
let playerSide = 'X';
let opponentSide = 'O';
let temp = new Date().getSeconds();
let username = 'player' + temp.toString();
//================================
//SOCKET: 
import { io }  from "socket.io-client";
const socket = io("http://localhost:8000");


socket.on('join room', (data) => {
    console.log(data);
    //store room's information
    roomID = data.room_id;
    if (data.side == 'X') {
        isPlayerSideX = true;
        playerSide = 'X';
        opponentSide = 'O';
    } else {
        isPlayerSideX = false;
        playerSide = 'O';
        opponentSide = 'X';
    }

})
socket.on('game start', () => {
    console.log("-> Game start");
    endGame = false;
})
socket.on('tick', (data) => {

    if (data.username != username) {
        console.log("-> Tick");
        let id = '#cell-' + data.coordinate.x + '-' + data.coordinate.y;
        let clickedCell = document.querySelector(id) as HTMLElement;
        if (clickedCell) {
            clickedCell.classList.add(playerSide == 'X' ? O : X);    
            currentTurn = currentTurn == 'X' ? 'O' : 'X';
        }
    }
})
socket.on('next move', () => {
    console.log("-> Next move");
})
socket.on('time out', () => {
    console.log("-> Time out");
})
socket.on('end game', () => {
    console.log("-> End game");
})
socket.on('chat', (data) => {
    console.log(data);
})
//===================
//Function for handling socket event
const sendTick = (grid: any, x_coord: number, y_coord: number) => {
    let formattedTime = document.querySelector('.player-2.timer')?.textContent;
    let splittedFormattedTime = formattedTime?.split(':');
    let rawTime = splittedFormattedTime ? parseInt(splittedFormattedTime[0]) * 60 + parseInt(splittedFormattedTime[1]) : 0;


    socket.emit('tick', {
        room_id: roomID,
        username: username,
        board: grid,
        time_count: rawTime,
        coordinate: {
            x: x_coord,
            y: y_coord
        }
    })
}

//===================


const checkLogic = (board: any, row: number, col: number, board_size: number) => {
    let returnValue = {
        direction: Direction.NO_DIRECTION,
        value: Array()
    };
    let type = board[row][col];

    // Horizontal check
    let count = 0;
    let maxCount = 0;
    let startIndex = 0;
    let horizontalStart = Math.max(0, col - 4);
    let horizontalEnd = Math.min(col + 4, board_size - 1);
    for (let i = horizontalStart; i <= horizontalEnd; i++) {
        count = board[row][i] === type ? count + 1 : 0;
        if (count > maxCount) {
            maxCount = count;
            startIndex = i - maxCount + 1;
        }
    }
    if (maxCount >= 5) {
        returnValue['direction'] = Direction.HORIZONTAL;
        for (let i = startIndex; i < maxCount + startIndex; i++) {
            returnValue['value'].push(i);
        }
        return returnValue;
    }

    // Vertical check
    count = 0; maxCount = 0; startIndex = 0;
    let verticalStart = Math.max(0, row - 4);
    let verticalEnd = Math.min(row + 4, board_size - 1);
    for (let i = verticalStart; i <= verticalEnd; i++) {
        count = board[i][col] === type ? count + 1 : 0;
        if (count > maxCount) {
            maxCount = count;
            startIndex = i - maxCount + 1;
        }
    }
    if (maxCount >= 5) {
        returnValue['direction'] = Direction.VERTICAL;
        for (let i = startIndex; i < maxCount + startIndex; i++) {
            returnValue['value'].push(i);
        }
        return returnValue;
    }

    // Main diagonal check
    count = 0; maxCount = 0; startIndex = 0;
    let mainDiagonalStart = row - Math.min(5, Math.min(row, col));
    let mainDiagonalEnd = row + Math.min(5, Math.min(board_size - row, board_size - col)) - 1;
    for (let i = mainDiagonalStart; i <= mainDiagonalEnd; i++) {
        count = board[i][i + col - row] === type ? count + 1 : 0;
        if (count > maxCount) {
            maxCount = count;
            startIndex = i - maxCount + 1;
        }
    }
    if (maxCount >= 5) {
        returnValue['direction'] = Direction.MAIN_DIAGONAL;
        for (let i = startIndex; i < maxCount + startIndex; i++) {
            returnValue['value'].push(i);
        }
        return returnValue;
    }

    // Second diagonal check
    count = 0; maxCount = 0; startIndex = 0;
    let secondDiagonalStart = row - Math.min(5, Math.min(row, board_size - col));
    let secondDiagonalEnd = row + Math.min(5, Math.min(board_size - row, col)) - 1;
    for (let i = secondDiagonalStart; i <= secondDiagonalEnd; i++) {
        count = board[i][col + row - i] === type ? count + 1 : 0;
        if (count > maxCount) {
            maxCount = count;
            startIndex = i - maxCount + 1;
        }
    }
    if (maxCount >= 5) {
        returnValue['direction'] = Direction.SECOND_DIAGONAL;
        for (let i = startIndex; i < maxCount + startIndex; i++) {
            returnValue['value'].push(i);
        }
        return returnValue;
    }

    return returnValue;
}

const Board = () => {

    const BOARD_SIZE = 25;
    const TIME = 120;
    const [clickedCell, setClickedCell] = useState<string>('');
    let isCurrentCellX = currentTurn == 'X' ? true : false;
    const [grid, setGrid] = useState(() => Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill('')));
    let isPlayerInTurn = playerSide == currentTurn ? true : false;
    console.log('isPlayerInTurn', isPlayerInTurn)
    console.log('playerSide: ', playerSide)
    console.log('currentTurn: ', currentTurn)


    const handleCellClick = (row: number, col: number) => {
        console.log("clicked")
        const clickedCellKey = `${row}-${col}`;
        setClickedCell(clickedCellKey);
        const cellChecking = document.getElementById('cell-' + clickedCellKey);
        if (cellChecking && cellChecking.classList.contains('clicked')
            && !cellChecking.classList.contains(X) && !cellChecking.classList.contains(O) && !endGame && isPlayerInTurn) {
            // console.log('clicked')

            sendTick(grid, row, col);
            let updatedGrid = [...grid];
            if (isCurrentCellX) {
                updatedGrid[row][col] = X;
            } else {
                updatedGrid[row][col] = O;
            }
            let resultLogic = checkLogic(updatedGrid, row, col, BOARD_SIZE);
            if (resultLogic['direction'] != Direction.NO_DIRECTION) {
                setGameStatus(true);
                switch (resultLogic['direction']) {
                    case Direction.HORIZONTAL:
                        {
                            for (let idx = 0; idx < resultLogic['value'].length; idx++) {
                                let i = resultLogic['value'][idx];
                                updatedGrid[row][i] += ` ${isCurrentCellX ? X_WIN : O_WIN}`;
                            }
                            break;
                        }
                    case Direction.VERTICAL:
                        {
                            for (let idx = 0; idx < resultLogic['value'].length; idx++) {
                                let i = resultLogic['value'][idx];
                                updatedGrid[i][col] += ` ${isCurrentCellX ? X_WIN : O_WIN}`;
                            }
                            break;
                        }
                    case Direction.MAIN_DIAGONAL:
                        {
                            for (let idx = 0; idx < resultLogic['value'].length; idx++) {
                                let i = resultLogic['value'][idx];
                                updatedGrid[i][i + col - row] += ` ${isCurrentCellX ? X_WIN : O_WIN}`;
                            }
                            break;
                        }
                    case Direction.SECOND_DIAGONAL:
                        {
                            for (let idx = 0; idx < resultLogic['value'].length; idx++) {
                                let i = resultLogic['value'][idx];
                                updatedGrid[i][col + row - i] += ` ${isCurrentCellX ? X_WIN : O_WIN}`;
                            }
                            break;
                        }
                }
            }
            
            setGrid(updatedGrid);
            currentTurn = currentTurn == 'X' ? 'O' : 'X';
            
        }
    };

    const renderCells = () => {
        const cells = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const cellKey = `${row}-${col}`;
                const cellClassName = clickedCell === cellKey ? `cell clicked` : `cell`;
                cells.push(
                <div
                    id={`cell-${cellKey}`}
                    key={cellKey}
                    className={`${cellClassName} ${grid[row][col]}`}
                    onClick={() => handleCellClick(row, col)}
                ></div>
                );
                

            }
        }
        return cells;
    };

    return (
        <div>
            <div className="main-board">
                <div className="board">
                    {renderCells()}  
                </div>
            </div>
            
            <div className="two-player">
                <Player type={O} opponent={true} username="Opponent" elo="?"></Player>
                <Timer isInTurn={!isPlayerInTurn} player="player-1" time={TIME}/>
                <Timer isInTurn={isPlayerInTurn} player="player-2" time={TIME}/>
                <Player type={X} opponent={false} username="NQH" elo="2000"></Player>
                        
            </div>
        </div>

    );
};

type TimerProps = {
    isInTurn: boolean
    time: number
    player: string
}

const Timer = (props: TimerProps) => {
    const [countdown, setCountdown] = useState(props.time * 100);

    useEffect(() => {
        if (props.isInTurn) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (endGame || prevCountdown <= 0) {
                        clearInterval(timer);
                        setGameStatus(true);
                    }
                    return (prevCountdown <= 0 || endGame) ? prevCountdown : prevCountdown - 1;
                });
            }, 10);

            return () => {
            clearInterval(timer);
            };
        }
    }, [props.isInTurn, endGame]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 6000);
        let seconds = time - minutes * 6000;
        const ticks = seconds % 100;
        seconds = Math.floor(seconds / 100)
        if (time / 100 >= 20 || time === 0) {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ticks.toString().padStart(2, '0')}`;
    };
    
    const mode = props.isInTurn ? 'black-timer' : 'white-timer'

    return (
        <div id={mode} className={`${mode} ${props.player} timer`}>
            {formatTime(countdown)}
        </div>
    )
}

type PlayerProps = {
    opponent: boolean
    username: string;
    elo: string;
    type: string;
};

const Player = (props: PlayerProps) => {
    if (props.opponent == true) {
    return (
        <div className="player opponent">
            <div className="avatar">
                <div className={`${props.type} player-type`}></div>
            </div>
            <div className="username">
                <b className="username">{props.username}</b>
            </div>
            <div className="elo">
                <b className="elo">{`(${props.elo})`}</b>
            </div>
        </div>
    );}
    return (
        <div className="player">
            <div className="avatar">
                <div className={`${props.type} player-type`}></div>
            </div>
            <div className="username">
                <b>{props.username}</b>
            </div>
            <div className="elo">
                <b>{`(${props.elo})`}</b>
            </div>
        </div>
    );
}

type WaitingProps =  {
    waitSentence: string
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}

function Waiting(props: WaitingProps) {
    return (
        <div className="waiting-parent">
            <div className="waiting">{props.waitSentence}</div>
            <div className="cancel-btn" onClick={props.onClick}></div>
        </div>
    );
}


function Play() {
    
    const options = ['Finding opponent', 'Finding opponent.', 'Finding opponent..', 'Finding opponent...'];
    const [index, setIndex] = useState(0);
    const [showDiv, setShowDiv] = useState(false);

    const handlePlayOnlineBtn = () => {
        setIndex(0);
        setShowDiv(true);
        socket.emit('handshake', {
            username: "NQH",
            elo: 2000
        })
    };

    const handlePlayOfflineBtn = () => {

    };

    const handleCancelBtn = () => {
        setShowDiv(false)
        socket.emit('cancel play online')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % options.length);
        }, 500);
    
        return () => clearTimeout(timer);
        
    }, [index]);

    return (
        <div className="playpage">
            <Sidebar />
            <Signout />
            <div className="main-content-play">
                <div className="main-board">
                    <Board></Board>
                </div>
                
                <div className="play">
                    <Button className="play-btn play-now" children="Play Online" onClick={handlePlayOnlineBtn}></Button>
                    
                    <Button className="play-btn play-with-friend" children="Play offline" onClick={handlePlayOfflineBtn}></Button>
                </div>
                {showDiv && <Waiting waitSentence={options[index]} onClick={handleCancelBtn}/>}
            </div>
        </div>
    );
}
  
export default Play;