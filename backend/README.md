# Formatos de JSON Enviado

### Pastas

```json
[
    {
        "id": "1",
        "name": "Pasta",
        "type": "folder",
        "children": [
            {
                "id": "1-1",
                "name": "subpasta",
                "type": "folder",
                "children": [
                    {
                        "id": "1-1-1",
                        "name": "aaaaaaaaa",
                        "type": "folder",
                        "children": [
                            {
                                "id": "1-1-1-1",
                                "name": "Anotation",
                                "type": "note"
                            }
                        ]
                    },
                    {
                        "id": "1-1-2",
                        "name": "Anotation",
                        "type": "note"
                    }
                ]
            },
            {
                "id": "1-2",
                "name": "Kanban",
                "type": "kanban"
            }
        ]
    }
]
```

---

# Rotas da API

### Registrar

```
 http://{host}/api/register | Body { name: string, email: string, password: string }
```

<br>

### Login

```
 http://{host}/api/login | Body { email: string, password: string }
```

<br>

### Dados do User Logado

```
 http://{host}/api/me

Como deve ser pedido, tem que mandar o token JWT que o login retorna no lugar do ${token}.

const token = 'SEU_ACCESS_TOKEN_JWT';

fetch('http://localhost:8000/api/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    console.log('Usuário:', data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });

```

<br>

### Rota de buscar as pastas e subpastas - incompleta, só está listando pastas com subpastas dentro

```
 http://{host}/api/folders
```


### Rota para buscar as materias - GET - Mandar token jwt

```
http://localhost:8000/api/materia
```

