import { RequestHandler } from "express";

// import { random } from "lodash";

import { prepareRoll, spinTheRolls } from "../util/roll";
import { calculateWinnings } from "../util/calculator";

const rolls = [prepareRoll(), prepareRoll(), prepareRoll()];

export const gamePlay: RequestHandler = (req, res) => {
  const bet = (req.body as { bet: number }).bet;
  // --- BONUS --- Deduct the bet amount from the player's wallet.

  // --- DONE --- Perform a random spin using the RNG.
  const matrix = spinTheRolls(rolls);

  // --- DONE --- Calculate the winnings based on the final symbol matrix.
  const winnings = calculateWinnings(matrix, bet);

  // --- BONUS --- Update the player's wallet with the winnings.

  // --- DONE ---  Return the final symbol matrix and winnings
  res.status(200).json({ matrix, winnings });
};

export const simGame: RequestHandler = (req, res) => {
  const body = req.body as { count: number; bet: number };
  const { count, bet } = body;
  const totalBet = bet * count;
  // --- BONUS --- Deduct the total bet amount (bet * count) from the player's wallet.

  // - Perform the specified number of spins.
  let totalWinnings: number = 0;

  for (let i = 0; i < count; i++) {
    const matrix = spinTheRolls(rolls);
    const winnings = calculateWinnings(matrix, bet);
    totalWinnings += winnings;
  }
  // - Calculate the total winnings and net result (total winnings - total bet).
  const netResult = totalWinnings - totalBet;

  // --- BONUS --- Update the player's wallet with the total winnings.

  // - Return the total winnings and net result.
  // - Response: { "totalWinnings": number, "netResult": number }
  res.status(200).json({ totalWinnings, netResult });
};
