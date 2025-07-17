<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FolderController extends Controller
{
    public function listarPastasDoUsuario(Request $request)
    {
        $userId = $request->input('userid'); // ← Aqui estamos pegando o parâmetro enviado via URL ou query string

        $response = Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'),
            'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
            'Content-Type' => 'application/json',
        ])->get(env('SUPABASE_URL') . '/rest/v1/folders', [
            'select' => '*',
            'userid' => 'eq.' . $userId,
            'deleteAt' => 'is.null'
        ]);

        return response()->json($response->json(), $response->status());
    }

    public function listarPastas()
    {
        // Buscar folders
        $foldersResponse = Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'),
            'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
            'Content-Type' => 'application/json',
        ])->get(env('SUPABASE_URL') . '/rest/v1/folders', [
            'select' => '*'
        ]);

        // Buscar subfolders
        $subfoldersResponse = Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'),
            'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
            'Content-Type' => 'application/json',
        ])->get(env('SUPABASE_URL') . '/rest/v1/subfolders', [
            'select' => '*'
        ]);

        $folders = $foldersResponse->json();
        $subfolders = $subfoldersResponse->json();

        // Indexa subfolders por id
        $subfoldersById = collect($subfolders)->keyBy('id');

        // Função recursiva para montar árvore
        $buildSubfolderTree = function ($childrenIds) use (&$buildSubfolderTree, $subfoldersById) {
            $result = [];

            foreach ($childrenIds as $childId) {
                if (!isset($subfoldersById[$childId])) {
                    continue;
                }

                $child = $subfoldersById[$childId];

                $node = [
                    'id' => (string) $child['id'],
                    'name' => $child['name'],
                    'type' => 'folder',
                    'children' => [],
                ];

                if (!empty($child['children'])) {
                    $childChildrenIds = is_string($child['children']) ? json_decode($child['children'], true) : $child['children'];
                    $node['children'] = $buildSubfolderTree($childChildrenIds);
                }

                $result[] = $node;
            }

            return $result;
        };

        // Montar estrutura final por folder
        $final = collect($folders)->map(function ($folder) use ($subfoldersById, $buildSubfolderTree) {
            $folderChildren = [];

            // Subfolders que pertencem a esta folder
            $directSubfolders = $subfoldersById->filter(function ($sub) use ($folder) {
                return $sub['folder_id'] === $folder['id'];
            });

            foreach ($directSubfolders as $sub) {
                $node = [
                    'id' => (string) $sub['id'],
                    'name' => $sub['name'],
                    'type' => 'folder',
                    'children' => [],
                ];

                if (!empty($sub['children'])) {
                    $childIds = is_string($sub['children']) ? json_decode($sub['children'], true) : $sub['children'];
                    $node['children'] = $buildSubfolderTree($childIds);
                }

                $folderChildren[] = $node;
            }

            return [
                'id' => (string) $folder['id'],
                'name' => $folder['name'],
                'type' => 'folder',
                'children' => $folderChildren,
            ];
        });

        return response()->json($final->values());
    }
}
