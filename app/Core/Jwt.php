<?php

namespace App\Core;

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;
use Carbon\Carbon;
use App\Models\Authorization as AutorizationModel;
use App\Models\User as UserModel;
use Exception;

class Jwt
{
    private $secret;
    private $expiration;

    public function __construct()
    {
        $this->secret = env('JWT_SECRET', 'SUA_CHAVE_SECRETA');
        $this->expiration = (int) env('JWT_INTERVAL', 4);
    }

    /**
     * @param UserModel|int $user
     */
    public function generate($user)
    {
        if (is_numeric($user)) {
            $user = UserModel::find($user);
        }

        if (!$user instanceof UserModel) {
            throw new Exception("Erro ao gerar a autenticação: usuário inválido.");
        }

        $payload = [
            'iss' => 'lower_YT_music',
            'sub' => $user->id,
            'iat' => Carbon::now()->timestamp,
            'exp' => Carbon::now()->addHours($this->expiration)->timestamp
        ];

        $jwt = FirebaseJWT::encode($payload, $this->secret, 'HS256');

        AutorizationModel::create([
            'user_id' => $user->id,
            'token' => $jwt,
            'expires_at' => Carbon::now()->addHours($this->expiration)
        ]);

        return $jwt;
    }

    public function validate(string $token)
    {
        try {
            $decoded = FirebaseJWT::decode($token, new Key($this->secret, 'HS256'));

            $auth = AutorizationModel::where('token', $token)
                ->where('expires_at', '>', Carbon::now())
                ->first();

            if (!$auth) return null;

            return (array) $decoded;
        } catch (Exception $e) {
            return null;
        }
    }

    public function revoke(string $token)
    {
        AutorizationModel::where('token', $token)->delete();
    }
}