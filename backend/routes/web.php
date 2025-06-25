<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\SupabaseAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', [UserController::class, 'welcome']);
Route::post('/register', [SupabaseAuthController::class, 'register'])->name('register');
