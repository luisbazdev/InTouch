import cookie from 'cookie'

export default function handler(req, res){
    if(req.method === 'POST'){
        const credentials = {
            uid: req.body.uid,
            user: req.body.user,
            pictureURL: req.body.pictureURL,
        }

        res.setHeader('Set-Cookie', [
            cookie.serialize('session', JSON.stringify(credentials), {
              httpOnly: true,
            })
        ]);

        res.setHeader('Content-Type', 'application/json')

        res.json({credentials: credentials})
    }


}