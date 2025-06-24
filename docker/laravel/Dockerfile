FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y libpq-dev \
      && docker-php-ext-install pdo pdo_pgsql



COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY backend/ .

RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
