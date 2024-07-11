import { RequestHandler } from "express";

import { prepareRoll, spinTheRolls } from "../util/roll";
import { calculateWinnings } from "../util/calculator";

const rolls = [prepareRoll(), prepareRoll(), prepareRoll()];

let totalBetInGame: number = 0;
let totalWinningsInGame: number = 0

export const playAGame: RequestHandler = (req, res) => {

  const bet = (req.body as { bet: number }).bet;
  totalBetInGame += bet;
  // --- BONUS --- Error Handling -  invalid input
  // --- BONUS --- Deduct the bet amount from the player's wallet.

  // --- DONE --- Perform a random spin using the RNG.
  const matrix = spinTheRolls(rolls);

  // --- DONE --- Calculate the winnings based on the final symbol matrix.
  const winnings = calculateWinnings(matrix, bet);
  totalWinningsInGame += winnings;

  // --- BONUS --- Update the player's wallet with the winnings.


  res.status(200).json({ matrix, winnings });
};

export const spinInMultiple: RequestHandler = (req, res) => {
  const body = req.body as { count: number; bet: number };
  const { count, bet } = body;
  const totalBet = bet * count;
  totalBetInGame += totalBet;
  // --- BONUS --- Deduct the total bet amount (bet * count) from the player's wallet.

  // --- DONE --- Perform the specified number of spins.
  let totalWinnings: number = 0;

  for (let i = 0; i < count; i++) {
    const matrix = spinTheRolls(rolls);
    const winnings = calculateWinnings(matrix, bet);
    totalWinnings += winnings;
  }
  totalWinningsInGame += totalWinnings;
  // --- DONE --- Calculate the total winnings and net result (total winnings - total bet).
  const netResult = totalWinnings - totalBet;

  // --- BONUS --- Update the player's wallet with the total winnings.

  res.status(200).json({ totalWinnings, netResult });
};

export const returnToPlayer: RequestHandler = (req, res) => {
  // --- DONE --- Calculate the RTP percentage based on all spins made so far - total bets vs. total winnings
  let rtp: number;

  if (!totalBetInGame ) {
    return res.status(200).json({ rtp: 0 });
  }
  rtp =( totalWinningsInGame / totalBetInGame) * 100;

  totalBetInGame = 0;
  totalWinningsInGame = 0;

  res.status(200).json({ rtp });
};

