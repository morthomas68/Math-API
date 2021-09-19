const url = require('url');

exports.math = function(req, res) {
    const reqUrl = url.parse(req.url, true)
    const queryString = require('query-string');
    let parsed = queryString.parse(reqUrl.search);
    var mathAPI = require('./mathAPI.js')
    var answer = mathAPI.calculate(parsed);

    var response = [
        {message: answer},
    ];


    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
}

exports.invalidUrl = function(req, res) {
    var response = [
      {
        "message": "Invalid endpoint. The possible endpoints are"
      },
      availableEndpoints
    ]
    res.statusCode = 404;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
 }

 const availableEndpoints = [
    {
      method: "GET",
      math: "/api/maths"
    }
  ]