(() => {
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
})();
