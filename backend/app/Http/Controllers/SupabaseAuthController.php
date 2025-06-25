<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SupabaseAuthController extends Controller
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
            'name' => $request->name,
        ]);

        return response()->json($response->json(), $response->status());
    }
}
