ARG BASE_IMAGE
FROM ${BASE_IMAGE}

COPY /dist/apps/admin/.next /app/.next
COPY /dist/apps/admin/public /app/public
COPY /dist/apps/admin/package.json /app/
COPY /dist/apps/admin/next.config.js next.config.js

EXPOSE 3000

CMD ["npm", "run", "start"]
