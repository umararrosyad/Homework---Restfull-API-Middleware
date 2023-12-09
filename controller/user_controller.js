const {User} = require('../models')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static async getAll(req,res,next){
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const offset = (page - 1) * limit;
            const users = await User.findAll(
                {
                    limit: limit,
                    offset: offset,
                }
            )
            res.status(200).json(users)
        }
        catch(error){
            next(error)
        }
    }

    static async register(req,res,next){
        try{
            const {email, gender, password, role} = req.body

            if(!email || !gender || !password || !role){
                throw ({name : 'nullParameter'})
            }
            const hashpassword = await bcrypt.hash(password,10)
            const newUser = await User.create({
                email : email,
                gender : gender,
                password : hashpassword,
                role : role
            }) 

            res.status(200).json(newUser)
        }
        catch(error){
            next(error)
        }
    } 

    static async login(req,res,next){
        try{
            const {email, password} = req.body
            if(!email || !password){
                throw ({name : 'nullParameter'})
            }
            const user = await User.findOne({where : {email}})
            if(!user){
                throw ({name : 'invalidCaredential' })
            }
            const passwordMatch = await bcrypt.compare(password,user.password)
            if(!passwordMatch){
                throw ({name : 'invalidCaredential' })
            }

            const token = jwt.sign(
                {
                    id : user.id,
                    email : user.email
                },
                'secret'
            )

            res.status(200).json({token})

        }
        catch(error){
            next(error)
        }
    }
}
module.exports = UserController