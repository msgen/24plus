<?php
namespace App\Repositories;

use PDO;

class UserRepository extends Repository
{
    public function getUserByEmail($email)
    {
        $user = false;

        try {
            $sql = 'SELECT id, password FROM user WHERE email = :email';
            $stmt = $this->db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
            $stmt->execute([':email' => $email]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if(!$row){
                return false;
            }
            $stmt = null;
            $user = new \App\Dtos\User($row['id'], $email, $row['password']);
        } catch (Exception $e) {
            print $e->getMessage();          
        }

        return $user;
    }

    /**
     * Update user's password in the database
     * 
     * @param int $userId The ID of the user
     * @param string $newPasswordHash The new password hash
     * @return bool True on success, false on failure
     */
    public function updateUserPassword($userId, $newPasswordHash)
    {
        try {
            $sql = 'UPDATE user SET password = :password WHERE id = :id';
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([
                ':id' => $userId,
                ':password' => $newPasswordHash
            ]);
        } catch (Exception $e) {
            // Log error in production instead of printing
            error_log($e->getMessage());
            return false;
        }
    }
}
