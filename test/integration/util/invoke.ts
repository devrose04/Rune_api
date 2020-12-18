import execa from 'execa';

export const invoke = async (fn: string) => {
  jest.setTimeout(15000);
  /**
   * Yeah, this doesn't really work. Hangs forever
   */
  const { stdout } = await execa(`serverless`, ['invoke', 'local', '-f', fn], {});

  console.log('----------------------------');
  console.log(stdout);
  console.log('----------------------------');
};
