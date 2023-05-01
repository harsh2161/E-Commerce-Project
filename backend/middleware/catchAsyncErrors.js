module.exports = theFunc => (request, response, next)=>{
    Promise.resolve(theFunc(request, response, next)).catch(next);
}