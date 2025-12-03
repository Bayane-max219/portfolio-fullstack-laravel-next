<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('email')->nullable()->after('location');
            $table->string('phone')->nullable()->after('email');
            $table->string('facebook_url')->nullable()->after('linkedin_url');
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['email', 'phone', 'facebook_url']);
        });
    }
};
