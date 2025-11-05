# Use official PHP image with Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Copy all files into container
COPY . /var/www/html/

# Enable Apache rewrite module
RUN a2enmod rewrite

# Make uploads folder writable
RUN mkdir -p uploads && chmod -R 777 uploads

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
