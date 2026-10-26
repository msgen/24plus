<?php
namespace App\Repositories;

use PDO;

class TestimonialRepository extends Repository
{
    public function getLatest($howMany)
    {
        $testimonials = array();

        try {
            $sql = 'SELECT t.id, t.testimonial, c.id, c.name, c.image, c.url FROM testimonial t INNER JOIN client c ON c.id = t.clientId ORDER BY t.itime DESC LIMIT ' . $howMany;
            $stmt = $this->db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
            $stmt->execute();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
                $client = new \App\Dtos\Client($row['id'], $row['name'], $row['image'], $row['url']);
                $testimonials[] = new \App\Dtos\Testimonial($row['id'], $row['testimonial'], $client);
            }
            $stmt = null;
        } catch (Exception $e) {
            print $e->getMessage();
        }

        return $testimonials;
    }
}
