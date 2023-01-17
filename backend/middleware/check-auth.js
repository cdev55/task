import * as jwt from 'jsonwebtoken'
export const checkAuth=(req,res,next)=>{
    try {
        console.log(`middelware...`, req.headers)
        const token =req.headers.authorization.split(' ')[1];
        const decodedToken=jwt.verify(token,process.env.JWT_KEY);
        req.userData={email:decodedToken.email,userId:decodedToken.userId}
        console.log(token)
        console.log(typeof token)
        next();
    } catch (error) {
        console.log(`something went wrong`, error)
        res.status(401).json({
            status:{
                message:'Auth Failed',
                code:401
            }
        })
    }
}