## standalone password manager

Ecnrypt (AES) and store passwords with standalone (or not) MongoDB.

## Installation

### At first, create **.env** file with variables from **.env.example**

For standalone MongoDB use

```bash
docker-compose up -d
```

Run client in dev mode

```bash
cd client
yarn run install
yarn run dev
```

Run server in dev mode

```bash
cd server
yarn run install
yarn run serve
```

Build everything and run

```bash
yarn run start
```
