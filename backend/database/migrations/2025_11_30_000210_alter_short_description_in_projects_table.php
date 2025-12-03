<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Passer short_description de VARCHAR(255) à TEXT pour accepter des descriptions plus longues
        DB::statement('ALTER TABLE `projects` MODIFY `short_description` TEXT NULL');
    }

    public function down(): void
    {
        // Revenir à VARCHAR(255) si besoin
        DB::statement('ALTER TABLE `projects` MODIFY `short_description` VARCHAR(255) NULL');
    }
};
