<?php

use App\Http\ViewControllers\ViewController;
use Illuminate\Support\Facades\Route;

Route::get("/login", [ViewController::class, 'login']);

Route::middleware(['authorization'])->group(function () {
    Route::get("/", [ViewController::class, 'home']);
});