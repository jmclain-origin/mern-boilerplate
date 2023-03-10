import { Router } from 'express';
import sampleController from '../controllers/sample.controller';

const router = Router();

/**
 * @route GET /api/v1/samples
 */
router.route('/sample').post(sampleController.createOne);
/**
 * @route GET /api/v1/sample/{sampleId}
 * @route PUT /api/v1/sample/{sampleId}
 * @route DELETE /api/v1/sample/{sampleId}
 */
router
    .route('/sample/:id')
    .get(sampleController.getOne)
    .put(sampleController.updateOne)
    .delete(sampleController.deleteOne);
/**
 * @route GET /api/v1/samples
 */
router.route('/samples').get(sampleController.getAll);

export default router;
