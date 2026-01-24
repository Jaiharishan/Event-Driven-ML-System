import { Router } from 'express';
import { getResult } from '../store/memory';

const router = Router();

router.get('/results/:jobId', (req, res) => {
  const jobId = req.params.jobId;
  const result = getResult(jobId);

  if (!result) {
    return res.status(404).json({
      status: 'pending'
    });
  }

  return res.json(result);
});

export default router;
