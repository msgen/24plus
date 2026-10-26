<?php

namespace App\Controllers;

use Slim\Views\Twig as View;

class AuthController extends BaseController
{
    // Session timeout in seconds (30 minutes)
    const SESSION_TIMEOUT = 1800;

    public function getSignIn($request, $response)
    {
        // Generate CSRF token
        if (session_status() === PHP_SESSION_NONE) {
            session_start(['cookie_secure' => true, 'cookie_httponly' => true]);
        }
        
        // In a real implementation, we would generate a random token and store it in the session
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        
        return $this->container->view->render($response, 'auth.html', [
            'csrf_token' => $_SESSION['csrf_token']
        ]);
    }

    public function postSignIn($request, $response)
    {
        $email = filter_var($request->getParam('email'), FILTER_SANITIZE_EMAIL);
        $password = $request->getParam('password');
        
        // Check for CSRF token
        if (!$this->validateCsrfToken($request)) {
            $this->container->flash->addMessage('error', 'Invalid form submission.');
            return $response->withRedirect('/signin');
        }

        // Rate limiting - check for too many failed attempts
        if ($this->isIpBlocked($_SERVER['REMOTE_ADDR'])) {
            $this->container->flash->addMessage('error', 'Too many failed login attempts. Please try again later.');
            return $response->withRedirect('/signin');
        }

        if(!$this->isAuthenticated($email, $password)){
            // Record failed attempt
            $this->recordFailedLoginAttempt($_SERVER['REMOTE_ADDR']);
            
            // Don't reveal if the user exists or not
            $this->container->flash->addMessage('error', 'Invalid email or password.');
            return $this->container->view->render($response, 'auth.html');
        }
        
        // Reset failed attempts on successful login
        $this->resetFailedLoginAttempts($_SERVER['REMOTE_ADDR']);
        
        return $response->withRedirect('/');
    }

    public function logout($request, $response){
        // Start session if not already started
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        // Check for CSRF token on POST requests
        if ($request->isPost() && !$this->validateCsrfToken($request)) {
            return $response->withStatus(403)->withJson(['error' => 'Invalid CSRF token']);
        }
        
        // Unset all session variables
        $_SESSION = [];
        
        // If it's desired to kill the session, also delete the session cookie
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        
        // Finally, destroy the session
        session_destroy();
        
        return $response->withRedirect('/');
    }

    private function isAuthenticated($email, $password){
        $userRepository = new \App\Repositories\UserRepository;
        $user = $userRepository->getUserByEmail($email);

        if(!$user){
            return false;
        }

        if($this->isPasswordVerified($password, $user->password)){
            // Start session if not already started
            if (session_status() === PHP_SESSION_NONE) {
                session_start(['cookie_secure' => true, 'cookie_httponly' => true]);
            }
            
            // Regenerate session ID to prevent session fixation
            session_regenerate_id(true);
            
            $_SESSION['user'] = $user->id;
            $_SESSION['last_activity'] = time(); // For session timeout
            return true;
        }

        return false;
    }

    /**
     * Validate CSRF token from request
     */
    private function validateCsrfToken($request)
    {
        $token = $request->getParam('csrf_token');
        
        // Check if session is started
        if (session_status() !== PHP_SESSION_ACTIVE) {
            return false;
        }
        
        // Check if token exists in session and request
        if (empty($token) || empty($_SESSION['csrf_token'])) {
            return false;
        }
        
        // Compare tokens using hash_equals to prevent timing attacks
        return hash_equals($_SESSION['csrf_token'], $token);
    }
    
