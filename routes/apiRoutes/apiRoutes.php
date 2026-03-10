<?php

use App\Http\Controllers\Authentication\Authentication;
use Illuminate\Support\Facades\Route;

Route::prefix('/api')->group(function () {
    Route::post('/login', [Authentication::class, 'SignIn']);
});