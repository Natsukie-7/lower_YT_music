<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\Authentication\Login;
use Illuminate\Support\Facades\Route;

Route::prefix('/api')->group(function () {
    Route::post('/login', [Login::class, 'SignIn']);
});