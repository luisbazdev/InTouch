import cookie from 'cookie'
import Cookies from 'cookies'

export default function handler(req, res){
    if(req.method === 'POST'){
        // ...
        const cookies = cookie.parse(req.headers.cookie)
        const session = cookies.session

        console.log(cookies, session)

        res.setHeader('Content-Type', 'application/json')

        if(session){
            res.json({credentials: session})
        }
        else{
            res.json({credentials: null})
        }
    }
}