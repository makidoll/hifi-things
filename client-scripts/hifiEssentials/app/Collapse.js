function Collapse(title, content, styles) { // returns el
	this.collapsed = true;

	this.open = ()=>{
		if (!this.collapsed) return
		this.collapsed = false;

		tdArrow.className = "active";
		content.style.display = "block";
		content.style.opacity = "0";
		setTimeout(()=>{
			content.style.opacity = "1";
		}, 100);
	}

	this.close = ()=>{
		if (this.collapsed) return
		this.collapsed = true;

		tdArrow.className = "";
		content.style.opacity = "0";
		setTimeout(()=>{
			content.style.display = "none";
		}, 200);
	}

	let collapse = document.createElement("div");
	collapse.id = "collapse";
	
	let table = document.createElement("table");
	let tr = document.createElement("tr");
	let tdArrow = document.createElement("td");
	let tdTitle = document.createElement("td");

	table.style.marginBottom = "16px";

	tdArrow.innerHTML = '<svg class="unactive-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg><svg class="active-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg> ';
	tdArrow.style.verticalAlign = "middle";

	tdTitle.innerHTML = title;
	tdTitle.style.paddingLeft = "16px";
	tdTitle.style.verticalAlign = "middle";

	tr.appendChild(tdArrow);
	tr.appendChild(tdTitle);
	table.appendChild(tr);

	// if (styles) {
	// 	Object.keys(styles).forEach(style=>{
	// 		table.style[style] = styles[style];
	// 	});
	// }
	
	table.addEventListener("click", ()=>{
		if (this.collapsed) {
			this.open();
		} else {
			this.close();
		}
	});

	content.className = "content";

	collapse.appendChild(table);
	collapse.appendChild(content);

	return collapse;
}