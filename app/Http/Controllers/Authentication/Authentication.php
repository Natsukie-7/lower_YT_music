<?php
namespace App\Http\Controllers\Authentication;

use Illuminate\Support\Facades\Hash;
use App\Models\User as UserModel;
use App\Core\Jwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\BaseController;

class Authentication extends BaseController
{
    private $jwt;

    public function __construct(Jwt $jwt)
    {
        $this->jwt = $jwt;
    }

    public function SignUp(Request $request)
    {
        $validator = Validator::make(
            $request->all(), 
            [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6'
            ]
        );

        if ($validator->fails()) {
            return self::sendResponse(422, null, $validator->errors()->first());
        }

        $user = UserModel::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        if (!$user instanceof UserModel) {
            return self::sendResponse(412, null, "Error on generate the user");
        }

        $token = $this->jwt->generate($user);

        return self::sendResponse(200, $token, 'Login realizado com sucesso');
    }
}