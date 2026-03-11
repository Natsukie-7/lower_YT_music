<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class BaseController
{
    protected function sendResponse(
        int $status = 200, 
        mixed $data = null, 
        ?string $message = null
    ): JsonResponse {
        return response()->json(['message' => $message, 'data' => $data], $status);
    }

    protected function sendError(
        string $message = 'error',
        int $status = 400,
        mixed $errors = null
    ): JsonResponse {
        return response()->json(['message' => $message, 'errors' => $errors], $status);
    }
}