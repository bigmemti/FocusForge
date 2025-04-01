<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use App\Enums\TaskStatus;
use App\Enums\TaskPriority;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('update', request()->task);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string|max:255|min:3|nullable',
            'status' => 'integer|nullable|in:' . implode(',', array_column(TaskStatus::cases(), 'value')),
            'priority' => 'integer|nullable|in:' . implode(',', array_column(TaskPriority::cases(), 'value')),
        ];
    }
}
