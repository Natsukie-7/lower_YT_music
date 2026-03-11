<?php

namespace App\Http\Middleware;

use App\Core\Authorization;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Core\Jwt;
use App\Models\User;

class AuthorizationMiddleware
{
    private $jwt;

    public function __construct(Jwt $jwt)
    {
        $this->jwt = $jwt;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');
        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json(['message' => 'Token não fornecido'], 401);
        }

        $token = substr($header, 7);

        $decoded = $this->jwt->validate($token);
        if (!$decoded) {
            return response()->json(['message' => 'Token inválido ou expirado'], 401);
        }

        $user = User::find($decoded['sub']);
        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 401);
        }

        app()->instance(Authorization::class, new Authorization($token, $user, $this->jwt));

        return $next($request);
    }
}