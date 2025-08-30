# Use Node.js official image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend (your entry file is src/index.js)
CMD ["node", "src/index.js"]
