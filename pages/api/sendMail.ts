
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  code?:number;
  message?:string;
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  const {email} = req.body
  try{
    const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID
    const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
    const DATACENTER = process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER
    const data = {
      email_address:email,
      status:'subscribed',
    }

    const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,{
      body:JSON.stringify(data),
      headers:{
        Authorization:`apikey ${API_KEY}`,
        'Content-Type':'application/json',
      },
      method:'POST',
    }).then((data)=>data.json())

    switch(response.status){
      case 400:
        return res.status(400).json({code:400,message:response.title})
      default:
        return res.status(201).json({code:200,message: "SUCCESS" });
    }
  } catch (error:any) {
    return res.status(500).json({message: error?.message || error.toString() });
  }
}
