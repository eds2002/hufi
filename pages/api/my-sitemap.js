const {SitemapStream,streamToPromise} = require('sitemap')
const {Readable} = require("stream")

export default async (req,res)=>{
  const debug = process.env.NODE_ENV
  console.log(debug)
  const links = [
    {url: "http://localhost:3000/support/", changefreq:"daily",priority:0.3}
  ]
  // Create a stream to write to
  const stream = new SitemapStream({hostName:`https://${req.headers.host}`})
  
  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data)=> data.toString())
  res.send(xmlString)

  res.writeHead(200,{
    "Content-type":"application/xml"
  }).send(xmlString)

}

