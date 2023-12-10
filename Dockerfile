FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 80
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]