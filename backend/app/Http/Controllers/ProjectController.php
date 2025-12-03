<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMedia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    protected function requireAdmin(Request $request): User
    {
        $token = $request->bearerToken();

        if (! $token) {
            abort(401, 'Missing API token');
        }

        $user = User::where('api_token', $token)->first();

        if (! $user) {
            abort(401, 'Invalid API token');
        }

        return $user;
    }

    public function index(Request $request)
    {
        $this->requireAdmin($request);

        $projects = Project::with(['media', 'technologies'])
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $this->requireAdmin($request);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'stack_slug' => ['nullable', 'string', 'max:50'],
            'short_description' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'is_featured' => ['sometimes', 'boolean'],
            'display_order' => ['sometimes', 'integer'],
            'technologies' => ['sometimes', 'array'],
            'technologies.*' => ['integer', 'exists:technologies,id'],
        ]);

        $slug = Str::slug($data['title']);
        $baseSlug = $slug;
        $suffix = 1;

        while (Project::where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$suffix;
            $suffix++;
        }

        $data['slug'] = $slug;

        if (! array_key_exists('is_featured', $data)) {
            $data['is_featured'] = false;
        }

        if (! array_key_exists('display_order', $data)) {
            $data['display_order'] = 0;
        }

        $project = Project::create($data);

        if (! empty($data['technologies'])) {
            $project->technologies()->sync($data['technologies']);
        }

        return response()->json(
            $project->load(['media', 'technologies']),
            201,
        );
    }

    public function storeMedia(Request $request, Project $project)
    {
        $this->requireAdmin($request);

        $data = $request->validate([
            'type' => ['required', 'in:screenshot,video'],
            'image' => ['required_if:type,screenshot', 'image', 'max:4096'],
            'video_url' => ['required_if:type,video', 'url', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
            'display_order' => ['sometimes', 'integer'],
        ]);

        $filePath = null;

        if ($data['type'] === 'screenshot' && $request->hasFile('image')) {
            $filePath = $request->file('image')->store('project_media', 'public');
        }

        $displayOrder = $data['display_order'] ?? null;
        if ($displayOrder === null) {
            $max = (int) $project->media()->max('display_order');
            $displayOrder = $max + 1;
        }

        $media = $project->media()->create([
            'type' => $data['type'],
            'file_path' => $filePath,
            'video_url' => $data['type'] === 'video' ? $data['video_url'] : null,
            'caption' => $data['caption'] ?? null,
            'display_order' => $displayOrder,
        ]);

        $url = null;
        if ($media->file_path) {
            $url = asset('storage/'.$media->file_path);
        }

        return response()->json([
            'media' => $media,
            'url' => $url,
        ], 201);
    }

    public function publicIndex(Request $request)
    {
        $query = Project::with('media')
            ->orderBy('display_order')
            ->orderBy('id');

        if ($request->filled('stack')) {
            $query->where('stack_slug', $request->string('stack'));
        }

        $projects = $query->get();

        $projects->each(function (Project $project): void {
            $sorted = $project->media
                ->sortBy('display_order')
                ->values();

            $sorted->each(function (ProjectMedia $media): void {
                if ($media->file_path) {
                    $media->url = asset('storage/'.$media->file_path);
                }
            });

            $project->setRelation('media', $sorted);
        });

        return response()->json($projects);
    }
}
