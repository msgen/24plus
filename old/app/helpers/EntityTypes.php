<?php
namespace App\Helpers;

class EntityTypes {

    public static function getEntityTypes(){
        $entities = [
            // productie publicitara
            "litere-volumetrice" => ["type" => 1, "classification" => "productie-publicitara"],
            "casete-luminoase" => ["type" => 2, "classification" => "productie-publicitara"],
            "totem" => ["type" => 3, "classification" => "productie-publicitara"],
            "personalizari-auto" => ["type" => 4, "classification" => "productie-publicitara"],
            "decorari-geamuri-si-vitrine" => ["type" => 5, "classification" => "productie-publicitara"],
            "gravura-computerizata" => ["type" => 6, "classification" => "productie-publicitara"],
            "panouri-publicitare" => ["type" => 7, "classification" => "productie-publicitara"],
            "mese-candybar" => ["type" => 8, "classification" => "productie-publicitara"],
            "decupaj-polistiren" => ["type" => 9, "classification" => "productie-publicitara"],
            // printuri mari
            "autocolante" => ["type" => 10, "classification" => "printuri-mari"],
            "bannere" => ["type" => 11, "classification" => "printuri-mari"],
            "print-afise" => ["type" => 12, "classification" => "printuri-mari"],
            "tablouri-canvas" => ["type" => 13, "classification" => "printuri-mari"],
            "fototapet" => ["type" => 14, "classification" => "printuri-mari"],
            // printuri digitale
            "flyere-pliante" => ["type" => 15, "classification" => "print-digital"],
            "pliante" => ["type" => 16, "classification" => "print-digital"],
            "flyere" => ["type" => 17, "classification" => "print-digital"],
            "afise" => ["type" => 18, "classification" => "print-digital"],
            "carti-de-vizita" => ["type" => 19, "classification" => "print-digital"],
            "cataloage-si-brosuri" => ["type" => 20, "classification" => "print-digital"],
            "mape-de-prezentare" => ["type" => 21, "classification" => "print-digital"],
            "calendare" => ["type" => 22, "classification" => "print-digital"],
            "foi-cu-antet" => ["type" => 23, "classification" => "print-digital"],
            "etichete" => ["type" => 24, "classification" => "print-digital"],
            "felicitari" => ["type" => 25, "classification" => "print-digital"],
            "ecusoane-si-legitimatii" => ["type" => 26, "classification" => "print-digital"],
            // obiecte promotionale
            "obiecte-promotionale" => ["type" => 27, "classification" => "obiecte-promotionale"],
            "tricouri-personalizate" => ["type" => 28, "classification" => "obiecte-promotionale"],
            "pixuri" => ["type" => 29, "classification" => "obiecte-promotionale"],
            "brelocuri" => ["type" => 30, "classification" => "obiecte-promotionale"],
            "brichete" => ["type" => 31, "classification" => "obiecte-promotionale"],
            "magneti-frigider" => ["type" => 32, "classification" => "obiecte-promotionale"],
            "roll-up" => ["type" => 33, "classification" => "obiecte-promotionale"],
            "alte-obiecte-promotionale" => ["type" => 34, "classification" => "obiecte-promotionale"]
        ];

        return $entities;
    }
}
?>