<?php

namespace App\Http\Controllers;

use App\Models\Permission;

class PermissionController extends Controller
{
    public static function loadPermissions($role)
    {
        $sess = Array();

        $perm = Permission::with(['resource'])->where('role_id', $role)->get();
        foreach ($perm as $item) {
            $sess[$item->resource->name] = (bool) $item->permission;
        }
        session(['user_permissions' => $sess]);
    }

    public static function isAuthorized($resource)
    {
        $permissions = session('user_permissions');
        return $permissions[$resource];
    }
}
