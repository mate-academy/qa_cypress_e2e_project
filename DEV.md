# App Setup

- [App Setup](#app-setup)
  - [How to Run](#how-to-run)
  - [Run with `make` commands](#run-with-make-commands)
  - [Frontend login](#frontend-login)
  - [Connect to Database](#connect-to-database)

## How to Run

1. x86 chips

    ```bash
      sudo docker-compose build && sudo docker-compose up
    ```

    If case of `"docker-compose" command not found`, use this command

    ```bash
      sudo docker compose build && sudo docker compose up
    ```

1. Apple silicon chips (M1, M2)

    ```bash
      docker-compose -f docker-compose.m1.yml build && docker-compose -f docker-compose.m1.yml up
    ```

Navigate to [http://localhost:1667](http://localhost:1667)

## Run with `make` commands

Also, you can run the project with `Makefile` ([Unbuntu](https://www.unixmen.com/install-ubuntu-make-on-ubuntu-15-04/)), ([Windows](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows), for Mac available by default) commands:

```bash
  make up  // for x86
  make m1  // for M1
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
