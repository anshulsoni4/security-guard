#using the public node image and importing it
FROM node:20

#this will be the folder name created inside the container
WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 5173


CMD ["npm", "run", "dev", "--", "--host"]

