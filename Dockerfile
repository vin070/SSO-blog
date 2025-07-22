# Use nginx as base image for serving static content
FROM nginx:alpine

# Copy the blog files to nginx html directory
COPY blog /var/www/html/blog
COPY demo /var/www/html/demo

# Copy nginx configuration for better performance
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
