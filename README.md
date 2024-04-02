### TIC-TAC-TOE

## Code added for socket:
1. Play.tsx: 
- Create socket right when file is executed
- emit handshake event at


## Changes compared to previous code:
- Change handlePlayBtn -> handlePlayOnlineBtn
- Change handlePlayWithFriendBtn -> handlePlayOfflineBtn
- Change [player, setPlayer] -> [isPlayerInTurn, setTurnForPlayer]
- Move CellX and isPlayerInTurn to the "set up initial data" section
- Add currentTurn to "set up initial data" section
- Change isCurrentCellX from hook to: let isCurrentCellX = currentTurn == 'X' ? true : false;
- Change isPlayerInTurn from hook to: let isPlayerInTurn = playerSide == currentTurn ? true : false;
- update currentTurn after each click:  currentTurn = currentTurn == 'X' ? 'O' : 'X';
- 
