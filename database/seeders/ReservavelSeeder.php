<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservavelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nome' => 'Projetor 01',
                'isReservado' => false,
                'categoria_id' => 1,
            ],
            [
                'nome' => 'Projetor 02',
                'isReservado' => false,
                'categoria_id' => 1,
            ],
            [
                'nome' => 'Projetor 03',
                'isReservado' => true,
                'categoria_id' => 1,
            ],
            [
                'nome' => 'Laboratorio de Informatica',
                'isReservado' => false,
                'categoria_id' => 2
            ]
        ];

        DB::table('reservaveis')->insert($data);
    }
}
