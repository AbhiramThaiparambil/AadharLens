import { Router } from 'express';
import { container } from '../../container/container.js';
import { AadhaarController } from '../controllers/aadhaar.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
const router = Router();
const aadhaarController = container.resolve(AadhaarController);
router.get('/', aadhaarController.getWelcomeMessage);
router.post(
  '/parse-aadhaar',
  upload.fields([
    { name: 'frontFile', maxCount: 1 },
    { name: 'backFile',  maxCount: 1 },
  ]),
  aadhaarController.parseAadhaar,
);

router.post(
  '/parse-aadhaar/advanced',
  upload.fields([
    { name: 'frontFile', maxCount: 1 },
    { name: 'backFile',  maxCount: 1 },
  ]),
  aadhaarController.parseAadhaarAws,
);
export default router;
