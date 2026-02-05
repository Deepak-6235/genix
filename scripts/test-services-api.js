const fetch = require('node-fetch');

async function testApi() {
    try {
        const response = await fetch('http://localhost:3000/api/services?lang=en');
        const data = await response.json();
        console.log('API Response Status:', response.status);
        console.log('API Success:', data.success);
        if (data.success) {
            console.log('Services Count:', data.services.length);
            if (data.services.length > 0) {
                console.log('First Service Name:', data.services[0].name);
            }
        } else {
            console.log('Error Message:', data.message);
        }
    } catch (err) {
        console.error('Fetch Error:', err.message);
    }
}

testApi();
