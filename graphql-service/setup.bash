#!/bin/bash
cd /app
npx prisma migrate dev
npx prisma db seed --preview-feature
cd /app/build
node index.js