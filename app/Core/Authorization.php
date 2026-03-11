<?php

namespace App\Core;

use App\Models\User as UserModel;
use App\Core\Jwt;

class Authorization
{
    private $jwt;

    public $token;
    public $user;


    public function __construct(string $token, UserModel $user, Jwt $jwt)
    {
        $this->token = $token;
        $this->user = $user;
        $this->jwt = $jwt;
    }

    public function revoke()
    {
        $this->jwt->revoke($this->token);
    }
}