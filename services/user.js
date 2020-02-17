import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/models';
import { Op } from 'sequelize';

const SECRET = process.env.SECRET;

const generateToken = (user) => 
    jwt.sign({ loggedId: user.id }, SECRET, { expiresIn: '30d' });

export const register = async ({firstName, lastName, email, password}) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return User.register({ firstName, lastName, email, passwordHash });
}

export const login = async ({ email, password }) => {

    const user = await User.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });

    if(!user) {
        return {
            message: 'User not found'
        }
    }
    const valid = await bcrypt.compare(password, user.passwordHash);

    if(!valid){
        return {
            message: 'Password not valid'
        }
    }

    return {
        token: generateToken(user),
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    }
}

export const getUserIdMiddleware = async (req) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const { loggedId } = await jwt.verify(token, SECRET);
            req.loggedId = loggedId;
        }
    } catch(err) {
        req.loggedId = null;
    }
    req.next();
}

export const isAuthorized = async (req, res, next) => {
    if (req.loggedId === null) {     
        var err = new Error('Not authorized! Go back!');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
}