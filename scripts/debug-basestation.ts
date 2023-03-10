import * as dotenv from 'dotenv';
import { Basestation, Client, Configuration } from '../dist';
import ARLO_EVENTS from '../dist/constants/arlo-events';
import { LoginResult } from '../dist/interfaces/arlo-auth-interfaces';
import { debounce } from '../src/utils/utils';

dotenv.config();

const config: Configuration = {
  arloUser: process.env.ARLO_USER as string,
  arloPassword: process.env.ARLO_PASSWORD as string,
  emailUser: process.env.EMAIL_USER as string,
  emailPassword: process.env.EMAIL_PASSWORD as string,
  emailServer: 'imap.gmail.com',
  emailImapPort: 993,
};

(async () => {
  const arlo = new Client(config);

  const loginResult: LoginResult = {
    serialNumber: process.env.SERIAL_NUMBER as string,
    sessionExpires: Number.parseInt(process.env.SESSION_EXPIRES as string),
    token: process.env.TOKEN as string,
    userId: process.env.USER_ID as string,
  };

  arlo._shortCircuitLogin(loginResult);

  const device = await arlo.getDevice({ deviceType: 'basestation' });

  const basestation = new Basestation(arlo, device);

  basestation.enableDoorbellAlerts();

  // Subscribe to basestation events.
  basestation.on(ARLO_EVENTS.open, () => {
    console.log('stream opened');
  });

  const streamClosedCb = (data: string) => {
    console.log('stream closed');
    console.log(data);
    // Restart the stream in 30 seconds.
    setTimeout(() => basestation.startStream(), 30 * 1000);
  };

  const debouncedCb = debounce(streamClosedCb, 2000);

  basestation.on(ARLO_EVENTS.close, debouncedCb);

  basestation.on(ARLO_EVENTS.error, (data: string) => {
    console.log('error encountered');
    console.log(data);
  });

  basestation.on('pong', () => {
    console.log('ping');
  });

  console.log('starting stream');
  await basestation.startStream();
})();
