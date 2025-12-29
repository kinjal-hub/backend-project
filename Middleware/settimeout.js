const timeoutMiddleware = (req, res, next) => {
  console.log('Request received, waiting 10 seconds...');
  setTimeout(() => {
    console.log('10 seconds passed.');
    next(); // Continues to the actual route handler
  }, 10000); // 10000 ms = 10 seconds
};


module.exports = timeoutMiddleware;
