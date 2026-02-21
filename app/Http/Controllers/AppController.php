<?php

namespace App\Http\Controllers;

class AppController {
    public function renderHome()
    {
        return view("home");
    }
    
    public function renderLogin()
    {
        return view("login");
    }
}