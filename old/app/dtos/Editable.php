<?php
namespace App\Dtos;

class Editable {
    public $pk;
    public $name;
    public $value;

    public function __construct($pk, $name, $value){
        $this->pk = $pk;
        $this->name = $name;
        $this->value = $value;
    }
}
?>