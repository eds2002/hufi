
const randomUseragent = require('random-useragent');
async function getBrowserInstance(){

  const chromium = require('chrome-aws-lambda')
  const executablePath = await chromium.executablePath

  if(!executablePath){
    // running locally
    const puppeteer = require("puppeteer")
    return puppeteer.launch({
      args:chromium.args,
      headless:false,
      ignoreHTTPSErrors: true,
    })
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

export default async (req,res)=>{
  const {url} = req.body


  // Peforming Url Validation
  if(!url || !url.trim()){
    return res.json({
      status:"error",
      error:'enter valid url'
    })
  }


  let result = null;
  let browser = null;
  
  try {
    browser = await getBrowserInstance()
    let page = await browser.newPage();

    // 17Track blocks older browser versions, 35 seems like the sweet spot.
    const userAgent = randomUseragent.getRandom(function(ua){
      return parseFloat(ua.browserVersion) >=35
    })
    await page.setUserAgent(userAgent)
    await page.setJavaScriptEnabled(true)
    await page.goto(url,{waitUntil:'networkidle0'});
    await new Promise((resolve,reject)=>{
      setTimeout(()=>{
        
      },10000)
      resolve()
    })
    result = await page.content()

    // const value = await element.evaluate(el => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context
    // console.log(value,element)
  
    // result = await page.title();
  } catch (error) {
    // return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
  console.log(result)
  
  res.json({
    status:'ok',
    data:result
  })
}