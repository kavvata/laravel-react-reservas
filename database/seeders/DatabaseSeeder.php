<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategoriaSeeder::class,
            ReservavelSeeder::class,
            ReservaSeeder::class,
            RolesAndPermissionsSeeder::class
        ]);

        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Professor',
            'email' => 'prof@example.com',
        ])->assignRole('professor');

        User::factory()->create([
            'name' => 'Tecnico User',
            'email' => 'tecnico@example.com',
        ])->assignRole('tecnico');

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ])->assignRole('super-admin');
    }
}
