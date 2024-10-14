export const BreakpointsHelper = () => {
  const env = process.env.NODE_ENV;

  const isDev = env === 'development';

  if (!isDev) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-500 bg-opacity-50 text-center">
      <p className="sm:hidden">{'< sm'}</p>
      <p className="hidden sm:block md:hidden">sm</p>
      <p className="hidden md:block lg:hidden">md</p>
      <p className="hidden lg:block xl:hidden">lg</p>
      <p className="hidden xl:block 2xl:hidden">xl</p>
      <p className="hidden 2xl:block">2xl</p>
    </div>
  );
};
