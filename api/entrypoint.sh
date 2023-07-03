#!/bin/sh
echo "Waiting for mysql..."
while ! nc -z $DB_HOST 3306; do
    sleep 0.1
done
echo "mysql started"
#npm run db:migrate
exec "$@"