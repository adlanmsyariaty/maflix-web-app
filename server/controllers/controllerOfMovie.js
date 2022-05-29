const { Movie, Genre, Cast, MovieGenre, MovieCast, User, sequelize } = require('../models')
const { Op } = require('sequelize')

class ControllerOfMovie {
    static async showMovies(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const {search} = req.query
            const options = {
                where: {},
                order: [
                    ['title', 'ASC'],
                ],
                include: [Genre],
                transaction: t
            }

            if (search != 'undefined') {
                options.where ={
                    ...options.where,
                    title: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }

            let moviesData = await Movie.findAll(options)
            await t.commit()
            res.status(200).json(moviesData)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async detailMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const id = +req.params.id
            let movieData = await Movie.findOne({
                where: {
                    id
                },
                include: [Cast, Genre],
                transaction: t
            })

            if (!movieData) throw {name: 'MOVIE_NOT_FOUND'}

            await t.commit()
            res.status(200).json(movieData)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async addMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const {title, synopsis, trailerUrl, imgUrl, rating, genres, casts} = req.body
            const authorId = +req.user.id
            let newMovie = await Movie.create({
                title,
                synopsis,
                trailerUrl,
                imgUrl,
                rating: +rating,
                authorId
            }, {
                transaction: t
            })

            if (genres.length > 0) {
                let data = []
                genres.forEach(el => {
                    data.push({movieId: newMovie.id, genreId: +el})
                });
                await MovieGenre.bulkCreate(data, {transaction: t})
            }

            if (casts.length > 0) {
                let data = []
                casts.forEach(el => {
                    data.push({movieId: newMovie.id, castId: +el})
                });
                await MovieCast.bulkCreate(data, {transaction: t})
            }

            await t.commit()
            res.status(201).json(newMovie)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async deleteMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const id = +req.params.id
            let checkData = await Movie.findOne({
                where: {
                    id
                },
                include: [Cast, Genre],
                transaction: t
            })

            if (!checkData) throw {name: 'MOVIE_NOT_FOUND'}

            await Movie.destroy({
                where: {
                    id
                }
            },
            {
                transaction: t
            })

            await t.commit()
            res.status(200).json({
                messaage: 'Success to delete movie'
            })
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async updateMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const {title, synopsis, trailerUrl, imgUrl, rating, genres, casts} = req.body
            const authorId = +req.user.id

            const id = +req.params.id
            let checkData = await Movie.findOne({
                where: {
                    id
                },
                transaction: t
            })

            if (!checkData) throw {name: 'MOVIE_NOT_FOUND'}

            await Movie.update({
                title,
                synopsis,
                trailerUrl,
                imgUrl,
                rating: +rating,
                authorId
            }, {
                where: {
                    id
                },
                individualHooks: true,
                transaction: t
            })

            await MovieGenre.destroy({
                where: {
                    movieId: id
                },
                transaction: t
            })
            if (genres.length > 0) {
                let data = []
                genres.forEach(el => {
                    data.push({movieId: id, genreId: +el})
                });
                await MovieGenre.bulkCreate(data, {transaction: t})
            }

            await MovieCast.destroy({
                where: {
                    movieId: id
                }
            })
            if (casts.length > 0) {
                let data = []
                casts.forEach(el => {
                    data.push({movieId: id, castId: +el})
                });
                await MovieCast.bulkCreate(data, {transaction: t})
            }

            const updatedMovie = await Movie.findOne({
                where: {
                    id
                },
                include: [Cast, Genre],
                transaction: t
            })

            await t.commit()
            res.status(200).json(updatedMovie)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async filteredByGenre(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const genreId = +req.query.genre
            const castId = +req.query.cast

            let options = {
                where: {},
                include: [{
                    model: Movie,
                    include: [Genre, {
                        model: Cast,
                        where: {}
                    }]
                }],
                transaction: t
            }
            let selectedGenre
            if (genreId) {
                selectedGenre = await Genre.findOne({
                    where: {
                        id: genreId
                    },
                    transaction: t
                })

                if (!selectedGenre) throw {name: "GENRE_NOT_FOUND"}

                options.where = {
                    ...options.where,
                    genreId
                }
            }

            if (castId) {
                options.include[0].include[1].where = {
                    ...options.include[0].include[1].where,
                    id: castId
                }
            }

            const moviesByGenre = await MovieGenre.findAll(options)

            await t.commit()
            res.status(200).json(moviesByGenre)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async filteredByCast(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const castId = +req.query.cast

            let options = {
                where: {},
                include: [{
                    model: Movie,
                    include: [Genre]
                }],
                transaction: t
            }

            let selectedGenre
            if (castId) {
                selectedGenre = await Cast.findOne({
                    where: {
                        id: castId
                    },
                    transaction: t
                })

                if (!selectedGenre) throw {name: "CAST_NOT_FOUND"}

                options.where = {
                    ...options.where,
                    castId
                }
            }

            const moviesByCast = await MovieCast.findAll(options)

            await t.commit()
            res.status(200).json(moviesByCast)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async detailedMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const id = +req.params.id
            const movie = await Movie.findOne({
                where: {
                    id
                },
                include: [Cast, Genre, User],
                transaction: t
            })

            if (!movie) throw {name: "MOVIE_NOT_FOUND"}
            await t.commit()
            res.status(200).json(movie)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }
}

module.exports = ControllerOfMovie