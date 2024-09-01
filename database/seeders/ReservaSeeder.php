<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $format = 'Y-m-d H:i:s';
        $data = [
            [
                'responsavel_id' => '1',
                'reservavel_id' => '1',
                'descricao' => 'Prof. Murilo, sala 31',
                'inicio' => date($format, strtotime('now')),
                'devolucao_prevista' => date($format, strtotime('+5 hours')),
                'devolucao' => null,
            ],
        ];

        DB::table('reservas')->insert($data);
    }
}
