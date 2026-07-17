// captura de e-mail do formulário .t-nl-form → edge function `subscribe` (Supabase).
// a function grava em `leads` com o admin client; a tabela em si não aceita insert direto via REST.
// a publishable key é pública por design (é assim que o Supabase espera ser usada no client).
(function () {
  var FUNCTION_URL = 'https://hnchzfgtkkkkrljasnca.supabase.co/functions/v1/subscribe';
  var SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_qExaBu1lvouXlXG7AJOgsQ_NU5NEWZ8';

  document.querySelectorAll('.t-nl-form').forEach(function (form) {
    var input = form.querySelector('.t-nl-input');
    var btn = form.querySelector('.t-nl-btn');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!email || !input.checkValidity()) {
        input.focus();
        return;
      }

      btn.disabled = true;
      btn.textContent = 'enviando…';

      fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY
        },
        body: JSON.stringify({ email: email })
      })
        .then(function (res) {
          if (res.ok) {
            input.value = '';
            btn.textContent = 'inscrito ✓';
          } else {
            btn.textContent = 'erro, tenta de novo';
            btn.disabled = false;
          }
        })
        .catch(function () {
          btn.textContent = 'erro, tenta de novo';
          btn.disabled = false;
        });
    });
  });
})();
