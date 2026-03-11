<?php

namespace App\Http\Controllers;

use App\Core\Authorization;

abstract class Controller extends BaseController
{
    protected Authorization $authorization;

    public function __construct(Authorization $authorization)
    {
        $this->authorization = $authorization;
    }
}