function updateForm() {
    const age = document.getElementById('age').value;
    const message = document.getElementById('message');
    const form = document.getElementById('form');
    const results = document.getElementById('results');
    
    message.style.display = 'none';
    form.style.display = 'block';
    results.innerHTML = '';

    if (age === '0-2') {
        message.style.display = 'block';
        message.innerHTML = 
            'If a child <60 days of age has a fever it is a medical emergency: ' + 
            'contact your primary care provider and/or present for evaluation by a healthcare provider.';
        form.style.display = 'none';
    }
}

function calculateDose() {
    const age = document.getElementById('age').value;
    const weightInput = parseFloat(document.getElementById('weight').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const results = document.getElementById('results');
    results.innerHTML = '';

    if (isNaN(weightInput) || weightInput <= 0) {
        results.innerHTML = '<p><strong>Please enter a valid weight.</strong></p>';
        return;
    }

    // Convert weight to kg if it's in lbs
    const weight = weightUnit === 'lbs' ? weightInput / 2.20462 : weightInput;

    if (age === '2-6') {
        const acetaminophenDoseMg = 12.5 * weight;
        const acetaminophenMl = (acetaminophenDoseMg / 160) * 5;
        results.innerHTML = `
            <p><strong>Acetaminophen [160mg/5ml]:</strong><br>
            ${acetaminophenMl.toFixed(1)} ml (${acetaminophenDoseMg.toFixed(1)} mg) every 4 hours as needed for fever/pain.</p>
        `;
    } else if (age === '6+') {
        const acetaminophenDoseMg = 15 * weight;
        const acetaminophenMl = (acetaminophenDoseMg / 160) * 5;
        const ibuprofenDoseMg = 10 * weight;
        const ibuprofenMl50 = (ibuprofenDoseMg / 50) * 1.25;
        const ibuprofenMl100 = (ibuprofenDoseMg / 100) * 5;

        results.innerHTML = `
            <p><strong>Acetaminophen [160mg/5ml]:</strong><br>
            ${acetaminophenMl.toFixed(1)} ml (${acetaminophenDoseMg.toFixed(1)} mg) every 6 hours as needed for fever/pain.</p>
            <br>
            <p><strong>Ibuprofen (Infant's) [50mg/1.25ml]:</strong><br>
            ${ibuprofenMl50.toFixed(1)} ml (${ibuprofenDoseMg.toFixed(1)} mg) every 6 hours as needed for fever/pain.</p>
            <br>
            <p><strong>Ibuprofen (Children's) [100mg/5ml]:</strong><br>
            ${ibuprofenMl100.toFixed(1)} ml (${ibuprofenDoseMg.toFixed(1)} mg) every 6 hours as needed for fever/pain.</p>
        `;
    }
}