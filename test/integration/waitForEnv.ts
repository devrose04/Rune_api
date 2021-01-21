import { callApi, ICallApi, RequestType } from './util/callApi';

interface IWaitForEndpointAvailabilityOptions {
  maxRetries?: number;
  currentTry?: number;
  timeBetweenTries?: number;
}

const waitForEndpointAvailability = async (
  apiOptions: ICallApi,
  {
    maxRetries = 10,
    currentTry = 1,
    timeBetweenTries = 1000,
  }: IWaitForEndpointAvailabilityOptions = {}
) => {
  if (currentTry > maxRetries) {
    throw new Error(
      `The endpoint "${apiOptions.endpoint}" did not become available after ${maxRetries} tries`
    );
  }

  try {
    await callApi(apiOptions);
  } catch (e) {
    console.error(`Received error: "${e.message}`);
    await new Promise((r) => setTimeout(r, timeBetweenTries));

    if (currentTry <= maxRetries) {
      console.debug('Trying again..');
    }

    await waitForEndpointAvailability(apiOptions, {
      maxRetries,
      currentTry: currentTry + 1,
    });
  }
};

global.beforeAll(async () => {
  await waitForEndpointAvailability({
    endpoint: 'find',
    type: RequestType.Get,
  });
});
