<?php

namespace App\Core;

use App\Models\User as UserModel;

class Authorization
{
    public $token;
    public $user;

    public function __construct(string $token, UserModel $user)
    {
        $this->token = $token;
        $this->user = $user;
    }
}