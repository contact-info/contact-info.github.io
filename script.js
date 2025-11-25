const contacts = [
    { name: "John Doe", phone: "+15550101" },
    { name: "Jane Smith", phone: "+15550102" },
    { name: "Alice Johnson", phone: "+15550103" },
    { name: "Bob Williams", phone: "+15550104" },
    { name: "Charlie Brown", phone: "+15550105" }
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

// NEW: Save All Contacts at once
function saveAllContacts() {
    if (contacts.length === 0) {
        alert("No contacts to save!");
        return;
    }

    // Optional: Add a small delay between downloads to ensure mobile browsers handle them well
    contacts.forEach((contact, index) => {
        setTimeout(() => {
            saveContact(contact.name, contact.phone);
        }, index * 300); // 300ms delay between each download
    });

    // Optional nice feedback
    const btn = document.getElementById('save-all-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Saving...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, contacts.length * 300 + 500);
}

// Initial render
renderContacts();

// Attach Save All button event
document.getElementById('save-all-btn').addEventListener('click', saveAllContacts);