<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FolderController;

Route::get('/', [AuthController::class, 'welcome']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/folders', [FolderController::class, 'listarPastas']);

// Rotas protegidas
Route::middleware('supabase.jwt')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
});
