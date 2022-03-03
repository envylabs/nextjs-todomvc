import type { NextApiHandler } from 'next';
import { getCurrentTime } from '../../models/world-time-api';

const handler: NextApiHandler = async (_, res) => {
  let time: Date;

  try {
    time = await getCurrentTime();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'An error occurred',
    });
    return;
  }

  res.status(200).json({ time });
};

export default handler;
