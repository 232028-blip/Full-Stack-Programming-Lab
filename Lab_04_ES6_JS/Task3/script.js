const rules = {
  fname:    { el: 'fname',    err: 'fname-err',    validate: v => v.trim().length > 0 },
  lname:    { el: 'lname',    err: 'lname-err',    validate: v => v.trim().length > 0 },
  email:    { el: 'email',    err: 'email-err',    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
  phone:    { el: 'phone',    err: 'phone-err',    validate: v => /^[\d\s\+\-\(\)]{7,}$/.test(v.trim()) },
  password: { el: 'password', err: 'password-err', validate: v => v.length >= 8 },
  confirm:  { el: 'confirm',  err: 'confirm-err',  validate: v => v === document.getElementById('password').value },
  role:     { el: 'role',     err: 'role-err',     validate: v => v !== '' },
};

function setFieldState(elId, errId, isValid) {
  const el  = document.getElementById(elId);
  const err = document.getElementById(errId);
  el.classList.toggle('error', !isValid);
  el.classList.toggle('valid',  isValid);
  err.classList.toggle('show', !isValid);
}

// Blur & live validation
Object.values(rules).forEach(({ el, err, validate }) => {
  const input = document.getElementById(el);

  input.addEventListener('blur', () => {
    setFieldState(el, err, validate(input.value));
  });

  input.addEventListener('input', function () {
    if (this.classList.contains('error') || this.classList.contains('valid')) {
      setFieldState(el, err, validate(this.value));
    }
  });
});

// Terms checkbox
document.getElementById('terms').addEventListener('change', () => {
  document.getElementById('terms-err').classList.toggle(
    'show',
    !document.getElementById('terms').checked
  );
});

// Submit
document.getElementById('regForm').addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  Object.values(rules).forEach(({ el, err, validate }) => {
    const ok = validate(document.getElementById(el).value);
    setFieldState(el, err, ok);
    if (!ok) valid = false;
  });

  const termsChecked = document.getElementById('terms').checked;
  document.getElementById('terms-err').classList.toggle('show', !termsChecked);
  if (!termsChecked) valid = false;

  if (valid) {
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    document.getElementById('successName').textContent =
      `Welcome, ${fname} ${lname}! Your account is ready.`;
    document.getElementById('formView').style.display = 'none';
    document.getElementById('successView').classList.add('show');
  }
});

// Reset
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('regForm').reset();
  document.querySelectorAll('input, select').forEach(el => {
    el.classList.remove('error', 'valid');
  });
  document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));
  document.getElementById('successView').classList.remove('show');
  document.getElementById('formView').style.display = '';
});