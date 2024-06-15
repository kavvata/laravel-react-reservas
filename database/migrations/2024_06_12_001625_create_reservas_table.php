<?php

use App\Models\Reservavel;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Reservavel::class);
            $table->foreignIdFor(User::class);
            $table->dateTime('inicio');
            $table->dateTime('devolucao_prevista');
            $table->dateTime('devolucao')->nullable(true);
            $table->string('descricao');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
