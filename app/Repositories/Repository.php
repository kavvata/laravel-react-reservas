<?php

namespace App\Repositories;

interface Repository
{
    public function selectAll();

    public function selectAllWith(array $relations);

    public function findById($id);

    public function findByIdWith(array $relations, $id);

    public function findDeletedById($id);

    public function findByColumn($column, $value);

    public function findFirstByColumn($column, $value);

    public function save($obj);

    public function delete($id);

    public function restore($id);
}
