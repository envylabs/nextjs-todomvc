export async function loadMessages(locale?: string) {
  locale = locale || 'en';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (await import(`../messages/${locale}.json`)).default as Record<
    string,
    string
  >;
}
