<?php

namespace App\Http\Requests;

use App\Models\Task;
use App\Enums\TaskPriority;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', [Task::class, request()->user()]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255|min:3',
            'priority' => 'nullable|integer|in:' . implode(',', array_column(TaskPriority::cases(), 'value')),
        ];
    }
}
