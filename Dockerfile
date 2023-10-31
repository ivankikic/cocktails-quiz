# Specify the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install dependencies
RUN npm install --silent

# Copy the entire application code to the container
COPY . .

# Build the production version of the app using Vite
RUN npm build

# Install serve package globally to run the production build
RUN npm global add serve

# Expose the port used by the app
EXPOSE 5000

# Start the app using the serve command
CMD ["serve", "-s", "dist", "-l", "80"]