<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MateriaController extends Controller
{
    private function supabaseHeaders($jwt)
    {
        return [
            'apikey' => env('SUPABASE_KEY'),
            'Authorization' => 'Bearer ' . $jwt,
            'Content-Type' => 'application/json',
        ];
    }

    public function index(Request $request)
    {
        $jwt = $request->bearerToken();
        if (!$jwt) return response()->json(['error' => 'Token não fornecido'], 401);

        $user = Http::withHeaders($this->supabaseHeaders($jwt))
            ->get(env('SUPABASE_URL') . '/auth/v1/user')->json();

        $user_id = $user['id'];

        $response = Http::withHeaders($this->supabaseHeaders($jwt))
            ->get(env('SUPABASE_URL') . "/rest/v1/materia?user_id=eq.$user_id&select=*");

        return response()->json($response->json(), $response->status());
    }
}
