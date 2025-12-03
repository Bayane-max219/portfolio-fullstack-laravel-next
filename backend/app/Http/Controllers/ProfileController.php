<?php

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\Language;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
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

    public function adminShow(Request $request)
    {
        $user = $this->requireAdmin($request);

        $profile = Profile::where('user_id', $user->id)->first();
        if ($profile) {
            $profile->avatar_url = $profile->avatar_path
                ? asset('storage/'.$profile->avatar_path)
                : null;
        }

        $educations = Education::where('user_id', $user->id)
            ->orderByDesc('end_year')
            ->orderByDesc('start_year')
            ->orderByDesc('id')
            ->get();

        $skills = Skill::where('user_id', $user->id)
            ->orderBy('category')
            ->orderByDesc('level')
            ->orderBy('name')
            ->get();

        $languages = Language::where('user_id', $user->id)
            ->orderBy('name')
            ->get();

        return response()->json([
            'profile' => $profile,
            'educations' => $educations,
            'skills' => $skills,
            'languages' => $languages,
        ]);
    }

    public function adminSave(Request $request)
    {
        $user = $this->requireAdmin($request);

        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'short_bio' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'years_of_experience' => ['nullable', 'integer', 'min:0', 'max:60'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'avatar' => ['sometimes', 'image', 'max:4096'],
        ]);

        $profile = Profile::firstOrNew(['user_id' => $user->id]);

        if ($request->hasFile('avatar')) {
            if ($profile->avatar_path) {
                Storage::disk('public')->delete($profile->avatar_path);
            }

            $profile->avatar_path = $request->file('avatar')->store('avatars', 'public');
        }

        $profile->full_name = $data['full_name'];
        $profile->title = $data['title'] ?? null;
        $profile->short_bio = $data['short_bio'] ?? null;
        $profile->location = $data['location'] ?? null;
        $profile->years_of_experience = $data['years_of_experience'] ?? null;
        $profile->email = $data['email'] ?? null;
        $profile->phone = $data['phone'] ?? null;
        $profile->github_url = $data['github_url'] ?? null;
        $profile->linkedin_url = $data['linkedin_url'] ?? null;
        $profile->facebook_url = $data['facebook_url'] ?? null;
        $profile->website_url = $data['website_url'] ?? null;
        $profile->save();

        $profile->avatar_url = $profile->avatar_path
            ? asset('storage/'.$profile->avatar_path)
            : null;

        return response()->json([
            'profile' => $profile,
        ]);
    }

    public function adminStoreEducation(Request $request)
    {
        $user = $this->requireAdmin($request);

        $data = $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'degree' => ['nullable', 'string', 'max:255'],
            'field' => ['nullable', 'string', 'max:255'],
            'start_year' => ['nullable', 'integer', 'min:1900', 'max:2100'],
            'end_year' => ['nullable', 'integer', 'min:1900', 'max:2100'],
            'description' => ['nullable', 'string'],
        ]);

        $education = Education::create([
            'user_id' => $user->id,
            'institution' => $data['institution'],
            'degree' => $data['degree'] ?? null,
            'field' => $data['field'] ?? null,
            'start_year' => $data['start_year'] ?? null,
            'end_year' => $data['end_year'] ?? null,
            'description' => $data['description'] ?? null,
        ]);

        return response()->json($education, 201);
    }

    public function adminUpdateEducation(Request $request, Education $education)
    {
        $user = $this->requireAdmin($request);

        if ($education->user_id !== $user->id) {
            abort(403, 'You are not allowed to update this education');
        }

        $data = $request->validate([
            'institution' => ['sometimes', 'string', 'max:255'],
            'degree' => ['sometimes', 'nullable', 'string', 'max:255'],
            'field' => ['sometimes', 'nullable', 'string', 'max:255'],
            'start_year' => ['sometimes', 'nullable', 'integer', 'min:1900', 'max:2100'],
            'end_year' => ['sometimes', 'nullable', 'integer', 'min:1900', 'max:2100'],
            'description' => ['sometimes', 'nullable', 'string'],
        ]);

        foreach ($data as $key => $value) {
            $education->{$key} = $value;
        }

        $education->save();

        return response()->json($education);
    }

    public function adminDestroyEducation(Request $request, Education $education)
    {
        $user = $this->requireAdmin($request);

        if ($education->user_id !== $user->id) {
            abort(403, 'You are not allowed to delete this education');
        }

        $education->delete();

        return response()->json(null, 204);
    }

    public function adminStoreSkill(Request $request)
    {
        $user = $this->requireAdmin($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'level' => ['required', 'integer', 'min:0', 'max:100'],
            'category' => ['nullable', 'string', 'max:100'],
            'icon_key' => ['nullable', 'string', 'max:100'],
        ]);

        $skill = Skill::create([
            'user_id' => $user->id,
            'name' => $data['name'],
            'level' => $data['level'],
            'category' => $data['category'] ?? null,
            'icon_key' => $data['icon_key'] ?? null,
        ]);

        return response()->json($skill, 201);
    }

    public function adminUpdateSkill(Request $request, Skill $skill)
    {
        $user = $this->requireAdmin($request);

        if ($skill->user_id !== $user->id) {
            abort(403, 'You are not allowed to update this skill');
        }

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'level' => ['sometimes', 'integer', 'min:0', 'max:100'],
            'category' => ['sometimes', 'nullable', 'string', 'max:100'],
            'icon_key' => ['sometimes', 'nullable', 'string', 'max:100'],
        ]);

        foreach ($data as $key => $value) {
            $skill->{$key} = $value;
        }

        $skill->save();

        return response()->json($skill);
    }

    public function adminDestroySkill(Request $request, Skill $skill)
    {
        $user = $this->requireAdmin($request);

        if ($skill->user_id !== $user->id) {
            abort(403, 'You are not allowed to delete this skill');
        }

        $skill->delete();

        return response()->json(null, 204);
    }

    public function adminStoreLanguage(Request $request)
    {
        $user = $this->requireAdmin($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'level' => ['nullable', 'string', 'max:100'],
        ]);

        $language = Language::create([
            'user_id' => $user->id,
            'name' => $data['name'],
            'level' => $data['level'] ?? null,
        ]);

        return response()->json($language, 201);
    }

    public function adminUpdateLanguage(Request $request, Language $language)
    {
        $user = $this->requireAdmin($request);

        if ($language->user_id !== $user->id) {
            abort(403, 'You are not allowed to update this language');
        }

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'level' => ['sometimes', 'nullable', 'string', 'max:100'],
        ]);

        foreach ($data as $key => $value) {
            $language->{$key} = $value;
        }

        $language->save();

        return response()->json($language);
    }

    public function adminDestroyLanguage(Request $request, Language $language)
    {
        $user = $this->requireAdmin($request);

        if ($language->user_id !== $user->id) {
            abort(403, 'You are not allowed to delete this language');
        }

        $language->delete();

        return response()->json(null, 204);
    }

    public function publicShow(Request $request)
    {
        $profile = Profile::first();

        if (! $profile) {
            return response()->json([
                'profile' => null,
                'educations' => [],
                'skills' => [],
                'languages' => [],
            ]);
        }

        $profile->avatar_url = $profile->avatar_path
            ? asset('storage/'.$profile->avatar_path)
            : null;

        $educations = Education::where('user_id', $profile->user_id)
            ->orderByDesc('end_year')
            ->orderByDesc('start_year')
            ->orderByDesc('id')
            ->get();

        $skills = Skill::where('user_id', $profile->user_id)
            ->orderBy('category')
            ->orderByDesc('level')
            ->orderBy('name')
            ->get();

        $languages = Language::where('user_id', $profile->user_id)
            ->orderBy('name')
            ->get();

        return response()->json([
            'profile' => $profile,
            'educations' => $educations,
            'skills' => $skills,
            'languages' => $languages,
        ]);
    }
}
