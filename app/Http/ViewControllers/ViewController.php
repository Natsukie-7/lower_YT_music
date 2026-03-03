<?php

namespace App\Http\ViewControllers;

class ViewController {
    public function app()
    {
        return view("app");
    }
    
    public function login()
    {
        return view("login");
    }
}