(async () => {
	preventDefaultForm("newsletter-form");
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
