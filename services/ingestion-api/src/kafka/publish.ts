import { producer } from './producer';

export async function publishEvent<T>(
  topic: string,
  key: string,
  event: T
) {
  await producer.send({
    topic,
    messages: [
      {
        key,
        value: JSON.stringify(event)
      }
    ]
  });
}
