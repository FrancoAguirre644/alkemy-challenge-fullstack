import express from 'express';
import * as operationController from '../controllers/operationController';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', auth, operationController.getOperations);

router.post('/', auth, operationController.createOperation);

router.put('/:id', auth, operationController.updateOperation);

router.delete('/:id', auth, operationController.deleteOperation);

export default router;