    /**
     * Check if IP has too many failed login attempts
     */
    private function isIpBlocked($ip)
    {
        // Store failed login attempts in session for simplicity
        // In production, use a database or cache instead
        if (session_status() !== PHP_SESSION_ACTIVE) {
            return false;
        }
        
        if (!isset($_SESSION['failed_logins'])) {
            $_SESSION['failed_logins'] = [];
        }
        
        // Remove attempts older than 15 minutes
        $cutoff = time() - 900; // 15 minutes
        foreach ($_SESSION['failed_logins'] as $attempt_ip => $attempts) {
            $_SESSION['failed_logins'][$attempt_ip] = array_filter(
                $attempts,
                function($timestamp) use ($cutoff) {
                    return $timestamp >= $cutoff;
                }
            );
            
            // Remove empty entries
            if (empty($_SESSION['failed_logins'][$attempt_ip])) {
                unset($_SESSION['failed_logins'][$attempt_ip]);
            }
        }
        
        // Check if IP has 5 or more recent failed attempts
        return isset($_SESSION['failed_logins'][$ip]) && 
               count($_SESSION['failed_logins'][$ip]) >= 5;
    }
    
    /**
     * Record a failed login attempt
     */
    private function recordFailedLoginAttempt($ip)
    {
        // Store failed login attempts in session for simplicity
        // In production, use a database or cache instead
        if (session_status() !== PHP_SESSION_ACTIVE) {
            return;
        }
        
        if (!isset($_SESSION['failed_logins'])) {
            $_SESSION['failed_logins'] = [];
        }
        
        if (!isset($_SESSION['failed_logins'][$ip])) {
            $_SESSION['failed_logins'][$ip] = [];
        }
        
        // Add current timestamp
        $_SESSION['failed_logins'][$ip][] = time();
    }
    
    /**
     * Reset failed login attempts counter
     */
    private function resetFailedLoginAttempts($ip)
    {
        // Clear failed login attempts in session
        // In production, use a database or cache instead
        if (session_status() !== PHP_SESSION_ACTIVE) {
            return;
        }
        
        if (isset($_SESSION['failed_logins']) && isset($_SESSION['failed_logins'][$ip])) {
            unset($_SESSION['failed_logins'][$ip]);
        }
    }
    
    /**
     * Update user's password hash to a stronger algorithm
     * 
     * This method should be called when a user successfully logs in with an old hash
     * to gradually migrate users to the new hashing algorithm
     */
    private function updatePasswordHash($userId, $password)
    {
        // Generate a new password hash using a strong algorithm
        $newHash = password_hash($password, PASSWORD_DEFAULT);
        
        // Update the user's password in the database
        $userRepository = new \App\Repositories\UserRepository;
        $userRepository->updateUserPassword($userId, $newHash);
    }

    /**
     * Verify if the provided password matches the stored hash
     * 
     * @param string $actual The user-provided password
     * @param string $expected The stored password hash
     * @return bool True if the password is verified, false otherwise
     */
    private function isPasswordVerified($actual, $expected)
    {
        // Check if the hash was created with an older algorithm (SHA-1)
        if (strlen($expected) === 40) { // SHA-1 produces a 40-character hex string
            // Verify using old method
            $verified = hash_equals($expected, sha1($actual . "+salt+24plus"));
            
            // If verified and user is logged in, update their password hash
            if ($verified && isset($_SESSION['user'])) {
                $this->updatePasswordHash($_SESSION['user'], $actual);
            }
            
            return $verified;
        }
        
        // Otherwise use modern password_verify function
        return password_verify($actual, $expected);
    }
    
    /**
     * Check if the session has timed out
     * This should be called at the beginning of any authenticated route
     * 
     * @return bool True if the session is valid, false if it has timed out
     */
    private function checkSessionTimeout()
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            return false;
        }
        
        if (!isset($_SESSION['last_activity'])) {
            return false;
        }
        
        $inactive = time() - $_SESSION['last_activity'];
        
        if ($inactive >= self::SESSION_TIMEOUT) {
            // Session has expired
            $this->logout(null, null);
            return false;
        }
        
        // Update last activity time
        $_SESSION['last_activity'] = time();
        return true;
    }

    /**
     * Add HTTPS enforcement to this method or via server configuration
     */
    private function enforceHttps()
    {
        if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
            $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            header('HTTP/1.1 301 Moved Permanently');
            header('Location: ' . $redirect);
            exit();
        }
    }
}
