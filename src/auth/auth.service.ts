import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dtos/Login.dto';


@Injectable()
export class AuthService {

    constructor (@InjectModel(User.name) private UserModal : Model<User >){}

    //SIGNUP...
    async signup(signupData : SignupDto){

        const {email , name , password} = signupData

        //for in use Email check
        const emailInUse = await this.UserModal.findOne({email})
        if(emailInUse) throw new BadRequestException("Email in use...")
        
        //for hash password to db
        const hashedPassword =await bcrypt.hash(password , 10)
       
        //for create new user
        await this.UserModal.create({
            name, email, password:hashedPassword
      })    
    }

    //LOGIN...
    async login ( credentials : LoginDto ){
        const {email , password} = credentials

        //email in use or not..
        const user = await this.UserModal.findOne({email})
        if(!user){
            throw new UnauthorizedException("Email not found...")
        }

        //match password to hashed...
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch)
            throw new UnauthorizedException("Wrong password....")

        return{
            message :"Susccess"
          } 
    }    
}
