<?php

namespace App\Enums;

enum TaskPriority: int
{
    case HIGHEST = 0;
    case HIGH = 1;
    case MEDIUM = 2;
    case LOW = 3;
    case LOWEST = 4;

    public function label(): string
    {
        return match ($this) {
            self::HIGHEST => 'Highest',
            self::HIGH => 'High',
            self::MEDIUM => 'Medium',
            self::LOW => 'Low',
            self::LOWEST => 'Lowest',
        };
    }
}
