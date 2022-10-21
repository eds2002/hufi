const {SitemapStream,streamToPromise} = require('sitemap')
const {Readable} = require("stream")


export default async (req,res)=>{
  const debug = process.env.NODE_ENV
  const domain = debug === "development" ? 'http://localhost:3000/' : 'https://www.hufistore.com/'
  const {data:productData} = await storefront(allProductHandles)
  const {data:collectionData} = await storefront(allCollectionHandles)


  const links = []

  productData.products.nodes.map((product)=>{
    links.push({
      url: `/product/${product.handle}`,
      changeFreq: "daily",
      priority:0.9,
    })
  })
  collectionData?.collections?.nodes?.map((collection)=>{
    if(collection.handle.split("-").length === 1){
      links.push({
        url: `/collection/${collection.handle}`,
        changeFreq: "daily",
        priority:0.9,
      })
    }else{
      links.push({
        url: `/collection/subcol/${collection.handle}`,
        changeFreq: "daily",
        priority:0.9,
      })
    }
  })

   // Add other pages
   const pages = ["/support", "/hufi-rewards-member", "/login"];
   pages.map((url) => {
     links.push({
       url,
       changefreq: "daily",
       priority: 0.9,
     });
   });


   // Create a stream to write to
   const stream = new SitemapStream({
    hostname: `https://${req.headers.host}`,
  });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
}

async function storefront(query,variables={}){
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "X-Shopify-Storefront-Access-Token":process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
      body:JSON.stringify({query,variables})
    }
  )

  const data = await response.json()
  if(data.errors){
    return {errors:`${data.errors[0].message}` }
  }
  
  return data
  
}

const gql = String.raw

const allProductHandles = gql`
query getAllProducts{
	products(first:100){
		nodes{
      handle
    }
  }
}
`
const allCollectionHandles = gql`
  query getAllCollections{
    collections(first:100){
      nodes{
        handle
      }
    }
  }
`
