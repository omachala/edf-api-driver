import {
  Builder, By, Key, until,
} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { Credentials, Session } from '../types';

let retrieveSessionPromise: Promise<Session> | null;
let session: Session;

const now = (plusSecs: number = 0): number => Math.floor(new Date().getTime() / 1000) + plusSecs;

const retrieveSession = async ({
  email,
  password,
}: Credentials): Promise<Session> => {
  const loaderInterval = setInterval(() => process.stdout.write('. '), 500);

  const chromeOptions = new chrome.Options()
    .addArguments('--disable-dev-shm-usage')
    .addArguments('--no-sandbox')
    .addArguments('--disable-gpu')
    .addArguments('--headless');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();
  try {
    await driver.get('https://my.edfenergy.com/user/login');
    await driver.findElement(By.name('name')).sendKeys(email, Key.RETURN);
    await driver.wait(until.urlContains('pwdorotp'));
    await driver
      .findElement(By.name('customer_pwd'))
      .sendKeys(password, Key.RETURN);
    await driver.wait(until.urlContains('contract_account_homepage'));
    await driver.findElement(By.linkText('View account')).sendKeys(Key.ENTER);
    const cookies = await driver.manage().getCookies();
    const sessionCookie = cookies.find((cookie) => cookie.name.startsWith('SSESS'));
    if (!sessionCookie) { throw new Error('Cannot find cookie with session value'); }
    const { name, value } = sessionCookie;
    const expire = now(300);
    return { name, value, expire };
  } finally {
    await driver.quit();
    clearInterval(loaderInterval);
  }
};

const getSession = async (credentials: Credentials): Promise<Session> => {
  if (!session || session.expire < now()) {
    if (!retrieveSessionPromise) {
      retrieveSessionPromise = retrieveSession(credentials);
    }
    session = await retrieveSessionPromise;
    retrieveSessionPromise = null;
  }
  return session;
};

export default getSession;
