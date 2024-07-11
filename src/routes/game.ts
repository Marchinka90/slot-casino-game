import { Router } from 'express';

import { playAGame, spinInMultiple, returnToPlayer } from '../controllers/game.js';

const router = Router();

router.post('/play', playAGame);

router.post('/sim', spinInMultiple);

router.get('/rtp', returnToPlayer);


export default router;