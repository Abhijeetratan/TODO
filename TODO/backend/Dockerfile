# Use an official Node.js image as a base
FROM node:14

# Set the working directory inside the container
WORKDIR /backend/src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 (if your application listens on this port)
EXPOSE 5000

# Define the command to start your application
CMD ["npm", "start"]
