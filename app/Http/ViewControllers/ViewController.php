<?php

namespace App\Http\ViewControllers;

class ViewController {
    public function home()
    {
        return view("home");
    }
    
    public function login()
    {
        return view("login");
    }
}