import { boot } from 'quasar/wrappers';
import { SendIntent } from 'send-intent';

async function expect_intent(): Promise<string> {
  return SendIntent.checkSendIntentReceived()
    .then((result: any) => {
      if (result) {
        console.log('SendIntent received');
        console.log(JSON.stringify(result));
      }
      if (result.url) {
        const resultUrl = decodeURIComponent(result.url);
        console.log(resultUrl);
      }
      SendIntent.finish();
      return 'intent cool';
    })
    .catch((err) => {
      SendIntent.finish();
      console.error(err);
      return 'error'
    });
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});

export { expect_intent };
