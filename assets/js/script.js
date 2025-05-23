'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

//Date and time Experiment
// const itemList = document.querySelectorAll("[data-testimonials-item]");
// const modalContainer = document.querySelector(".modal-container");
// const overlay = document.querySelector(".overlay");
// const modalTitle = document.querySelector("[data-modal-title]");
// const modalText = document.querySelector("[data-modal-text] p");
// const modalImg = document.querySelector("[data-modal-img]");
// const modalTime = document.querySelector("[data-modal-time]");

// itemList.forEach(item => {
//   item.addEventListener("click", () => {
//     const title = item.querySelector("[data-testimonials-title]").textContent;
//     const text = item.querySelector("[data-testimonials-text] p").textContent;
//     const imgSrc = item.querySelector("[data-testimonials-avatar]").src;
//     const date = item.getAttribute("data-testimonials-date");

//     modalTitle.textContent = title;
//     modalText.textContent = text;
//     modalImg.src = imgSrc;
//     modalTime.textContent = date;

//     modalContainer.classList.add("active");
//     overlay.classList.add("active");
//   });
// });

// document.querySelector("[data-modal-close-btn]").addEventListener("click", () => {
//   modalContainer.classList.remove("active");
//   overlay.classList.remove("active");
// });
//end of experiment

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}




// Dropdown open/close toggle
select.addEventListener("click", function () {
  this.classList.toggle("active");
});








// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Show alert and reset on submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
        formBtn.disabled = true;
      } else {
        alert("Oops! Something went wrong.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error sending message.");
    });
});






// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-filter-btn]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const projectItems = document.querySelectorAll("[data-filter-item]");
  const select = document.querySelector("[data-select]");
  const selectValue = document.querySelector("[data-selecct-value]");

  function setActiveFilter(category) {
    // Show/hide projects
    projectItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category").toLowerCase();
      if (category === "all" || category === itemCategory) {
        item.classList.add("active");
        item.style.display = "inline-block";
      } else {
        item.classList.remove("active");
        item.style.display = "none";
      }
    });
  }

  // Handle filter buttons (horizontal list)
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const selectedCategory = this.textContent.toLowerCase();
      setActiveFilter(selectedCategory);
    });
  });

  // Handle select dropdown
  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedCategory = this.textContent.toLowerCase();
      selectValue.textContent = this.textContent;
      select.classList.remove("active");

      setActiveFilter(selectedCategory);
    });
  });

  // Toggle dropdown
  select.addEventListener("click", function () {
    this.classList.toggle("active");
  });

  // Default view
  setActiveFilter("all");
});

const filterBtns = document.querySelectorAll("[data-filter-btn]");
//const filterItems = document.querySelectorAll("[data-filter-item]");

//let lastClickedBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

    const selectedCategory = this.getAttribute("data-filter-btn");

    filterItems.forEach(item => {
      const itemCategory = item.getAttribute("data-category");

      if (selectedCategory === "all" || selectedCategory === itemCategory) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});



//Resume button style for mobile version
// Fix hover stuck issue on mobile
  document.querySelectorAll('.download-btn .btn').forEach(button => {
    button.addEventListener('touchend', () => {
      button.classList.remove('btn-hover-fix'); // remove if it already exists
      void button.offsetWidth; // force reflow
      button.classList.add('btn-hover-fix'); // re-add the class
    });

    button.addEventListener('transitionend', () => {
      button.classList.remove('btn-hover-fix'); // cleanup after animation
    });
  });
