import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../models/http-error';

export const validateBet = [
  check('bet')
    .notEmpty().withMessage('Bet is required')
    .isInt({ min: 1 }).withMessage('Bet must be a positive integer of at least 1')
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError(errors.array().map((err) => err.msg).join(', '), 400
        )
      );
    }
    next();
  },
];

export const validateCount = [
  check('count')
    .notEmpty().withMessage('Count is required')
    .isInt({ min: 1 }).withMessage('Count must be a positive integer of at least 1')
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError(errors.array().map((err) => err.msg).join(', '), 400
        )
      );
    }
    next();
  },
];

export const validateDeposit = [
  check('deposit')
    .notEmpty().withMessage('Deposit is required')
    .isInt({ min: 1 }).withMessage('Deposit must be a positive integer of at least 1')
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError(errors.array().map((err) => err.msg).join(', '), 400
        )
      );
    }
    next();
  },
];

export const validateWithdraw = [
  check('withdraw')
    .notEmpty().withMessage('Withdraw is required')
    .isInt({ min: 1 }).withMessage('Withdraw must be a positive integer of at least 1')
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError(errors.array().map((err) => err.msg).join(', '), 400
        )
      );
    }
    next();
  },
];
