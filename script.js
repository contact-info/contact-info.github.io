const contacts = [
    { name: "Prince sir(Director)", phone: "9261170000" },
    { name: "Wazid sir(Director)", phone: "8432412345" },
    { name: "Abhin sir(Director)", phone: "8104133333" },
    { name: "Adeep sir(Director)", phone: "9887206446" },
    { name: "Jatin sir(Director)", phone: "7073012345" },
    { name: "Salman sir (Director)", phone: "8829837777" },
    { name: "Honey sir", phone: "9929965704" },
    { name: "Harsh sir", phone: "9079336261" },
    { name: "Saurabh sir", phone: "9950349049" },
    { name: "Gagan sir", phone: "7728043136" },
    { name: "Ankit sir", phone: "9351158803" },
    { name: "Mamta ma'am(HR)", phone: "9352755615" },
    { name: "Gurleen ma'am(HR)", phone: "6375896162" },
    { name: "Guard uncle", phone: "7597477005" },
    { name: "Rajeev Bhaiya", phone: "9993562334" },
];

const contactListElement = document.getElementById('contact-list');

function renderContacts() {
    contactListElement.innerHTML = '';
    contacts.forEach(contact => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        
        card.innerHTML = `
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-phone">${contact.phone}</div>
            </div>
            <button class="save-btn" onclick="saveContact('${contact.name}', '${contact.phone}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Save
            </button>
        `;
        
        contactListElement.appendChild(card);
    });
}

function saveContact(name, phone) {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;TYPE=CELL:${phone}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/[^a-zA-Z0-9]/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Initial render
renderContacts();




