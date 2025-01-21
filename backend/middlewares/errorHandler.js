// backend/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        error: err.message || 'An unexpected error occurred'
    });
};

export default errorHandler;
