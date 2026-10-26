<?php
namespace App\Repositories;

abstract class Repository {
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }
}

?>