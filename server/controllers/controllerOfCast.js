const { Cast, sequelize } = require('../models')
const { Op } = require('sequelize')

class ControllerOfCast {
    static async showCasts(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const {search} = req.query
            const options = {
                where: {},
                order: [
                    ['name', 'ASC'],
                ],
                transaction: t
            }

            if (search != "undefined") {
                options.where = {
                    ...options.where,
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }
            let castsData = await Cast.findAll(options)
            await t.commit()
            res.status(200).json(castsData)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async addCast(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { name, profilePict } = req.body
            const newCast = await Cast.create({
                name,
                profilePict
            },
            {
                transaction: t
            })
            await t.commit()
            res.status(201).json(newCast)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async deleteCast(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const id = +req.params.id
            await Cast.destroy({
                where: {
                    id
                },
                transaction: t
            })
            await t.commit()
            res.status(200).json({
                message: "Success to delete one cast"
            })
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }
}

module.exports = ControllerOfCast