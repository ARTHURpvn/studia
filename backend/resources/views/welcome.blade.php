<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        *{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            background-color: rgb(59, 59, 59);

            & h1, h2 {
                color: white;
            }
        }
    </style>
</head>

<body>
    @if (@session('success'))
        <div class="bg-lime-100 p-2 text-lime-500 border-solid border-lime-400 border-1 rounded-sm font-sans m-3 mt-0">
            <p>{{ session('success') }}</p>
        </div>
    @endif
    @if ($errors->any())
        @foreach ($errors->all() as $error)
            <div
                class="bg-red-100 p-2 text-red-500 border-solid border-red-400 border-1 rounded-sm font-sans mb-2 w-full">
                <p>{{ $error }}</p>
            </div>
        @endforeach
    @endif

    <h2>Registrar</h2>
    <form action="{{ route('register') }}" method="POST">
        @method('POST')
        @csrf
        <input type="text" name="name" id="name">
        <input type="email" name="email" id="email">
        <input type="password" name="password" id="password">
        <button type="submit">Enviar</button>
    </form>
    <h2>Logar</h2>
    <form action="{{ route('login') }}" method="POST">
        @method('POST')
        @csrf
        <input type="email" name="email" id="email">
        <input type="password" name="password" id="password">
        <button type="submit">Enviar</button>
    </form>
</body>

</html>
