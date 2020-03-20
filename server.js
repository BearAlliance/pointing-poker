const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const compression = require('compression');
const port = process.env.PORT || 3000;

app.use(morgan('common'));
app.use(compression());

// Only when using SSL
app.get('*', function(req, res, next) {
  if (
    req.headers['x-forwarded-proto'] != 'https' &&
    process.env.NODE_ENV === 'production'
  ) {
    res.redirect(301, `https://${req.hostname}${req.url}`);
  } else {
    /* Continue to other routes if we're not redirecting */
    next();
  }
});

app.use('/', express.static(path.join(__dirname, 'build')));
app.use('*', express.static(path.join(__dirname, 'build')));

// Only for non-ssl
// app.use('*', express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log(`App listening on port ${port}!`));
