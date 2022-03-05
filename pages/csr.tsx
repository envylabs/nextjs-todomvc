import type { GetStaticProps, NextPage } from 'next';
import Layout from '../components/layout';
import { DefaultProps } from './_app';
import { CurrentTime } from '../components/current-time';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
};

export default CSR;
