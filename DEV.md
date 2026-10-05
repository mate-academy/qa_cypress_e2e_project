# App Setup

- [App Setup](#app-setup)
  - [How to Run](#how-to-run)
  - [Run with `make` commands](#run-with-make-commands)
  - [Frontend login](#frontend-login)
  - [Connect to Database](#connect-to-database)
  - [Troubleshooting](#troubleshooting)

## How to Run

Pre-setup:

  ```bash
    npm i
  ```

1. x86 chips

    ```bash
      docker-compose build && docker-compose up
    ```

    If case of `"docker-compose" command not found`, use this command

    ```bash
      docker compose build && docker compose up
    ```

1. Apple silicon chips (M1, M2)

    ```bash
      docker-compose -f docker-compose.m1.yml build && docker-compose -f docker-compose.m1.yml up
    ```

Navigate to [http://localhost:1667](http://localhost:1667)

## Run with `make` commands

Also, you can run the project with `Makefile` ([Unbuntu](https://www.unixmen.com/install-ubuntu-make-on-ubuntu-15-04/)), ([Windows](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows), for Mac available by default) commands:

```bash
  make build  // command for x86
  make build-m1  // command for ARM (M1, M2)
```

## Frontend login

There are a total of 100 users, with each user having the same password. Say we
want to login as user 32:

```text
Username: user32
Password: Userpass1
Email: user32@hotmail.com
```

## Connect to Database

In you need an access to the DB, you can connect to the Postgress container.
The easy way:

```shell script
$ sudo docker exec -it realworld_postgres bash
$ psql -U user
# \c realworld
# select * from users;
```

The advanced way:

1. Ubuntu setup:

   ```shell script
   $ curl -o ~/.psqlrc https://raw.githubusercontent.com/mate-academy/fed/master/mate-scripts/config-files/.psqlrc
   $ sudo apt update
   $ sudo apt install postgresql postgresql-contrib
   
   $ make db
   password: userpassword
   # select * from users;
   ```

1. macOS setup:

   ```shell script
   $ curl -o ~/.psqlrc https://raw.githubusercontent.com/mate-academy/fed/master/mate-scripts/config-files/.psqlrc
   $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   $ brew install postgresql
   
   $ make db
   password: userpassword
   # select * from users;
   ```

## Troubleshooting

- [Windows: Webpack is not watching the changes. Realoading of containers required to observe new attributes](https://github.com/webpack/webpack/issues/2949#issuecomment-279348745)

## Local Windows run without Docker

The app can use portable Deno 1.5.1 and PostgreSQL 11. Keep their binaries,
Deno cache, database files and logs in the ignored `.local-runtime` directory.
Create a `realworld` database on `127.0.0.1:54320` with user `user` and password
`userpassword`, then load the realworld section of
`.docker/data/postgres_dump.sql` and `.docker/data/user_followings.sql`.
Use an isolated test database: Cypress clears all application data before each test.

Build the frontend from `src`:

```powershell
npm ci
$env:NODE_OPTIONS = '--openssl-legacy-provider'
node node_modules/webpack-cli/bin/cli.js --env.environment=production
```

Start the backend from `src`:

```powershell
$env:APP_HOST = '127.0.0.1'
$env:DB_HOST = '127.0.0.1'
$env:DB_PORT = '54320'
$env:DENO_DIR = Join-Path (Resolve-Path ../.local-runtime) 'deno-cache'
../.local-runtime/deno/deno.exe run --allow-net --allow-read --allow-env --unstable app.ts
```

Run E2E tests from the repository root in another terminal:

```powershell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npm test
```

For an existing Docker database, apply the follow/unfollow table once:

```powershell
Get-Content .docker/data/user_followings.sql |
  docker exec -i realworld_postgres psql -U user -d realworld
```

New Docker databases run this SQL automatically during initialization.
The backend keeps its original Docker host and port defaults when the local
environment variables are absent.
