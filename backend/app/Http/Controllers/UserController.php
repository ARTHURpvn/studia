<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function welcome(): View
    {
        $dados = [
            'nome' => 'Leandro',
            'email' => 'leandro@example.com',
            'idade' => 25,
        ];
        return view('welcome', ['dados' => $dados]);
    }

    public function info()
    {
        return response()->json([
            'nome' => 'HelloWorld',
        ]);
    }
}
