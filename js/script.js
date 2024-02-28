const loadPhone = async (searchValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await res.json();
    const phoneData = data.data;
    displayPhone(phoneData);
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // console.log(phones.length);

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 6) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }
    // display only fist six phone 
    phones = phones.slice(0, 6);
    phones.forEach(phone => {

        const phoneCard = document.createElement('div');
        phoneCard.classList = `rounded-lg bg-slate-400 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="flex justify-center pt-10">
                    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button onclick="showDetails('${phone.slug}'); show_details.showModal()" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });
    // hide toggle spinner
    toggleSpinner(false);
}

// show details
const showDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phonesData = data.data
    showPhoneDetails(phonesData)
}

// show  single phone details
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneStorage = phone.mainFeatures.storage;
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <div class="w-full flex justify-center"><img src="${phone.image}" alt=""></div>
    <p><span class="font-bold">Storage:</span> ${phoneStorage}</p>
    <p><span class="font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="font-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="font-bold">Memory:</span> ${phone.mainFeatures?.memory}</p>
    <p><span class="font-bold">Slug:</span> ${phone.slug}</p>
    <p><span class="font-bold">Release Date:</span> ${phone.releaseDate}</p>
    <p><span class="font-bold">Brand:</span> ${phone.brand}</p>
    <p><span class="font-bold">GPS:</span> ${phone.others?.GPS || 'No GPS available'}</p>

    `;

}

const searchBtn = () => {
    toggleSpinner(true)
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    // console.log(searchText);
    loadPhone(searchText)
    // searchInput.value = '';
}

const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    searchBtn()
}

// loadPhone()