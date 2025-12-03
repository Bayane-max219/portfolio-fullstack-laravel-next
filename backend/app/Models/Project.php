<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'stack_slug',
        'slug',
        'short_description',
        'description',
        'github_url',
        'demo_url',
        'is_featured',
        'display_order',
    ];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProjectMedia::class);
    }
}
