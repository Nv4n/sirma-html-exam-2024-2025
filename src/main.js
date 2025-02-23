(async () => {
	preventDefaultForm("newsletter-form");
	configBurgerMenu();
	await fetchLogo();
})();

async function fetchLogo() {
	fetch("/images/Sirma-Academy-Logo.svg")
		.then((resp) => resp.text())
		.then((svg) => {
			const logos = document.querySelectorAll(".logo");
			for (const logo of logos) {
				logo.innerHTML = svg;
			}
		})
		.catch((e) => {
			console.error(`Couldn't load logo svg: ${e}`);
		});
}

function preventDefaultForm(formId) {
	const form = document.getElementById(formId);
	const inputs = form.querySelectorAll("input");
	if (!form) {
		console.error(`Form with id ${formId} doesn't exist`);
		return;
	}
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const formData = new FormData(form);
		console.log(`You submitted: ${[...formData.entries()]}`);
		for (const input of inputs) {
			input.value = "";
		}
	});
}

function configBurgerMenu() {
	const burgerMenu = document.getElementById("burger-menu");
	const burgerIcon = document.getElementById("burger-menu-icon");

	let burgetTrigger = false;
	burgerIcon.addEventListener("click", (e) => {
		burgetTrigger = !burgetTrigger;
		if (burgetTrigger) {
			burgerIcon.classList.add("active");
			burgerMenu.classList.add("burger-menu-visible");
		} else {
			burgerIcon.classList.remove("active");
			burgerMenu.classList.remove("burger-menu-visible");
		}
	});

	const untrigger = debounce(() => {
		if (window.innerWidth > 1200) {
			burgetTrigger = false;
			burgerIcon.classList.remove("active");
			burgerMenu.classList.remove("burger-menu-visible");
		}
	}, 500);
	window.addEventListener("resize", (e) => {
		untrigger();
	});
}

function debounce(func, delay) {
	let timeoutId;
	return function () {
		clearTimeout(timeoutId);
		setTimeout(func, delay);
	};
}
