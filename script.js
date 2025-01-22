// جلب العناصر
const addCustomerBtn = document.getElementById('addCustomerBtn');
const addCustomerModal = document.getElementById('addCustomerModal');
const closeModal = document.getElementById('closeModal');
const saveCustomerBtn = document.getElementById('saveCustomerBtn');
const customerNameInput = document.getElementById('customerNameInput');
const errorMessage = document.getElementById('errorMessage');
const customerList = document.getElementById('customerList');

// إظهار النافذة المنبثقة
addCustomerBtn.addEventListener('click', () => {
  addCustomerModal.classList.remove('hidden');
});

// إغلاق النافذة المنبثقة
closeModal.addEventListener('click', () => {
  addCustomerModal.classList.add('hidden');
  errorMessage.classList.add('hidden');
  customerNameInput.value = '';
});

// حفظ الزبون
saveCustomerBtn.addEventListener('click', () => {
  const name = customerNameInput.value.trim();
  if (name === '') {
    errorMessage.classList.remove('hidden');
    return;
  }

  // حفظ الزبون في localStorage
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  customers.push(name);
  localStorage.setItem('customers', JSON.stringify(customers));

  // تحديث القائمة
  updateCustomerList();
  addCustomerModal.classList.add('hidden');
  customerNameInput.value = '';
  errorMessage.classList.add('hidden');
});

// تحديث القائمة
function updateCustomerList() {
  customerList.innerHTML = '';
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  customers.forEach((customer, index) => {
    const div = document.createElement('div');
    div.className = 'customer';
    div.textContent = customer;

    // زر حذف
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.className = 'btn delete';
    deleteBtn.onclick = () => {
      customers.splice(index, 1);
      localStorage.setItem('customers', JSON.stringify(customers));
      updateCustomerList();
    };

    div.appendChild(deleteBtn);
    customerList.appendChild(div);
  });
}

// تحديث القائمة عند التحميل
updateCustomerList();
