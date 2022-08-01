const ApiError = require('../error/ApiError')

module.exports = function (err, rec, res, next) {
    if (process.env.NODE_ENV !== 'test'){
        console.log(err.message)
    }
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: `Something wrong! Error not predicted "${err.message}"`})
}