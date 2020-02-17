import { User } from '../db/models';
import { Op } from 'sequelize';
import * as userServices from '../services/user';
import validator from 'validator';

export default {

    async login(req, res) {       
        
        let { email, password } = req.body;       
        
        const errors = [];
        if(!validator.isEmail(email)) {
            errors.push('Invalid email format');
        }       

        if(errors.length) {
            return res.status(409).json({
                message: errors
            });
        }

        const userLogin = await userServices.login({ email, password });

        if(!userLogin) return next();
        
        return res.status(200).json({
            data: userLogin
        });
    },

    async registration(req, res) {

        let { firstName, lastName, email, password } = req.body;

        const errors = [];
        if(!validator.isLength(firstName.trim(), { min: 3, max: 50 })) {
            errors.push('First name is too short');
        }

        if(!validator.isLength(lastName.trim(), { min: 3, max: 50 })) {
            errors.push('Last name is too short');
        }

        if(!validator.isEmail(email)) {
            errors.push('Invalid email format');
        }

        if(!validator.matches(password, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm)) {
            errors.push('Invalid password: Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character');
        }

        if(errors.length) {
            return res.status(409).json({
                message: errors
            });
        }

        const user = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });
    
        if(user) {
            return res.status(409).json({
                message: 'Account already exists'
            });
        }

        const userRegister = await userServices.register({ firstName, lastName, email, password });

        if(!userRegister) return next();
        
        return res.status(200).json({
            data: {
                email: email
            }
        });
    }
}