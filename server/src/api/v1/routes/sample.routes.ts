import { Router } from 'express';
import sampleController from '../controllers/sample.controller';

const router = Router();

/**
 * @route POST /api/v1/sample
 * @description This route is used to create a sample
 */
router.route('/sample').post(sampleController.createOne);
/**
 * @route GET /api/v1/sample/{sampleId}
 * @description This route is used to get a sample
 * @route PUT /api/v1/sample/{sampleId}
 * @description This route is used to update a sample
 * @route DELETE /api/v1/sample/{sampleId}
 * @description This route is used to delete a sample
 */
router
    .route('/sample/:id')
    .get(sampleController.getOne)
    .put(sampleController.updateOne)
    .delete(sampleController.deleteOne);
/**
 * @route GET /api/v1/samples
 * @description This route is used to get all samples
 */
router.route('/samples').get(sampleController.getAll);

export default router;
