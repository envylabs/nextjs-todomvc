import type { GetServerSideProps, NextPage } from 'next';
import { getCurrentTime } from '../models/world-time-api';
import { useTranslations } from 'next-intl';
import Layout from '../components/layout';
import { DefaultProps } from './_app';
import Link from 'next/link';

interface Props extends DefaultProps {
  encodedTime: string;
}

const SSR: NextPage<Props> = ({ encodedTime, setTodos, todos }) => {
  const t = useTranslations();
  const timestamp = new Date(encodedTime);

  return (
    <Layout setTodos={setTodos} todos={todos}>
      <section className="main">
        <p>
          <time dateTime={encodedTime}>
            {t('The time is t', { timestamp })}
          </time>
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
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      encodedTime: (await getCurrentTime()).toISOString(),
    },
  };
};

export default SSR;
