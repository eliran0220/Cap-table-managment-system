# Collective Starter Project

## Quickstart

To quickly start up the entire application, run:

```bash
./init.sh
```

To turn off the application, use:

```bash
./down.sh
```

Accessing the Services
After starting the application with ./init.sh, the services will be accessible at the following URLs:

- App Client: http://localhost:5000

- API Server: http://localhost:5001
  - HOLDER ROUTES:
    - POST / http://localhost:5001/holder (body should include attribute name: string)
    - DELETE / http://localhost:5001/holder/:holderId
    - GET / http://localhost:5001/holder
  - SHARES ROUTES:
    - PUT / http://localhost:5001/allocate/:holderId (body should contain attribute quantity: number)
    - PUT / http://localhost:5001/redeem/:holderId (body should contain attribute quantity: number)

- phpMyAdmin: http://localhost:5080 (user and password:root)

The API will restart when updated, the front end app has hot-reload enabled.

To view api server logs (recommended while developing), use:

```bash
docker compose logs -f api
```

to install packages (on the api or app):

```bash
docker compose exec api npm install mysql
```
