document.addEventListener("DOMContentLoaded", function () {
    let didOpen = false;

    const heart = document.querySelector("#solid-heart");
    const msgContainer = document.querySelector("#message-container");
    const message = document.querySelector("#message");
    const gallery = document.querySelector(".gallery");

    const md = window.markdownit({ html: true });

    // Function to load the message from message.txt
    function loadMessage() {
        fetch("message.txt")
            .then((response) => response.text())
            .then((data) => {
                message.innerHTML = md.render(data);
            })
            .catch((error) => {
                message.innerHTML = `Error loading message: <code>${error}</code>`;
            });
    }

    loadMessage();

    // Initially show the first image in the gallery, but don't animate yet
    const images = document.querySelectorAll(".gallery img");
    images.forEach((img, index) => {
        img.style.opacity = "1"; // Show all images initially
        img.style.transform = "scale(1)"; // Default transform for images
        img.style.zIndex = index === 0 ? "10" : "1"; // First image on top
    });

    // Heart click event to trigger the message container and gallery animation
    heart.addEventListener("click", function () {
        if (didOpen) return;

        didOpen = true;
        msgContainer.classList.remove("hidden");
        msgContainer.classList.add("show");

        // Optionally trigger any gallery animations or other actions here
    });

    // Function to handle gallery image cycling
    function startGalleryAnimation() {
        let index = 0;

        function cycleImages() {
            // Hide all images
            images.forEach((img) => {
                img.style.opacity = "0";
                img.style.transform = "scale(1)";
                img.style.zIndex = "1";
            });

            // Show the current image
            const currentImage = images[index];
            currentImage.style.opacity = "1";
            currentImage.style.transform = "scale(1.1)";
            currentImage.style.zIndex = "10";

            // Move to the next image
            index = (index + 1) % images.length;

            // Set a timeout for the next cycle
            setTimeout(cycleImages, 3000); // Adjust cycle speed (3 seconds)
        }

        // Start the animation immediately
        cycleImages();
    }

    // Start cycling images immediately when the page loads
    startGalleryAnimation();
});


