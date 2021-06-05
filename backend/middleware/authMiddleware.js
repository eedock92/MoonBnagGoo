import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = AsyncHandler(async (req, res, next ) => {
    let token

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try {

            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // 사용자를 체크 .select('-password')
            req.user = await User.findById(decoded.id)

            next()
            
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error('인증되지 않았습니다.')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('인증되지 않았습니다.')
    }

   
})

const admin = (req ,res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else {
        res.status(401)
        throw new Error('접근 권한이 없습니다.')
    }
}

export { protect, admin }