# ------------ Stage 1: Build the React app ------------
FROM node:14-alpine AS build

# Create app directory
WORKDIR /app

# Copy the package.json and yarn.lock (or package-lock.json if using npm)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the app for production
RUN yarn build


# ------------ Stage 2: Serve with NGINX ------------
FROM nginx:alpine

# Remove default NGINX static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from React app to NGINX html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (the default NGINX HTTP port)
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
