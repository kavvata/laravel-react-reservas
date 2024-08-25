<?php

namespace App\Repositories;

use App\Models\Reserva;
use App\Repositories\Repository;

class ReservaRepository implements Repository
{
    protected $model;

    public function __construct()
    {
        $this->model = new Reserva;
    }

    public function selectAll()
    {
        return $this->model->all();
    }

    public function selectAllWith(array $relations)
    {
        return $this->model::with($relations)->get();
    }

    public function findById($id)
    {
        return $this->model->find($id);
    }

    public function findByIdWith(array $relations, $id)
    {
        return $this->model::with($relations)->find($id);
    }

    public function findDeletedById($id)
    {
        return $this->model->onlyTrashed()->find($id);
    }

    public function findByColumn($column, $value)
    {
        return $this->model->where($column, $value)->get();
    }

    public function findFirstByColumn($column, $value)
    {
        return $this->model->where($column, $value)->get()->first();
    }

    public function save($newReservavel)
    {
        try {
            return $newReservavel->save();
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function delete($id)
    {
        $reserva = $this->findById($id);
        if (!isset($reserva)) {
            return false;
        }

        try {
            $reserva->delete();
            return true;
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function restore($id)
    {
        $reserva = $this->findById($id);

        if (isset($reserva)) {
            return false;
        }

        try {
            $reserva->restore();
            return true;
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
