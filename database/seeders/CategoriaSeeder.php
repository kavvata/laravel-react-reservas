<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nome' => 'Projetores',
            ],
            [
                'nome' => 'Salas',
            ],
        ];

        DB::table('categorias')->insert($data);
    }
}
