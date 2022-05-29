const { Genre, sequelize } = require('../models')
class ControllerOfGenre {
    static async showGenres(req, res, next) {
        const t = await sequelize.transaction()
        try {
            let genresData = await Genre.findAll({
                order: [
                    ['name', 'ASC'],
                ],
                transaction: t
            })
            await t.commit()
            res.status(200).json(genresData)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async addGenre(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { name } = req.body
            const newGenre = await Genre.create({
                name
            },
            {
                transaction: t
            })
            await t.commit()
            res.status(201).json(newGenre)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async deleteGenre(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const id = +req.params.id
            await Genre.destroy({
                where: {
                    id
                },
                transaction: t
            })
            await t.commit()
            res.status(200).json({
                message: "Success to delete one genre"
            })
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }
}

module.exports = ControllerOfGenre