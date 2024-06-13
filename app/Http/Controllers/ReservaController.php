<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Repositories\Repository;
use App\Repositories\ReservavelRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservaController extends Controller
{
    protected Repository $repository;

    public function __construct()
    {
        $this->repository = new ReservavelRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservas = $this->repository->selectAll();
        return Inertia::render('Reservas/Index', ['reservasJson' => json_encode($reservas)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Reserva $reserva)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reserva $reserva)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reserva $reserva)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reserva $reserva)
    {
        //
    }
}
