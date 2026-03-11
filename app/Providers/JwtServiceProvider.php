<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Core\Jwt;

class JwtServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(Jwt::class, function ($app) {
            return new Jwt();
        });
    }

    public function boot() {}
}