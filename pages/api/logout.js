import {serialize} from 'cookie'

export default function handler(req, res) {
  res.setHeader('Set-Cookie', [
    serialize('userAccess', '', {
      maxAge: -1,
      path: '/',
    }),
  ]);

  res.writeHead(302, { Location: '/login' });
  res.end();
}
