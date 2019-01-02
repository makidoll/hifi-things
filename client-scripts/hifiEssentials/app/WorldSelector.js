function WorldSelector(parent, worlds) {
	// worlds = {image, logo, logoOffset, background, description, link}[];
	let setStyles = (el, styles)=>{
		Object.keys(styles).forEach(key=>{
			el.style[key] = styles[key];
		});
	}

	this.element = document.createElement("div");
	setStyles(this.element, {
		position: "relative",
		width: "100%", height: "100%",
		overflow: "hidden",
	});

	this.slideIndex = 0;

	let currentSlides = document.createElement("div");
	setStyles(currentSlides, {
		position: "absolute", margin: "auto",
		top: "0", right: "0", bottom: "0", left: "0",
	});
	this.element.appendChild(currentSlides);

	let generateSlides = ()=>{
		for (var i=0; i<worlds.length; i++) {
			let slide = document.createElement("div");
			setStyles(slide, {
				position: "absolute", margin: "auto",
				top: "0", right: "0", bottom: "0", left: "0",
				transform: "translate("+(i*100)+"%,0)",
				backgroundImage: "url("+worlds[i].background+")",
				backgroundSize: "cover",
				backgroundPosition: "center",
			});

			let description = document.createElement("div");
			description.className = "slide-description";
			description.innerHTML = worlds[i].description;
			setStyles(description, {
				position: "absolute", margin: "auto",
				right: "20px", bottom: "105px", left: "20px",
				transform: (i==0)? "translate(0,0)": "translate(0,calc(100% + 105px))",
				backgroundColor: "rgba(29,31,33,0.6)",
				color: "#fff",
				padding: "15px 20px",
				fontSize: "24px",
				borderRadius: "8px"
			});
			slide.appendChild(description);

			let link = document.createElement("a");
			link.className = "slide-link";
			link.href = worlds[i].link;
			//let linkHTML = '<svg style="fill:#808080;display:inline-block;width:32px;height:32px;margin-bottom:-7px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>';
			let linkHTML = '<svg style="fill:rgba(0,0,0,0.4);display:inline-block;width:32px;height:32px;margin-bottom:-7px;margin-right:4px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>';

			link.innerHTML = linkHTML+" Click here to goto <b>"+worlds[i].link+"</b>"
			setStyles(link, {
				position: "absolute", margin: "auto",
				right: "0", bottom: "0", left: "0",
				transform: (i==0)? "translate(0,0)": "translate(0,100%)",
				backgroundColor: "#fff",
				color: "#000",
				padding: "25px 0",
				paddingBottom: "30px",
				textAlign: "center",
				fontSize: "24px",
				overflow: "hidden",
			});
			slide.appendChild(link);

			let logo = document.createElement("div");
			logo.className = "slide-logo";
			worlds[i].logoOffset = (worlds[i].logoOffset)? (worlds[i].logoOffset+40)+"px":"40px";
			setStyles(logo, {
				position: "absolute", margin: "auto",
				top: worlds[i].logoOffset, left: "20px", right: "20px",
				height: (worlds[i].logoHeightOffset)? 120+worlds[i].logoHeightOffset+"px": "120px",

				transform: (i==0)? "translate(0,0)": "translate(0,calc(-100% - "+worlds[i].logoOffset+"))",

				backgroundImage: "url("+worlds[i].logo+")",
				backgroundSize: "contain",
				backgroundPosition: "center 0",
				backgroundRepeat: "no-repeat",
			});
			slide.appendChild(logo);

			currentSlides.appendChild(slide) ;
		}
	}
	generateSlides();        

	let slideIndicatorEl = document.createElement("div");
	slideIndicatorEl.className = "rainbow";
	setStyles(slideIndicatorEl, {
		position: "absolute", margin: "auto",
		bottom: "0", left: "0",
		width: 1/worlds.length*100+"%",
		height: "10px",
		zIndex: "200",

		//background: "#fff",
		backgroundImage: "url(assets/rainbow.png)",
		backgroundSize: "800% 100%",

		animationName: "rainbow",
		animationDuration: "60s",
		animationIterationCount: "infinite",
		animationTimingFunction: "linear",
	})
	this.element.appendChild(slideIndicatorEl);

	let continueSlide = (forwards)=>{
		let oldSlideIndex = this.slideIndex;
		setTimeout(()=>{
			currentSlides.children[oldSlideIndex].querySelector(".slide-logo").style.transform = "translate(0,calc(-100% - "+worlds[oldSlideIndex].logoOffset+"))";
			currentSlides.children[oldSlideIndex].querySelector(".slide-link").style.transform = "translate(0,100%)";
			currentSlides.children[oldSlideIndex].querySelector(".slide-description").style.transform = "translate(0,calc(100% + 105px))";
		}, 200);
		
		if (forwards) {
			this.slideIndex++;
			if (this.slideIndex>worlds.length-1) this.slideIndex = 0;
		} else {
			this.slideIndex--;
			if (this.slideIndex<0) this.slideIndex = worlds.length-1;
		}

		currentSlides.style.transform = "translate(-"+this.slideIndex*100+"%,0)";
		
		setTimeout(()=>{
			currentSlides.children[this.slideIndex].querySelector(".slide-logo").style.transform = "translate(0,0)";
			currentSlides.children[this.slideIndex].querySelector(".slide-link").style.transform = "translate(0,0)";
		}, 100);
		setTimeout(()=>{
			currentSlides.children[this.slideIndex].querySelector(".slide-description").style.transform = "translate(0,0)";
		}, 200);

		slideIndicatorEl.style.left = (1/worlds.length*100)*this.slideIndex+"%";
	}

	this.previousSlide = ()=>{ continueSlide(false); };
	this.nextSlide = ()=>{ continueSlide(true); };

	let previousButton = document.createElement("a");
	let nextButton = document.createElement("a");
	[previousButton, nextButton].forEach((button,i)=>{
		button.href = "javascript:"
		button.className = "slide-navigation"

		setStyles(button, {
			position: "absolute", margin: "auto",
			top: "0", bottom: "60px",
			cursor: "pointer",
			width: "24px",
			height: "24px",
			padding: "10px",
			backgroundColor: "rgba(29,31,33,0.6)",
			borderRadius: "50%"
		})

		if (i==0) {
			button.style.left="20px";
			button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="width:48px;height:48px;margin:-12px;margin-left:-13px;fill:#fff;" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
			button.addEventListener("click", ()=>{
				this.previousSlide();
				button.style.left = "10px";
				setTimeout(()=>{button.style.left = "20px";}, 200);
			});
		} else {
			button.style.right="20px";
			button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="width:48px;height:48px;margin:-12px;margin-left:-11px;fill:#fff;" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';
			button.addEventListener("click", ()=>{
				this.nextSlide();
				button.style.right = "10px";
				setTimeout(()=>{button.style.right = "20px";}, 200);
			});
		};

		this.element.appendChild(button);
	});

	parent.appendChild(this.element)
}