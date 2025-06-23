<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', [UserController::class, 'welcome']);
Route::get('/usuario-info', [UserController::class, 'info']);
