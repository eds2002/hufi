export async function storefront(query,variables={}){
  const t = JSON.stringify(variables)
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