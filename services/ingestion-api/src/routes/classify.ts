import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { Topics } from '../kafka/topics';
import { ClassifyRequestBody } from '../types/api';
import { ImageClassificationRequestedEvent } from '../types/events';
import { httpRequestsTotal, httpRequestDuration } from '../metrics/prometheus';
import { publishEvent } from "../kafka/publish";

const router = Router();

router.post('/classify', async (req: Request<{}, {}, ClassifyRequestBody>, res: Response) => {
  const jobId = uuidv4();

  const end = httpRequestDuration.startTimer({
    method: 'POST',
    route: '/api/classify',
  });

  const event : ImageClassificationRequestedEvent = {
    job_id: jobId,
    image_uri: req.body.image_uri,
    model_version: 'v1',
    timestamp: Date.now()
  };

  try {
    await publishEvent<ImageClassificationRequestedEvent>(
      Topics.IMAGE_CLASSIFICATION_REQUESTED,
      jobId,
      event
    );

    return res.status(202).json({
      job_id: jobId,
      status: 'accepted'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to enqueue request' });
  }
  finally {
    end();
    httpRequestsTotal.inc({ method: 'POST', route: '/api/classify', status: res.statusCode });
    
  }
});

export default router;
