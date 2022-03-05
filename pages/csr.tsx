import type { GetStaticProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { CurrentTime } from '../components/current-time';
import Layout from '../components/layout';
import { loadMessages } from '../utils/load-messages';

import { DefaultProps } from './_app';

const CSR: NextPage<DefaultProps> = ({ setTodos, todos }) => {
  const t = useTranslations();

  return (
    <Layout setTodos={setTodos} todos={todos}>
      <section className="main">
        <p>
          <CurrentTime />
        </p>
        <p>
          <Link href="/">{t('todos')}</Link>
        </p>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
};

export default CSR;
