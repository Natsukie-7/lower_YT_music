<?php

namespace App\Http\Controllers\Authorization;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Authorization extends Controller
{
    public function sync(Request $request)
    {
        $user = $this->authorization->user;

        return self::sendResponse(200, $user->only(['id', 'name', 'email']));
    }
    
    public function revoke(Request $request)
    {
        $this->authorization->revoke();

        return self::sendResponse(200);
    }
}

