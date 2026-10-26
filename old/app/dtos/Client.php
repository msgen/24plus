<?php
namespace App\Dtos;

class Client {
    public $id;
    public $name;
    public $url;
    public $image;

    public function __construct($id, $name, $url, $image){
        $this->id = $id;
        $this->name = $name;
        $this->url = $url;
        $this->image = $image;
    }
}
?>