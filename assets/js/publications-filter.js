(function () {
  var form = document.getElementById('publication-profile-filter');
  var toggle = document.getElementById('pf-toggle');
  var items = Array.prototype.slice.call(document.querySelectorAll('.pub'));
  var search = document.querySelector('.publications-search');
  var years = Array.prototype.slice.call(document.querySelectorAll('.pub-year'));
  var empty = document.querySelector('.publications-empty');
  var status = document.getElementById('publications-status');
  if (!form || !toggle || !items.length) return;

  var master = document.getElementById('pf-all');
  var controls = Array.prototype.slice.call(form.querySelectorAll('input[name="profile"]'));
  var applyButton = form.querySelector('button[type="submit"]');
  var error = document.getElementById('pf-error');
  var appliedStatuses = new Set(controls.map(function (control) { return control.value; }));

  function normalize(value) {
    return (value || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function synchronizeControls() {
    var checked = controls.filter(function (control) { return control.checked; });
    master.checked = checked.length === controls.length;
    master.indeterminate = checked.length > 0 && checked.length < controls.length;

    var valid = controls.some(function (control) {
      return control.checked && control.value !== 'other';
    });
    applyButton.disabled = !valid;
    error.hidden = valid;
    error.textContent = valid
      ? ''
      : 'Sélectionnez au moins une catégorie Équipe, Étudiants ou Alumni. « Autres » ne peut pas être choisi seul.';
  }

  function render(announce) {
    var query = search ? normalize(search.value).trim() : '';
    var visibleCount = 0;

    items.forEach(function (item) {
      var itemStatuses = (item.dataset.statuses || '').split(/\s+/);
      var matchesStatus = itemStatuses.some(function (value) {
        return appliedStatuses.has(value);
      });
      var matchesSearch = !query || normalize(item.dataset.search).indexOf(query) !== -1;
      item.hidden = !(matchesStatus && matchesSearch);
      if (!item.hidden) visibleCount++;
    });

    years.forEach(function (year) {
      year.hidden = !year.querySelector('.pub:not([hidden])');
    });
    if (empty) empty.hidden = visibleCount > 0;
    if (announce && status) {
      status.textContent = visibleCount + ' ' +
        (visibleCount === 1 ? 'publication affichée' : 'publications affichées') +
        ' sur ' + items.length + '.';
    }
  }

  toggle.hidden = false;
  synchronizeControls();
  render(false);

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    form.hidden = expanded;
  });

  master.addEventListener('change', function () {
    controls.forEach(function (control) { control.checked = master.checked; });
    synchronizeControls();
  });

  controls.forEach(function (control) {
    control.addEventListener('change', synchronizeControls);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    synchronizeControls();
    if (applyButton.disabled) return;

    appliedStatuses = new Set(controls.filter(function (control) {
      return control.checked;
    }).map(function (control) { return control.value; }));
    render(true);
  });

  if (search) {
    search.addEventListener('input', function () { render(true); });
  }
})();
