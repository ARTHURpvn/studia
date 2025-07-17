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
```

<br>

### Rota de buscar as pastas e subpastas - incompleta, só está listando pastas com subpastas dentro

```
 http://{host}/api/folders
```

