<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reserva extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function reservavel()
    {
        return $this->belongsTo(Reservavel::class);
    }

    public function responsavel()
    {
        return $this->hasOne(User::class);
    }
}
