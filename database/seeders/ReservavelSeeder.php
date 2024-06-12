<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            ],
            [
                'nome' => 'Projetor 02',
                'isReservado' => false,
            ],
            [
                'nome' => 'Projetor 03',
                'isReservado' => true,
            ],
        ];

        DB::table('reservaveis')->insert($data);
    }
}
