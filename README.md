# Collective Starter Project

## Quickstart

THE DATABASE IS INITIATED AT THE START AND A HOLDER IS INSERTED

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
