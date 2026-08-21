(function () {
  'use strict';

  fetch('version.json?_=' + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var badge = document.getElementById('heroBadge');
      if (badge && data.version && data.label) {
        badge.textContent = data.version + ' \u2014 ' + data.label;
      }
    })
    .catch(function () { /* silently keep the fallback text already in the HTML */ });
}());
