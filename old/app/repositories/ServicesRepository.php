<?php
namespace App\Repositories;
use PDO;

class ServicesRepository extends Repository
{
    public function getByType($type)
    {
        $entity = new \App\Dtos\Entity();

        try {
            $sql = 'SELECT id, title, description FROM entity WHERE type = :type';
            $stmt = $this->db->prepare($sql);
            $stmt->setFetchMode(PDO::FETCH_INTO, $entity);

            $stmt->execute([':type' => $type]);
            
            $entity = $stmt->fetch();
            $stmt = null;
        } catch (Exception $e) {
            print $e->getMessage();          
        }

        return $entity;
    }

    public function edit($editable){
        try {
            $sql = 'UPDATE entity SET description =:description WHERE id = :id';
            $stmt = $this->db->prepare($sql);

            $res = $stmt->execute([':id' => $editable->pk, ':description' => $editable->value]);
            $stmt = null;
            if(!$res){
                return false;
            }

            return true;
        } catch (Exception $e) {
            print $e->getMessage();          
        }
    }
}
