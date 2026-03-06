<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Login extends Controller
{
    function SignIn(Request $request) {
        return self::sendResponse(200, null, 'teste');
    }
}