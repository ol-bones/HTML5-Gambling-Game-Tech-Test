module.exports = function(options) {
    return function(req, res, next) {
        console.log(Date.now()+ ' -- ' + req.headers['x-forwarded-for'] + ' -- Connection -- ' + req.path);
        next();
    };
}
