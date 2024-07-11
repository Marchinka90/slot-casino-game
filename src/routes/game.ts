import { Router } from 'express';

import { gamePlay, simGame } from '../controllers/game.js';

const router = Router();

router.post('/play', gamePlay);

router.post('/sim', simGame);

// router.get('/rtp', updateTodo);


export default router;