<?php
namespace App\Repositories;
use PDO;

class ClientRepository extends Repository
{
    
    public function add($name, $url, $image){
        try {
            $sql = 'INSERT INTO client (name, url, image) VALUES (:name, :url, :image)';
            $stmt = $this->db->prepare($sql);
            $res = $stmt->execute([':name' => $name, ':url' => $url, ':image' => $image]);
            
            if (!$res) {
                return false;
            }

            $stmt = null;
            return true;

        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * delete client
     *
     * @param [type] $id
     * @return void
     */
    public function deleteById($id)
    {
        try {
            $sql = 'DELETE FROM client WHERE id = :id';
            $stmt = $this->db->prepare($sql);

            $res = $stmt->execute([':id' => $id]);
            $stmt = null;
            if (!$res) {
                return false;
            }

            return true;
        } catch (Exception $e) {
            print $e->getMessage();
        }
    }

    public function getAll($howMany = -1)
    {
        $clients = array();

        try {
            if($howMany == -1){
                $sql = 'SELECT id, name, url, image FROM client';
            } else {
                $sql = 'SELECT id, name, url, image FROM client LIMIT '. $howMany;
            }
            
            $stmt = $this->db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
            $stmt->execute();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
                $clients[] = new \App\Dtos\Client($row['id'], $row['name'], $row['url'], $row['image']);
            }
            $stmt = null;
          
        } catch (Exception $e) {
            print $e->getMessage();          
        }

        return $clients;
    }
}
