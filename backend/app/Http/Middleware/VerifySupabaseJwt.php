<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class VerifySupabaseJwt
{
    /**
     * Handle an incoming request.
     */
    public function __invoke(Request $request, Closure $next)
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Token não fornecido'], 401);
        }

        $token = str_replace('Bearer ', '', $authHeader);

        try {
            $decoded = JWT::decode($token, new Key(env('SUPABASE_JWT_SECRET'), 'HS256'));
            $request->attributes->set('user', $decoded); // dados disponíveis nos controllers
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token inválido: ' . $e->getMessage()], 401);
        }

        return $next($request);
    }
}
