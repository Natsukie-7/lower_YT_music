<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;

Route::middleware(['authorization'])->group(function () {
    Route::get("/", [AppController::class, 'renderHome']);
});