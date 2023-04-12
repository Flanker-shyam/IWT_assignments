const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/age' && parsedUrl.query.dob) {
    const dob = new Date(parsedUrl.query.dob);
    const day = dob.getDate();
    const month = dob.getMonth();
    const year = dob.getFullYear();
    const age = calculateAge(day, month, year);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head>');
    res.write('<meta charset="utf-8">');
    res.write('<title>Age Calculator</title>');
    res.write('</head>');
    res.write('<body>');
    res.write(`<h1>Your age is ${age}</h1>`);
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
});

function calculateAge(day, month, year) {
  const today = new Date();
  const birthDate = new Date(year, month, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
