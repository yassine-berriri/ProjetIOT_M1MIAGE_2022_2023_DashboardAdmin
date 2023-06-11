document.getElementById('login-btn').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');
    
    if (username === 'admin' && password === 'admin') {
      errorMessage.textContent = '';
      // Connexion réussie, vous pouvez rediriger vers une autre page ou effectuer d'autres actions ici
      alert('Connexion réussie !');
      window.location.href = '../dashboard/dashboard.html';
    } else {
      errorMessage.textContent = 'Identifiant ou mot de passe incorrect.';
    }
  });
  