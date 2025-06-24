<?php
return [
    'paths' => ['api/*', 'usuario-info', '*'],
    'allowed_origins' => ['http://localhost:3000'], // ou a porta do seu frontend
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
];
