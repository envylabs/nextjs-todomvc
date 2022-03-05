import axios from 'axios';
import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import prettyReporter from 'io-ts-reporters';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import useSWR, { Fetcher } from 'swr';

import { ResponsePayload } from '../pages/api/current-time';
import { isServer } from '../utils/is-server';

const currentTimeFetcher: Fetcher<Date> = async (
  url: string
): Promise<Date> => {
  const response = await axios.get<t.TypeOf<typeof ResponsePayload>>(url, {
    timeout: 5000,
  });
  const parsedResponseBody = ResponsePayload.decode(response.data);

  if (isLeft(parsedResponseBody)) {
    throw new Error(prettyReporter.report(parsedResponseBody).join(', '));
  }

  return new Date(parsedResponseBody.right.time);
};

export const useCurrentTime = () => {
  const { data: time, error } = useSWR('/api/current-time', currentTimeFetcher);

  return {
    time,
    isLoading: !time && !error,
    isError: error,
  };
};

export const CurrentTime: FC = () => {
  const t = useTranslations();

  if (isServer()) return <span>{t('The time is loading')}</span>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, isLoading, time } = useCurrentTime();

  if (isError) return <span>{t('The time could not be loaded')}</span>;
  if (isLoading) return <span>{t('The time is loading')}</span>;

  if (!time) {
    throw new Error('time did not load');
  }

  return (
    <time dateTime={time.toISOString()}>
      {t('The time is t', { timestamp: time })}
    </time>
  );
};
