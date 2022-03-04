import { useTranslations } from 'next-intl';
import { FC } from 'react';
import useSWR, { Fetcher } from 'swr';
import { fetchWithTimeout } from '../models/world-time-api';

const currentTimeFetcher: Fetcher<Date> = async (
  url: string
): Promise<Date> => {
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }

  const responseBody = await response.json();
  return new Date(responseBody.time);
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

  return <time>{t('The time is t', { timestamp: time })}</time>;
};
