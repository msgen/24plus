<?php
namespace App\Dtos;

class Image {
    public $id;
    public $clientId;
    public $smallUrl;
    public $bigUrl;
    public $guid;
    public $promoted;
    
    public function __construct($id, $clientId, $smallUrl, $bigUrl, $promoted = false){
        $this->id = $id;
        $this->clientId = $clientId;
        $this->smallUrl = $smallUrl;
        $this->bigUrl = $bigUrl;
        $this->promoted = $promoted;
    }
}
?>