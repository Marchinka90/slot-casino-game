import { Router } from 'express';
import { validateBet, validateCount } from '../middlewares/validators';

import {
  playAGame,
  spinInMultiple,
  returnToPlayer,
} from '../controllers/game';

const router = Router();

router.post('/play', validateBet, playAGame);

router.post('/sim', validateBet, validateCount, spinInMultiple);

router.get('/rtp', returnToPlayer);


export default router;
