<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Index</title>
</head>

<body>
    <p>Teste</p>
    {{-- <p>{{ $dados['nome'] }}</p>
    <p>{{ $dados['email'] }}</p>
    <p>{{ $dados['idade'] }}</p> --}}
    <div id="user-info"></div>
    <script>
        fetch('/usuario-info')
            .then(response => response.json())
            .then(data => {
                document.getElementById('user-info').innerHTML =
                    `<p>Nome: ${data.nome}</p>`;
            });
    </script>
</body>

</html>
