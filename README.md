# Slot Casino Game

## Overview
The Slot Casino Game is a simple web-based application that simulates a slot machine. Players can spin the reels, deposit or withdraw funds, and track their game statistics such as total bets and winnings. The game is built with Node.js, Express.js, and TypeScript, with a MongoDB database for storing player data.

## Features
- Player Wallet: Manage player balances, with functionalities for deposit and withdrawal.
- Spin Reels: Simulate spinning slot machine reels and calculate winnings.
- Game Statistics: Track total bets, winnings, and Return to Player (RTP) percentage.
- Error Handling: Robust error handling for all endpoints using a custom error class.
- Testing: Unit tests and integration testimplemented using Mocha and Chai.

## Installation

### Prerequisites
- Node.js (v20 or later)
- npm (v8 or later)
- MongoDB

### Setup

1. #### Clone the repository: 

```bash
git clone https://github.com/Marchinka90/slot-casino-game-wg

cd slot-casino-game
```
2. #### Install dependencies: 

```bash
npm install
```

3. #### Environment Variables: 
```bash
# Local Variables
PORT=3000
MONGODB_URI=mongodb://localhost:27017/slot-casino-game
MAX_SLOTS=50
MAX_NUMBER_OF_SPECIFIC_ITEM=10
MAX_ITEMS_IN_REEL=3
MAX_REELS=5

# Test Variables
PORT=3000
MONGODB_URI=mongodb://localhost:27017/slot-casino-game
MAX_SLOTS=30
MAX_NUMBER_OF_SPECIFIC_ITEM=6
MAX_ITEMS_IN_REEL=3
MAX_REELS=3
```

4. #### Compile TypeScript:

```bash
npm run build
```

5. #### Start the server:
```bash
npm start
```

## Usage

### Endpoints

#### Game Endpoints
- #### Spin Reels: `POST /play`
- #### Spin Reels multiple times: `POST /sim`
- #### Return to Player (RTP): `GET /rtp`

#### Wallet Endpoints
- #### Deposit Funds: `POST /wallet/deposti`
- #### Withdraw Funds: `POST /wallet/withdraw`
- #### Get Wallet Balance: `GET /wallet/balance`

### Example Requests
#### Spin Reels
```bash
curl -X POST http://localhost:3000/play -H "Content-Type: application/json" -d '{"bet": 100}'
```

#### Spin Reels multiple times
```bash
curl -X POST http://localhost:3000/sim -H "Content-Type: application/json" -d '{"bet": 100, "count": 3 }'
```

#### Return to Player (RTP)
```bash
curl -X GET http://localhost:3000/rtp
```

#### Deposit Funds
```bash
curl -X POST http://localhost:3000/wallet/deposit -H "Content-Type: application/json" -d '{"deposit": 100}'
```

#### Withdraw Funds
```bash
curl -X POST http://localhost:3000/wallet/withdraw -H "Content-Type: application/json" -d '{"withdraw": 100 }'
```

#### Get Wallet Balance
```bash
curl -X GET http://localhost:3000/wallet/balance
```

## Error Handling
Errors are handled using a custom `HttpError` class. The error handler middleware captures these errors and sends an appropriate response to the client.

## Testing
Tests are written using Mocha and Chai.

### Unit and Integration Tests
To run tests, use the following command:
```bash
npm test
```