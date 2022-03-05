import axios, { AxiosResponse } from 'axios';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import useSWR, { Fetcher } from 'swr';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';
import prettyReporter from 'io-ts-reporters';
import { ResponsePayload } from '../pages/api/current-time';

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
  const { data: time, error } = useSWR('api/current-time', currentTimeFetcher);

  return {
    time,
    isLoading: !time && !error,
    isError: error,
  };
};

export const CurrentTime: FC = () => {
  const t = useTranslations();
  const { isError, isLoading, time } = useCurrentTime();

  if (isError) return <div>{t('The time could not be loaded')}</div>;
  if (isLoading) return <div>{t('The time is loading')}</div>;

  if (!time) {
    throw new Error('time did not load');
  }

  return (
    <time dateTime={time.toISOString()}>
      {t('The time is t', { timestamp: time })}
    </time>
  );
};
