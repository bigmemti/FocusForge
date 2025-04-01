<?php

namespace App\Enums;

enum TaskStatus: int
{
    case TODO = 0;
    case IN_PROGRESS = 1;
    case TESTING = 2;
    case DONE = 3;
    case BACKLOG = 4;
    case BLOCKED = 5;
    case READY_FOR_DEPLOYMENT = 6;
    case REJECTED = 7;

    public function label(): string
    {
        return match ($this) {
            self::TODO => 'Todo',
            self::IN_PROGRESS => 'In Progress',
            self::TESTING => 'Testing',
            self::DONE => 'Done',
            self::BACKLOG => 'Backlog',
            self::BLOCKED => 'Blocked',
            self::READY_FOR_DEPLOYMENT => 'Ready for Deployment',
            self::REJECTED => 'Rejected',
        };
    }
}
