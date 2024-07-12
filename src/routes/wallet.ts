import { Router } from 'express';
import { validateDeposit, validateWithdraw } from '../middlewares/validators';

import {
  depositInWallet,
  withdrawFromWallet,
  walletBalance,
} from '../controllers/wallet';

const router = Router();

router.post('/deposit', validateDeposit, depositInWallet);

router.post('/withdraw', validateWithdraw, withdrawFromWallet);

router.get('/balance', walletBalance);

export default router;