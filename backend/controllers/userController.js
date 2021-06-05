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
     
    }
})

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    console.log("register")
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('이미 존재하는 회원 입니다.')
  
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
        throw new Error('회원정보를 찾을 수 없습니다.')
   
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
    
        
        }else{
          
            res.status(404)
            throw new Error('회원정보를 찾을 수 없습니다.')
       
        }


    
})



// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
   
    const users = await User.find({})
 
    if(users){
        res.json(users)
    }else{
        return res.status(404)
    }
     
})



// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
    console.log("deleteUser")

    const users = await User.findById(req.params.id)
    console.log(users)

    if(users){
        await users.remove()
        res.json({ messaage : '사용자 삭제'})
    }else{
        res.status(404)
        throw new Error('사용자 발견 못함')
    }
     
})


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id)
    //.select('-password')
   
    if(users){
        res.json(users)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
     
})


// @desc    Update user
// @route   PUT /api/users/profile
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
   
 
    if(user){

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        
        const updatedUser = await user.save()

        res.json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
  
    }else{
      
        res.status(404)
        throw new Error('회원정보를 찾을 수 없습니다.')
   
    }



})

export { authUser, 
         registerUser, 
         getUserProfile, 
         updateUserProfile, 
         getUsers, 
         deleteUsers, 
         getUserById, 
         updateUser 
        } 