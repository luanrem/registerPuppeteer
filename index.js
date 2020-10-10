const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  });
  await page.goto('http://missaorama.com.br/administrator/');

  await page.type('#modlgn_username', process.env.MR_LOGIN);
  await page.type('#modlgn_passwd', process.env.MR_PASS);

  await page.click('div.next');

  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });

  await page.click('a[href="index.php?option=com_users"]');
  
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });

  //await page.click('option[value="0"]');
  await page.select('select[name="limit"]', '0');

  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });

  await page.screenshot({path: 'example.png'});

  //await browser.close();
})();