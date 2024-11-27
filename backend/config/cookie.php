<?php
return [

'secure' => env('SESSION_SECURE_COOKIE', false),

'http_only' => true,

'same_site' => 'lax',

'prefix' => env('COOKIE_PREFIX', ''),

    'XSRF-TOKEN' => [
    'path' => '/',
    'domain' => env('APP_URL', null),
    'secure' => env('SESSION_SECURE_COOKIE', false),  // Set to true for HTTPS
    'http_only' => false,
    'same_site' => 'Lax', // or 'Strict'
    'lifetime' => 60 * 24 * 7,  // Set a custom expiration time for the CSRF token cookie (e.g., 1 week)
    ],
];
