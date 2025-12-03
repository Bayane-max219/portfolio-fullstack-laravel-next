<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
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

    public function adminIndex(Request $request)
    {
        $user = $this->requireAdmin($request);

        $certificates = Certificate::where('user_id', $user->id)
            ->orderBy('display_order')
            ->orderByDesc('issued_at')
            ->orderBy('id')
            ->get();

        $certificates->each(function (Certificate $certificate): void {
            $certificate->url = asset('storage/'.$certificate->image_path);
        });

        return response()->json($certificates);
    }

    public function adminStore(Request $request)
    {
        $user = $this->requireAdmin($request);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:50'],
            'issued_at' => ['nullable', 'date'],
            'display_order' => ['sometimes', 'integer'],
            'image' => ['required', 'image', 'max:4096'],
        ]);

        $path = $request->file('image')->store('certificates', 'public');

        $displayOrder = $data['display_order'] ?? null;
        if ($displayOrder === null) {
            $max = (int) Certificate::where('user_id', $user->id)->max('display_order');
            $displayOrder = $max + 1;
        }

        $certificate = Certificate::create([
            'user_id' => $user->id,
            'title' => $data['title'],
            'issuer' => $data['issuer'] ?? null,
            'type' => $data['type'] ?? null,
            'issued_at' => $data['issued_at'] ?? null,
            'image_path' => $path,
            'display_order' => $displayOrder,
        ]);

        $url = asset('storage/'.$certificate->image_path);

        return response()->json([
            'certificate' => $certificate,
            'url' => $url,
        ], 201);
    }

    public function adminUpdate(Request $request, Certificate $certificate)
    {
        $user = $this->requireAdmin($request);

        if ($certificate->user_id !== $user->id) {
            abort(403, 'You are not allowed to update this certificate');
        }

        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'issuer' => ['sometimes', 'nullable', 'string', 'max:255'],
            'type' => ['sometimes', 'nullable', 'string', 'max:50'],
            'issued_at' => ['sometimes', 'nullable', 'date'],
            'display_order' => ['sometimes', 'integer'],
            'image' => ['sometimes', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('image')) {
            if ($certificate->image_path) {
                Storage::disk('public')->delete($certificate->image_path);
            }

            $certificate->image_path = $request->file('image')->store('certificates', 'public');
        }

        if (array_key_exists('title', $data)) {
            $certificate->title = $data['title'];
        }

        if (array_key_exists('issuer', $data)) {
            $certificate->issuer = $data['issuer'] ?? null;
        }

        if (array_key_exists('type', $data)) {
            $certificate->type = $data['type'] ?? null;
        }

        if (array_key_exists('issued_at', $data)) {
            $certificate->issued_at = $data['issued_at'] ?? null;
        }

        if (array_key_exists('display_order', $data)) {
            $certificate->display_order = $data['display_order'];
        }

        $certificate->save();

        $url = asset('storage/'.$certificate->image_path);

        return response()->json([
            'certificate' => $certificate,
            'url' => $url,
        ]);
    }

    public function adminDestroy(Request $request, Certificate $certificate)
    {
        $user = $this->requireAdmin($request);

        if ($certificate->user_id !== $user->id) {
            abort(403, 'You are not allowed to delete this certificate');
        }

        if ($certificate->image_path) {
            Storage::disk('public')->delete($certificate->image_path);
        }

        $certificate->delete();

        return response()->json(null, 204);
    }

    public function publicIndex(Request $request)
    {
        $query = Certificate::query()
            ->orderBy('display_order')
            ->orderByDesc('issued_at')
            ->orderBy('id');

        if ($request->filled('type')) {
            $query->where('type', $request->string('type'));
        }

        $certificates = $query->get();

        $certificates->each(function (Certificate $certificate): void {
            $certificate->url = asset('storage/'.$certificate->image_path);
        });

        return response()->json($certificates);
    }
}
