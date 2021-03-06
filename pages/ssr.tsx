import type { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import Layout from '../components/layout';
import { getCurrentTime } from '../models/world-time-api';
import { loadMessages } from '../utils/load-messages';

import { DefaultProps } from './_app';

interface Props extends DefaultProps {
  encodedTime: string;
  isErred: boolean;
}

const SSR: NextPage<Props> = ({ encodedTime, isErred, setTodos, todos }) => {
  const t = useTranslations();

  return (
    <Layout setTodos={setTodos} todos={todos}>
      <section className="main">
        <p>
          {isErred ? (
            <span>{t('The time is loading')}</span>
          ) : (
            <time dateTime={encodedTime}>
              {t('The time is t', { timestamp: new Date(encodedTime) })}
            </time>
          )}
        </p>
        <p>
          <Link href="/">{t('todos')}</Link>
        </p>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Partial<Props>> = async ({
  locale,
}) => {
  let currentTime: Date;
  let encodedTime = '';
  let isErred = false;

  try {
    currentTime = await getCurrentTime();
    encodedTime = currentTime.toISOString();
  } catch (error) {
    isErred = true;
  }

  return {
    props: {
      encodedTime,
      isErred,
      messages: await loadMessages(locale),
    },
  };
};

export default SSR;
