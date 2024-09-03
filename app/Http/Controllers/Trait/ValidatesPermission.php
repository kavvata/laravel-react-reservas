<?php

namespace App\Http\Controllers\Trait;

use Illuminate\Support\Facades\Auth;

trait ValidatesPermission
{
    /**
     * @return bool
     */
    public function validaPermissao(string $permission = ''): bool
    {
        $isAutorizado = false;

        foreach (Auth::user()->getPermissionsViaRoles() as $permExistente) {
            if ($permExistente->name == $permission) {
                $isAutorizado = true;
            }
        }

        return $isAutorizado;
    }
}
