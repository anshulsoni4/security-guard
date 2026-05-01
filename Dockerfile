#using the public node image and importing it
FROM node:20

#this will be the folder name created inside the container
WORKDIR /app

#this will tell which file to copy 
COPY package*.json ./

#this tells 
RUN npm install

#copy all the files from current to the container folder
COPY . .

#expose is the port on which the project will run
EXPOSE 5173

#now run this command to make the website run
CMD ["npm", "run", "dev", "--", "--host"]

