<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;

Route::get("/login", [AppController::class, 'renderLogin']);