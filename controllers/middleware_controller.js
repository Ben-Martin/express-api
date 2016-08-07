
module.exports = middleware;

function middleware() {

    return function doSomething (req, res, next) {

        console.log('middleware');
        next();
 
    };
  
}