<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class User extends Model
{
    protected $table = 'users';

    protected $fillable = ['name', 'email', 'password']; 

    public $timestamps = true;

    protected $hidden = ['password'];
}