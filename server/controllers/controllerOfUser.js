const { User, sequelize } = require('../models')
const { comparePasswordWithHash } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')

class ControllerOfUser {
    static async addUser(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { email, password, phoneNumber, address } = req.body
            const newUser = await User.create({
                email,
                password,
                phoneNumber,
                address
            },
            {
                transaction: t
            })
            await t.commit()
            res.status(201).json(newUser)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async login(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const {email, password} = req.body
            if (!email) throw {name: 'EMAIL_IS_REQUIRED'}
            if (!password) throw {name: 'PASSWORD_IS_REQUIRED'}

            const selectedUser = await User.findOne({
                where: {
                    email: email
                },
                transaction: t
            })
            if (!selectedUser) {
                throw {name: 'USER_NOT_FOUND'}
            }
            const passwordCheck = comparePasswordWithHash(password, selectedUser.password)
            if (!passwordCheck) {
                throw {name: 'USER_NOT_FOUND'}
            }
            const payload = {
                id: selectedUser.id,
                email: selectedUser.email
            }
            const token = tokenGenerator(payload)
            await t.commit()
            res.status(200).json({
                access_token: token,
                user: selectedUser
            })
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }
}

module.exports = ControllerOfUser