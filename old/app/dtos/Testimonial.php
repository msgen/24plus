<?php
namespace App\Dtos;

class Testimonial {
    public $id;
    public $testimonial;
    public $client;

    public function __construct($id, $testimonial, $client){
        $this->id = $id;
        $this->testimonial = $testimonial;
        $this->client = $client;
    }
}
?>