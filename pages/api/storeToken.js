import {serialize} from 'cookie'

export default function handler(req, res) {
  const {token,expires} = req.body
  const date = new Date(expires)
  return res.setHeader('Set-Cookie', [
    serialize('userAccess', token, {
      maxAge: date,
      path: '/',
      httpOnly:true,
    }),
  ]).json({code:302,message:"SUCCESS"});
}
