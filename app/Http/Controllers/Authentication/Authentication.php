<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authentication extends Controller
{
    public function SignUp(Request $request)
    {
        
    }

    public function SignIn(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return self::sendResponse(401, null, 'Credenciais inválidas');
        }

        $user = Auth::user();

        return self::sendResponse(200, [
            'user' => $user
        ], 'Login realizado com sucesso');
    }
}