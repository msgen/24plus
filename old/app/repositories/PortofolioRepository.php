<?php
namespace App\Repositories;

use PDO;

class PortofolioRepository extends Repository
{
    public function getClassified()
    {
        $portofolio = [];

        try {
            $sql = 'SELECT id, clientId, smallUrl, bigUrl, type FROM portofolio WHERE promoted = 1 LIMIT 16';
            $stmt = $this->db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
            $stmt->execute();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
                $image = new \App\Dtos\Image($row['id'], $row['clientId'], $row['smallUrl'], $row['bigUrl']);
                $image->guid = \App\Helpers\ImageHelper::guid();
                $classification = $this->getClassification($row['type']);
                $portofolio[] = new \App\Dtos\Portofolio($image, $row['type'], $classification);
            }
            $stmt = null;
        } catch (Exception $e) {
            print $e->getMessage();
        }

        return $portofolio;
    }

    public function getByType($type)
    {
        $images = array();

        try {
            $sql = 'SELECT id, clientId, smallUrl, bigUrl, promoted FROM portofolio WHERE type = :type';
            $stmt = $this->db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
            $stmt->execute([':type' => $type]);
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
                $image = new \App\Dtos\Image($row['id'], $row['clientId'], $row['smallUrl'], $row['bigUrl'], $row['promoted']);
                $image->guid = \App\Helpers\ImageHelper::guid();
                $images[] = $image;
            }
            $stmt = null;
        } catch (Exception $e) {
            print $e->getMessage();
        }
        
        return $images;
    }

    public function getByClient($clientId)
    {
        $portofolio = [];

        try {
            $sql = 'SELECT id, type, smallUrl, bigUrl FROM portofolio WHERE clientId = :clientId';
            $stmt = $this->db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
            $stmt->execute([':clientId' => $clientId]);
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
                $classification = $this->getClassification($row['type']);
                $image = new \App\Dtos\Image($row['id'], $clientId, $row['smallUrl'], $row['bigUrl']);
                $image->guid = \App\Helpers\ImageHelper::guid();
                $portofolio[] = new \App\Dtos\Portofolio($image, $row['type'], $classification);
            }
            $stmt = null;
        } catch (Exception $e) {
            print $e->getMessage();
        }
        return $portofolio;
    }

    public function getImageById($id)
    {
        $image = null;

        try {
            $sql = 'SELECT id, clientId, smallUrl, bigUrl FROM portofolio WHERE id = :id';
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);
            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $image = new \App\Dtos\Image($row['id'], $row['clientId'], $row['smallUrl'], $row['bigUrl']);
                $image->guid = \App\Helpers\ImageHelper::guid();
            }
            $stmt = null;
        } catch (Exception $e) {
            print $e->getMessage();
        }

        return $image;
    }

    /**
     * delete image
     *
     * @param [type] $id
     * @return void
     */
    public function deleteImageById($id)
    {
        try {
            $sql = 'DELETE FROM portofolio WHERE id = :id';
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

     /**
     * change promoted image status
     *
     * @param [type] $id
     * @return void
     */
    public function changePromotedImageStatusById($id)
    {
        try {
            $sql = 'UPDATE portofolio SET promoted = !promoted WHERE id = :id';
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

    /**
     * delete image
     *
     * @param [type] $id
     * @return void
     */
    public function deleteByClientId($id)
    {
        try {
            $sql = 'DELETE FROM portofolio WHERE clientId = :id';
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

    /**
     * add image to portofolio
     *
     * @param [type] $clientId
     * @param [type] $bigImageUrl
     * @param [type] $smallImageUrl
     * @param [type] $type
     * @return void
     */
    public function addImage($clientId, $bigImageUrl, $smallImageUrl, $type)
    {
        try {
            $sql = 'INSERT INTO portofolio (clientId, smallUrl, bigUrl, type) VALUES (:clientId, :smallUrl, :bigUrl, :type)';
            $stmt = $this->db->prepare($sql);
            $res = $stmt->execute([':clientId' => $clientId, ':smallUrl' => $smallImageUrl, ':bigUrl' => $bigImageUrl, ':type' => $type]);
            
            if (!$res) {
                return false;
            }
            $stmt = null;
        } catch (Exception $e) {
            print $e->getMessage();
        }

        return true;
    }

    private function getClassification($type)
    {
        $entities = \App\Helpers\EntityTypes::getEntityTypes();
        foreach ($entities as $key => $value) {
            if ($value["type"] == $type) {
                return $value["classification"];
            }
        }
    }
}
