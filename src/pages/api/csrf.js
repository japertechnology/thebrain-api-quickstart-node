import { randomBytes } from 'crypto';

export default function handler(req, res) {
  let token = req.cookies?.csrfToken;
  if (!token) {
    token = randomBytes(32).toString('hex');
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `csrfToken=${token}; Path=/; HttpOnly; SameSite=Strict${secure}`);
  }
  res.status(200).json({ token });
}
