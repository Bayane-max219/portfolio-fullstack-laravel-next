<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMedia;

class ProjectShowController extends Controller
{
    public function __invoke(Project $project)
    {
        $project->load('media');

        $sorted = $project->media
            ->sortBy('display_order')
            ->values();

        $sorted->each(function (ProjectMedia $media): void {
            if ($media->file_path) {
                $media->url = asset('storage/'.$media->file_path);
            }
        });

        $project->setRelation('media', $sorted);

        return response()->json($project);
    }
}
