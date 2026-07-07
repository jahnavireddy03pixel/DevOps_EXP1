const API_URL = 'http://localhost:5000/api';

const form = document.getElementById('registrationForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Registering...';
  submitBtn.disabled = true;

  const modelingTypes = Array.from(document.querySelectorAll('input[name="modeling_types"]:checked')).map(i=>i.value);

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    date_of_birth: form.date_of_birth.value,
    gender: form.gender.value,
    location: form.location.value.trim(),

    height: form.height.value || null,
    height_unit: form.height_unit ? form.height_unit.value : 'cm',
    weight: form.weight.value || null,
    weight_unit: form.weight_unit ? form.weight_unit.value : 'kg',
    bust_chest: form.bust_chest.value || null,
    bust_unit: form.bust_unit ? form.bust_unit.value : 'cm',
    waist: form.waist.value || null,
    waist_unit: form.waist_unit ? form.waist_unit.value : 'cm',
    hips: form.hips.value || null,
    hips_unit: form.hips_unit ? form.hips_unit.value : 'cm',
    shoe_size: form.shoe_size.value || '',
    eye_color: form.eye_color.value || '',
    hair_color: form.hair_color.value || '',

    modeling_types: modelingTypes,

    experience_level: form.experience_level.value,
    years_experience: form.years_experience.value || 0,
    previous_brands: form.previous_brands.value.trim(),
    portfolio_url: form.portfolio_url.value.trim(),
    instagram: form.instagram.value.trim(),
    languages: form.languages.value.trim(),
    additional_notes: form.additional_notes.value.trim()
  };

  try{
    const res = await fetch(`${API_URL}/register`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data = await res.json();
    if(res.ok){
      document.getElementById('registrationId').textContent = data.registration_id || '';
      document.getElementById('successModal').classList.add('active');
      form.reset();
    } else {
      alert(data.error || 'Registration failed');
    }
  }catch(err){
    console.error(err);
    alert('Could not reach backend');
  } finally{
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

function closeModal(){document.getElementById('successModal').classList.remove('active')}
document.addEventListener('keydown',(e)=>{if(e.key==='Escape')closeModal()});
