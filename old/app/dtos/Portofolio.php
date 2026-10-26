<?php
namespace App\Dtos;

class Portofolio {
    public $image;
    public $type;
    public $classification;

    public function __construct($image, $type, $classification){
        $this->image = $image;
        $this->type = $type;
        $this->classification = $classification;
    }
}
?>