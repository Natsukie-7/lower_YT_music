<?php

use App\Http\Controllers\Authentication\Authentication;
use App\Http\Controllers\Authorization\Authorization;
use Illuminate\Support\Facades\Route;

// Rotas públicas (sem middleware)
Route::prefix('/api')->group(function () {
    Route::post('/register', [Authentication::class, 'SignUp']);
    Route::post('/login', [Authentication::class, 'SignIn']);
});

// Rotas protegidas pelo middleware
Route::prefix('/api')->middleware('authorization')->group(function () {
    Route::get('/sync', [Authorization::class, 'sync']);
});