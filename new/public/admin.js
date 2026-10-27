// Photo upload helper. Serverless hosts cap a request at ~4.5 MB, and phone photos are bigger,
// so shrink each photo in the browser (max 2000 px) and send them one request at a time.
(function () {
  function shrink(file) {
    return new Promise(function (resolve) {
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return resolve(file);
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        URL.revokeObjectURL(url);
        var max = 2000, s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        c.toBlob(function (b) { resolve(b ? new File([b], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : file); }, 'image/jpeg', 0.88);
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(file); };
      img.src = url;   // browsers apply EXIF orientation when drawing
    });
  }

  document.querySelectorAll('form[data-resize]').forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      var field = form.dataset.resize;
      var input = form.querySelector('input[name="' + field + '"]');
      if (!input || !input.files || !input.files.length) return;
      e.preventDefault();
      var progress = form.querySelector('[data-progress]');
      var btn = form.querySelector('button:not([type=button])');
      btn.disabled = true;
      var files = Array.from(input.files), ok = 0, errors = [];
      for (var i = 0; i < files.length; i++) {
        if (progress) progress.textContent = 'Se încarcă ' + (i + 1) + ' din ' + files.length + '...';
        var fd = new FormData(form);
        fd.delete(field);
        fd.append(field, await shrink(files[i]));
        try {
          var r = await fetch(form.getAttribute('action') || location.href, { method: 'POST', body: fd, credentials: 'same-origin' });
          var err = new URL(r.url).searchParams.get('err');
          if (!r.ok || err) errors.push(err || files[i].name + ': eroare ' + r.status); else ok++;
        } catch (x) { errors.push(files[i].name + ': conexiune întreruptă'); }
      }
      var back = form.dataset.back || location.pathname;
      var sep = back.indexOf('?') >= 0 ? '&' : '?';
      location.href = back + sep + (errors.length ? 'err=' + encodeURIComponent(errors.join(' ') + (ok ? ' (' + ok + ' încărcate)' : '')) : 'ok=' + encodeURIComponent(ok + ' fotografii adăugate.'));
    });
  });
})();
