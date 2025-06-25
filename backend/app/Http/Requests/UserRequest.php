<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|min:8',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Campo nome é obrigatório',
            'name.min' => 'Campo nome deve ter no mínimo 3 caracteres',
            'name.max' => 'Campo nome deve ter no máximo 255 caracteres',
            'email.required' => 'Campo email é obrigatório',
            'email.email' => 'Digite um email válido',
            'email.max' => 'Campo email deve ter no máximo 255 caracteres',
            'password.required' => 'Campo senha obrigatório',
            'password.min' => 'Campo senha deve ter no mínimo 8 caracteres',
        ];
    }
}
