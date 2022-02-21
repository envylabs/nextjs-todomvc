import * as nextRouter from 'next/router';

type MockUseRouterParams = Partial<nextRouter.NextRouter>;

/**
 * Use jest to Mock the React useRouter with the given parameters.
 *
 * @see https://github.com/vercel/next.js/issues/7479#issuecomment-744125959.
 */
export const mockUseRouter = ({
  route = '',
  pathname = '',
  query = {},
  asPath = '',
  basePath = '',
  locale = '',
  locales = [],
  defaultLocale = '',
}: MockUseRouterParams) => {
  const actions = {
    push: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
    reload: jest.fn(() => Promise.resolve(true)),
    prefetch: jest.fn(() => Promise.resolve()),
    back: jest.fn(() => Promise.resolve(true)),
    beforePopState: jest.fn(() => Promise.resolve(true)),
    events: {
      on: jest.fn(),
    },
  };

  (nextRouter.useRouter as jest.Mock) = jest.fn(() => ({
    route,
    pathname,
    query,
    asPath,
    basePath,
    locale,
    locales,
    defaultLocale,
    ...actions,
  }));

  return actions;
};
