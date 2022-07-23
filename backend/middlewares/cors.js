module.exports.corsAccessHandler = (req, res, next) => {
    const allowedCors = [
      'doesntmatter.nomoredomains.xyz',
      'http://doesntmatter.nomoredomains.xyz',
      'https://doesntmatter.nomoredomains.xyz',
      'localhost:3000',
      'http://localhost:3000',
      'https://localhost:3000'
    ];

    const { origin } = req.headers;
    const { method } = req;

    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', true);
    }

    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.header('Access-Control-Allow-Credentials', true);
      return res.end();
    }

    next();
}
