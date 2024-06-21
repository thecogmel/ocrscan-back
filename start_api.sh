#!/bin/sh

echo "Migrate database..."
npx prisma migrate deploy
echo "Starting API..."
node dist/main.js