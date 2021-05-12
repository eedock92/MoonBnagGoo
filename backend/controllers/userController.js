import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))){
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id),
        })
        return
    } else {
        res.status(401)
        throw new Error('이메일 또는 패스워드가 틀렸습니다.')
        return
    }
})

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('이미 존재하는 회원 입니다.')
        return
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateToken(user._id),
        })
        return
    }else{
      
        res.status(400)
        throw new Error('유효하지 않은 데이터 입니다')
        return
    }
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

 
    if(user){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        })
        return;
    }else{
        res.status(404).json({error: 'Not found'});
        return;
      //  throw new Error('회원정보를 찾을 수 없습니다.')
   
    }
    
})


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

        return;
    }else{
  
        res.status(404).json({error: 'Not found'});
        return;
        //throw new Error('회원정보를 찾을 수 없습니다.')
   
    }
     
})

export { authUser, registerUser ,getUserProfile, updateUserProfile } 