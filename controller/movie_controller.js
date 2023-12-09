const {Movies} = require('../models')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')

class MovieController {
    static async getAll(req,res,next){
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const offset = (page - 1) * limit;
            const Movie = await Movies.findAll(
                {
                    limit: limit,
                    offset: offset,
                }
            )
            res.status(200).json(Movie)
        }
        catch(error){
            next(error)
        }
    }

    static async getOne(req,res,next){
        try{
            const {id} = req.params
            const movie = await Movies.findByPk(id)

            if(!movie){
                throw ({name : "notFound"})
            }

            res.status(200).json(movie)
        }
        catch(error){
            next(error)
        }
    }

    static async create (req,res,next){
        try{
            const {title, genres, year} = req.body 
            if(!title || !genres || !year){
                throw ({name : 'nullParameter'})
            }

            const newMovie = await Movies.create(
                {
                    title,
                    genres,
                    year,
                    createdAt : new Date(),
                    updatedAt : new Date()
                }
            )
            res.status(201).json(newMovie)
        }
        catch (error){
            next(error)
        }
    }

    static async update(req,res,next){
        try{
            const {id} = req.params
            const {title, genres, year} = req.body

            const existingMovie = await Movies.findByPk(id);

            if (!existingMovie) {
                throw ({name : "notFound"})
            }
            const updateMovie = await existingMovie.update({title, genres, year, updatedAt : new Date()})

            res.status(200).json(updateMovie)
        }
        catch(error){
            next(error)
        }
    }

    static async delete(req,res,next){
        try{
            const {id} = req.params
            const existingMovie = await Movies.findByPk(id);
            if (!existingMovie) {
                throw ({name : "notFound"})
            }
            await Movies.destroy({where : {id}})

            res.status(200).json({massage : 'Berhasil menghapus Movie'})
        }
        catch(error){
            next(error)
        }
    }
}
module.exports = MovieController