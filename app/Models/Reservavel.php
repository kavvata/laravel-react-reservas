<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservavel extends Model
{
    protected $table = 'reservaveis';

    use HasFactory;

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
