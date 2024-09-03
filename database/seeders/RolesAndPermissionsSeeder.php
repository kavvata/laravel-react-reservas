<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'editar reservaveis']);
        Permission::create(['name' => 'remover reservaveis']);
        Permission::create(['name' => 'ver reservas']);
        Permission::create(['name' => 'editar reservas']);

        // create roles and assign created permissions

        $role = Role::create(['name' => 'professor'])->givePermissionTo('ver reservas');

        $role = Role::create(['name' => 'tecnico'])
            ->givePermissionTo(['editar reservaveis', 'remover reservaveis',
                'ver reservas', 'editar reservas']);

        $role = Role::create(['name' => 'super-admin']);
        $role->givePermissionTo(Permission::all());
    }
}
