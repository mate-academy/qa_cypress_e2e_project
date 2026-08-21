const http = require('http');

const url = new URL(process.env.APP_URL || 'http://127.0.0.1:8080/');
const timeoutMs = Number(process.env.APP_WAIT_TIMEOUT || 60000);
const startedAt = Date.now();

function check() {
  const req = http.get(url, (res) => {
    res.resume();

    if (res.statusCode >= 200 && res.statusCode < 500) {
      process.stdout.write(`Application is ready at ${url.href}\n`);
      process.exit(0);
    }

    retry(`HTTP ${res.statusCode}`);
  });

  req.setTimeout(2000, () => req.destroy(new Error('request timeout')));
  req.on('error', (error) => retry(error.message));
}

function retry(reason) {
  if (Date.now() - startedAt >= timeoutMs) {
    process.stderr.write(
      `Application did not become ready at ${url.href}: ${reason}\n`
    );
    process.exit(1);
  }

  setTimeout(check, 1000);
}

check();
