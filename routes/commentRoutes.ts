import express from 'express';

import { commentController } from '../controllers';
import { validateRequest, checkAuth } from '../middlewares';
import { commentCreateValidation } from '../validations/postValidation';

const router = express.Router();

router.patch('/:id', checkAuth, commentCreateValidation, validateRequest, commentController.update);
router.delete('/:id', checkAuth, commentController.remove);

export default router;
