
const errorHandler = (err,req,res,next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    res.status(status).json({error:message});
};


module.exports = errorHandler;