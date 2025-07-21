<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
            'name' => 'required|min:3'
        ]);

        $response = Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'),
            'Content-Type' => 'application/json',
        ])->post(env('SUPABASE_URL') . '/auth/v1/signup', [
            'email' => $request->email,
            'password' => $request->password,
            'data' => [
                'name' => $request->name
            ]
        ]);

        return response()->json($response->json(), $response->status());
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        $response = Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'),
            'Content-Type' => 'application/json',
        ])->post(env('SUPABASE_URL') . '/auth/v1/token?grant_type=password', [
            'email' => $request->email,
            'password' => $request->password
        ]);

        return response()->json($response->json(), $response->status());
    }

    public function me(Request $request)
    {
        $jwt = $request->bearerToken();

        if (!$jwt) {
            return response()->json(['error' => 'Token não fornecido.'], 401);
        }

        $response = Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'),
            'Authorization' => 'Bearer ' . $jwt,
        ])->get(env('SUPABASE_URL') . '/auth/v1/user');

        if ($response->failed()) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        $dados = $response->json();

        return response()->json([
            'id' => $dados['id'],
            'email' => $dados['email'],
            'name' => $dados['user_metadata']['name'] ?? null,
        ]);
    }
}
