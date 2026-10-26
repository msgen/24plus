<?php

namespace App\Repositories;
use PDO;
/*
 * Mysql database class - only one connection alowed
 */
class Database
{
    private $_connection;
    private static $_instance; //The single instance
    
    /*
    Get an instance of the Database
    @return Instance
     */
    public static function getInstance()
    {
        $host = "localhost";
        $username = "24plus";
        $password = "24plus";
        $database = "24plus";

        //$host = "localhost";
        //$username = "plusro_dbUser";
        //$password = "PiBY2dmgHx~2";
        //$database = "plusro_db";;

        if (!self::$_instance) { // If no instance then make one
            try {
				self::$_instance = new PDO("mysql:host=" . $host . ';dbname=' . $database, $username, $password);
				self::$_instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);  
				self::$_instance->query('SET NAMES utf8');
				self::$_instance->query('SET CHARACTER SET utf8');
			} catch(PDOException $error) {
				echo $error->getMessage();
			}
        }
        return self::$_instance;
    }

    // Constructor
    private function __construct(){ }

    // Magic method clone is empty to prevent duplication of connection
    private function __clone() {}

    // Get mysqli connection
    public function getConnection()
    {
        return $this->_connection;
    }
}
