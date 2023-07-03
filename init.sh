#!/bin/bash
set -e



docker compose down -v --remove-orphans
docker compose build --parallel
docker compose up -d

