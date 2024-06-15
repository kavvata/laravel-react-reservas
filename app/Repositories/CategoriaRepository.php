<?php

namespace App\Repositories;

use App\Models\Categoria;
use App\Repositories\Repository;

class CategoriaRepository implements Repository
{
    protected $model;

    public function __construct()
    {
        $this->model = new Categoria;
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
        $reservavel = $this->findById($id);
        if (!isset($reservavel)) {
            return false;
        }

        try {
            $reservavel->delete();
            return true;
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function restore($id)
    {
        $reservavel = $this->findById($id);

        if (isset($reservavel)) {
            return false;
        }

        try {
            $reservavel->restore();
            return true;
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
