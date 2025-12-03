<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectShowController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ProfileController;

Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'Portfolio API running',
        'time' => now()->toDateTimeString(),
    ]);
});

Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout']);

Route::get('/admin/projects', [ProjectController::class, 'index']);
Route::post('/admin/projects', [ProjectController::class, 'store']);
Route::post('/admin/projects/{project}/media', [ProjectController::class, 'storeMedia']);

Route::get('/admin/certificates', [CertificateController::class, 'adminIndex']);
Route::post('/admin/certificates', [CertificateController::class, 'adminStore']);
Route::put('/admin/certificates/{certificate}', [CertificateController::class, 'adminUpdate']);
Route::delete('/admin/certificates/{certificate}', [CertificateController::class, 'adminDestroy']);

Route::get('/admin/profile', [ProfileController::class, 'adminShow']);
Route::post('/admin/profile', [ProfileController::class, 'adminSave']);

Route::post('/admin/educations', [ProfileController::class, 'adminStoreEducation']);
Route::put('/admin/educations/{education}', [ProfileController::class, 'adminUpdateEducation']);
Route::delete('/admin/educations/{education}', [ProfileController::class, 'adminDestroyEducation']);

Route::post('/admin/skills', [ProfileController::class, 'adminStoreSkill']);
Route::put('/admin/skills/{skill}', [ProfileController::class, 'adminUpdateSkill']);
Route::delete('/admin/skills/{skill}', [ProfileController::class, 'adminDestroySkill']);

Route::post('/admin/languages', [ProfileController::class, 'adminStoreLanguage']);
Route::put('/admin/languages/{language}', [ProfileController::class, 'adminUpdateLanguage']);
Route::delete('/admin/languages/{language}', [ProfileController::class, 'adminDestroyLanguage']);

Route::get('/projects', [ProjectController::class, 'publicIndex']);
Route::get('/projects/{project}', ProjectShowController::class);
Route::get('/certificates', [CertificateController::class, 'publicIndex']);
Route::get('/profile', [ProfileController::class, 'publicShow']);
