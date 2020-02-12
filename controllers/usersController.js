import { User } from '../db/models';
import { Op } from 'sequelize';

export default {
    async findOne(req, res, next) {
        const user = await User.findOne({ 
            where: { 
                id: {
                    [Op.eq]: req.params.id
                }
            }
        });

        if(!user) return next();
        
        return res.status(200).send({
            data: user
        });
    },

    async findAll(req, res) {
        const users = await User.findAll();

        return res.status(200).send({
            data: users
        });
    },

    async create(req, res) {

    }
}