const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const productContainer = document.getElementById("productContainer");

hamburger.addEventListener("click", function () {
  if (
    sidebar.style.transform === "translateX(0px)" ||
    sidebar.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  } else {
    sidebar.classList.add("open");
    overlay.classList.add("open");
  }
});

overlay.addEventListener("click", function () {
  sidebar.classList.remove("open");
  overlay.classList.remove("open");
});

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response) {
      throw new Error(
        "There was an issue with the Data response expected from the BE",
      );
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    data.forEach((d) => {
      const card = document.createElement("div");
      card.classList.add("cardNew");

      const h1 = document.createElement("h1");
      const img = document.createElement("img");
      const price = document.createElement("p");
      const description = document.createElement("p");
      const rating = document.createElement("p");

      h1.textContent = d.title;
      h1.classList.add("cardH1");
      img.classList.add("cardImg");
      img.src = d.image;
      img.alt = d.title;

      price.textContent = "$" + d.price;
      price.classList.add("price");

      description.textContent = d.description;
      description.classList.add("description");

      rating.textContent =
        "Rating: " + d.rating.rate + " (" + d.rating.count + " reviews)";
      rating.classList.add("rating");

      card.append(img);
      card.append(h1);
      card.append(price);
      card.append(description);
      card.append(rating);
      productContainer.append(card);
    });
  })
  .catch((error) => console.log(error));
