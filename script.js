function openTab(event, tabName) {

    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tabcontent');
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
        tabContent.style.display = 'none';
    });

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tablinks');
    tabButtons.forEach(tabButton => {
        tabButton.classList.remove('active');
    });

    // Show the active tab content
    const activeTabContent = document.getElementById(tabName);
    if (activeTabContent) {
        activeTabContent.classList.add('active');
        activeTabContent.style.display = 'block';
    }

    // Add active class to the clicked tab button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function toggleFrame(show, id) {
    // Get the element to toggle
    const element = document.getElementById(id);
    
    // If the element is already visible, hide it (collapse it)
    if (element.style.display === 'block') {
        element.style.display = 'none';
    } else {
        // Hide both sections initially
        document.getElementById('portraitf').style.display = 'none';
        document.getElementById('landscapef').style.display = 'none';
        
        // Show the selected section
        element.style.display = 'block';
    }
}


function showOutlinesTab() {
    document.getElementById('outlinesTab').style.display = 'flex';
}

function hideOutlinesTab() {
    document.getElementById('outlinesTab').style.display = 'none';
}
function setActiveButton(buttonId) {
    // Remove the active class from both buttons
    document.getElementById('yesButton').classList.remove('active');
    document.getElementById('noButton').classList.remove('active');
    
    // Add the active class to the clicked button
    document.getElementById(buttonId).classList.add('active');
}


function setbuttontabsactive(tabElement) {
    // Remove the active class from all tab buttons
    var tabs = document.getElementsByClassName('tab-btn1');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active-tab');
    }

    // Add the active class to the clicked tab
    tabElement.classList.add('active-tab');
}

function setButtonActive(buttonElement) {
    // Remove the active class from all buttons in the container
    var buttons = document.querySelectorAll('.sizef button');
    buttons.forEach(function(btn) {
        btn.classList.remove('active-button');
    });

    // Add the active class to the clicked button
    buttonElement.classList.add('active-button');
}

function toggleFrame(show, id) {
    // Get the element by ID
    var element = document.getElementById(id);

    // Toggle the display state
    if (element.style.display === 'block') {
        // If the section is already visible, collapse it
        element.style.display = 'none';
    } else {
        // If the section is hidden, show it
        // First, hide both sections initially
        document.getElementById('portraitf').style.display = 'none';
        document.getElementById('landscapef').style.display = 'none';
        
        // Show the selected section
        element.style.display = 'block';
    }
}

function setButtonActivesizes(buttonElement) {
    // Remove the active class from all buttons in the container
    var buttons = document.querySelectorAll('.sizef button');
    buttons.forEach(function(btn) {
        btn.classList.remove('active-button');
    });

    // Add the active class to the clicked button
    buttonElement.classList.add('active-button');
}

function toggleFrame(show, id, buttonElement) {
    // Get the element by ID
    var element = document.getElementById(id);

    // Toggle the display state
    if (element.style.display === 'block') {
        // If the section is already visible, collapse it
        element.style.display = 'none';
        buttonElement.classList.remove('active-button'); // Remove active state when collapsing
    } else {
        // If the section is hidden, show it
        // First, hide both sections initially
        document.getElementById('portraitf').style.display = 'none';
        document.getElementById('landscapef').style.display = 'none';
        
        // Remove the active class from all buttons in the container
        var buttons = document.querySelectorAll('.sizef button');
        buttons.forEach(function(btn) {
            btn.classList.remove('active-button');
        });

        // Show the selected section and set the button as active
        element.style.display = 'block';
        buttonElement.classList.add('active-button');
    }
}



function applySize(width, height, targets = ['frameContainer', 'framePreview']) {
    const frameContainer = document.getElementById('frameContainer');
    const framePreview = document.getElementById('framePreview');
    const addToCartBtn = document.getElementById('addToCartBtn');


    // Check if the image is present in framePreview
    if (!framePreview || !framePreview.src) {
        console.warn('No image uploaded in framePreview.');
        return;
    }

    // Check if the image is present in frameContainer
    if (!frameContainer) {
        console.warn('frameContainer does not exist.');
        return;
    }

    // Calculate the aspect ratio
    const aspectRatio = width / height;

    // Determine the new dimensions without shrinking, only crop if necessary
    let newWidth = width;
    let newHeight = height;

    const maxWidth = frameContainer.parentElement.clientWidth;
    const maxHeight = frameContainer.parentElement.clientHeight;

    // If the target size exceeds the max dimensions, set the size to the max without altering the aspect ratio
    if (width > maxWidth || height > maxHeight) {
        if (width > maxWidth) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
        }
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
        }
    }

    // Apply the size and set overflow to hidden for cropping
    targets.forEach(target => {
        const element = document.getElementById(target);
        if (element) {
            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`;
            element.style.overflow = 'hidden'; // Ensure the excess part of the image is hidden

            // Ensure the image remains centered if it is framePreview
            if (target === 'framePreview') {
                const image = framePreview;
                if (image) {
                    image.style.objectFit = 'cover';
                    image.style.width = `${width}px`;
                    image.style.height = `${height}px`;
                    image.style.position = 'relative';

                    // Center the image
                    const leftOffset = (newWidth - width) / 2;
                    const topOffset = (newHeight - height) / 2;
                    image.style.left = `${Math.max(0, leftOffset)}px`;
                    image.style.top = `${Math.max(0, topOffset)}px`;
                } else {
                    console.warn('No image found inside framePreview.');
                }
            }
        } else {
            console.warn(`Element with id ${target} does not exist.`);
        }
    });

    // Enable the "Add to Cart" button
    if (addToCartBtn) {
        addToCartBtn.disabled = false;
    } else {
        console.warn('Add to Cart button not found.');
    }
}





// const zoomElement = document.getElementById("framePreview");
// const frameContainer = document.getElementById("frameContainer");
// let zoom = 1;
// const ZOOM_SPEED = 0.1;

// frameContainer.addEventListener("wheel", function (e) {
//     e.preventDefault();

//     if (e.deltaY < 0 && zoom > 1) {
//         zoom -= ZOOM_SPEED;
//     } else if (e.deltaY > 0) {
//         zoom += ZOOM_SPEED;
//     }

//     zoom = Math.min(Math.max(1, zoom), 3);

//     zoomElement.style.transform = `scale(${zoom})`;
// });


// Track the current zoom level and rotation angle
let currentZoom = 1;
const ZOOM_SPEED = 0.1;

//function to apply Zoom o n image
function applyZoomOnImage() {
    const framePreview = document.getElementById('framePreview');
    const frameContainer = document.getElementById('frameContainer');
    
    function handleWheelEvent(e) {
        e.preventDefault(); // Prevent default scroll behavior

        // Adjust zoom level based on scroll direction
        if (e.deltaY > 0) {
            currentZoom += ZOOM_SPEED; // Zoom in
        } else {
            currentZoom -= ZOOM_SPEED; // Zoom out
        }

        // Limit the zoom level
        currentZoom = Math.min(Math.max(1, currentZoom), 3);

        // Apply the current zoom and rotation to framePreview only
        framePreview.style.transform = `rotate(${currentRotation}deg) scale(${currentZoom})`;
    }

    // Attach the wheel event listener to framePreview and frameContainer
    framePreview.addEventListener("wheel", handleWheelEvent);
    frameContainer.addEventListener("wheel", handleWheelEvent);
}

// Initialize zoom functionality
applyZoomOnImage();




function applyCustomSize() {
    const customWidth = document.getElementById('customWidth').value;
    const customHeight = document.getElementById('customHeight').value;

    const uploadedImage = document.getElementById('framePreview');
    if (!uploadedImage || !uploadedImage.src) {
        showAlertPopup("Please upload an image first.");
        return;
    }

    if (customWidth && customHeight) {
        let targetWidth = parseInt(customWidth);
        let targetHeight = parseInt(customHeight);

        applySize(targetWidth, targetHeight, ['frameContainer', 'framePreview']);
    }
}


function openCustomSizeInput() {
    document.getElementById('customSizeInput').style.display = 'inline-block';
}



function generateRandomSizes(originalWidth, originalHeight) {
    const sizes = [];

    for (let i = 0; i < 4; i++) {
        const randomWidth = getNextSize(originalWidth, i);
        const randomHeight = getNextSize(originalHeight, i);
        const price = calculatePrice(randomWidth, randomHeight);
        sizes.push({ width: randomWidth, height: randomHeight, price: price });
    }

    return sizes;
}

function getNextSize(originalSize, incrementFactor) {
    // Assuming an increment factor that increases size
    const increment = 14; // Change this as per your requirement
    return originalSize + (increment * incrementFactor);
}

function calculatePrice(width, height) {
    // Implement your price calculation logic here
    // This is just a placeholder
    return width * height;
}


function calculatePrice(width, height) {
    return Math.max(width, height) * 10;
}

function populateSizeButtons(sizes) {
    const sizeButtons = document.getElementsByClassName('size1');
    for (let i = 0; i < sizeButtons.length; i++) {
        const button = sizeButtons[i].querySelector('button');
        const size = sizes[i];
        const sizeText = `${size.width}" x ${size.height}"`;
        const price = `€${size.price.toFixed(2)}`;
        button.setAttribute('onclick', `applySize(${size.width}, ${size.height})`);
        button.querySelector('p').innerHTML = `${sizeText}<br />${price}`;
    }
}

document.getElementById('frameContainer').addEventListener('click', function () {
    openPopup();
});

function openPopup() {
    document.getElementById('imagePopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
}

// document.getElementById('popupUploadBtn2').addEventListener('click', function() {
//     document.getElementById('popupFileInput').click();
// });

// document.getElementById('popupFileInput').addEventListener('change', function(event) {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = function(e) {
//       const framePreview = document.getElementById('framePreview');
//       framePreview.src = e.target.result;

//       framePreview.onload = function() {
//           const naturalWidth = framePreview.naturalWidth;
//           const naturalHeight = framePreview.naturalHeight;
//           applySize(naturalWidth, naturalHeight);
//           fixedSizes = generateRandomSizes(naturalWidth, naturalHeight); // Store the fixed sizes
//           populateSizeButtons(fixedSizes); // Populate size buttons with fixed sizes
//       };

//       document.getElementById('selectImage').style.display = 'none';

//       closePopup();
//   };

//   if (file) {
//       reader.readAsDataURL(file);
//   }
// });

// Function to handle image upload
// document.getElementById('imageUpload').addEventListener('change', function(event) {
//     const framePreview = document.getElementById('framePreview');
//     const selectImage = document.getElementById('selectImage');

//     // Check if a file was selected
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();

//       reader.onload = function(e) {
//         // Set the uploaded image as the source of framePreview
//         framePreview.src = e.target.result;
//         // Display the image
//         framePreview.style.display = 'block';
//         // Hide the select image container
//         selectImage.style.display = 'none';

//         // Apply the border (you can change 'black-slim' to any other frame type)
//         applyFrame('black-slim');
//       };

//       reader.readAsDataURL(event.target.files[0]);
//     }
//   });

// Apply frame and border styles
function applyFrame(frameType) {
    const framePreview = document.getElementById('framePreview');
    const frameOptions = document.querySelectorAll('.frame-option');
    const borderOptions = document.getElementById('borderOptions');

    frameOptions.forEach(option => {
        option.classList.remove('active-frame');
    });

    switch (frameType) {
        case 'black-slim':
            applyBorder('solid', 'black', '2px'); // Slim black border
            document.querySelector('[onclick="applyFrame(\'black-slim\')"]').classList.add('active-frame');
            borderOptions.classList.remove('active');
            break;
        case 'white-slim':
            applyBorder('solid', 'black', '4px'); // Slim white border
            document.querySelector('[onclick="applyFrame(\'white-slim\')"]').classList.add('active-frame');
            borderOptions.classList.remove('active');
            break;
        case 'espresso-slim':
            applyBorder('solid', 'black', '5px'); // Slim espresso border
            document.querySelector('[onclick="applyFrame(\'espresso-slim\')"]').classList.add('active-frame');
            borderOptions.classList.remove('active');
            break;
        case 'none':
            applyBorder('none');
            document.querySelector('[onclick="applyFrame(\'none\')"]').classList.add('active-frame');
            borderOptions.classList.add('active');
            break;
    }
}

function applyBorder(borderStyle, borderColor, borderWidth) {
    const framePreview = document.getElementById('framePreview');
    if (framePreview) {
        framePreview.style.borderStyle = borderStyle;
        framePreview.style.borderColor = borderColor;
        framePreview.style.borderWidth = borderWidth;
        framePreview.style.boxSizing = 'border-box'; // Ensure the border is inside the element's box
    }
}



// Function to apply filter
function applyFilter(color) {
    const frameContainer = document.getElementById('frameContainer');
    const uploadedImage = document.getElementById('framePreview');

    // Check if an image is uploaded
    if (uploadedImage && uploadedImage.src) {
        // Define the filter styles for each color
        const filters = {
            black: "blur(5px)",
            red: "brightness(1.5)",
            blue: "contrast(2)",
            green: "grayscale(100%)",
            yellow: "sepia(100%)",
            purple: "hue-rotate(270deg)",
            orange: "saturate(3)",
            pink: "invert(75%)",
            cyan: "opacity(0.5)",
            brown: "sepia(0.8) saturate(0.6) contrast(1.5)",
            none: "none"
        };
        document.querySelectorAll('.filter-c1').forEach(filterElement => {
            const filterColor = filterElement.querySelector('.filter-img').dataset.color;
            if (filterColor === filter) {
                filterElement.classList.add('active');
            } else {
                filterElement.classList.remove('active');
            }
        });

        // Apply the filter to the frame container and uploaded image
        const filterStyle = filters[color] || 'none';
        frameContainer.style.filter = filterStyle;
        uploadedImage.style.filter = filterStyle;
    } else {
        console.log("No image uploaded to apply filter.");
    }
}





// Function to check image quality and return dimensions, megapixels, and size
function checkImageQuality(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            const width = img.width;
            const height = img.height;

            // Calculate megapixels (1 megapixel = 1 million pixels)
            const megapixels = (width * height) / 1000000;

            // Calculate file size in megabytes
            const fileSizeInBytes = file.size;
            const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

            if (megapixels < 1) {
                reject(`Image is of low quality with ${megapixels.toFixed(2)} megapixels (${width}x${height} pixels). Please upload an image with at least 1 megapixel.`);
            } else {
                console.log(`Image Dimensions: ${width}x${height} pixels`);
                console.log(`Megapixels: ${megapixels.toFixed(2)} MP`);
                console.log(`Size in megabytes: ${fileSizeInMegabytes.toFixed(2)} MB`);

                // Update the text in the #megapixelcheck element
                const megapixelCheckElement = document.getElementById('megpixelcheck');
                megapixelCheckElement.textContent = `The uploaded image has dimensions of ${width}x${height} pixels, corresponding to ${megapixels.toFixed(2)} megapixels and a size of ${fileSizeInMegabytes.toFixed(2)} MB.`;

                resolve({
                    width: width,
                    height: height,
                    megapixels: megapixels.toFixed(2), // Round to two decimal places
                    fileSizeInMegabytes: fileSizeInMegabytes.toFixed(2) // Round to two decimal places
                });
            }
        };
        img.onerror = function () {
            reject("Error loading the image.");
        };
        img.src = URL.createObjectURL(file);
    });
}

// Function to trigger the file input dialog
function triggerFileInput() {
    document.getElementById('popupFileInput').click();
}

// Handle file input change event
document.getElementById('popupFileInput').addEventListener('change', function (event) {
    const files = event.target.files;
    if (files.length > 0) {
        handleImageUploads(files);
        document.getElementById('imagePopup').style.display = 'none'; // Hide the popup after upload
    }
});

// Function to handle image uploads
function handleImageUploads(files) {
    const sessionId = localStorage.getItem('sessionId');
    let uploadedImages = JSON.parse(localStorage.getItem(sessionId) || '[]'); // Retrieve existing images

    // Convert files to an array and process each file
    Array.from(files).forEach(file => {
        // Check image quality before proceeding
        checkImageQuality(file).then(() => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64String = e.target.result;
                const image = { name: file.name, src: base64String };
                uploadedImages.push(image);

                // Save updated images array in local storage
                localStorage.setItem(sessionId, JSON.stringify(uploadedImages));
                displayUploadedImages(); // Update displayed images
            };
            reader.readAsDataURL(file);
        }).catch(error => {
            // Handle errors related to image quality
            alert(error); // Display the error message to the user
        });
    });
}


function displayUploadedImages() {
    const sessionId = localStorage.getItem('sessionId');
    const uploadedImages = JSON.parse(localStorage.getItem(sessionId) || '[]');
    const uploadedImagesContainer = document.getElementById('uploadedImages');
    uploadedImagesContainer.innerHTML = ''; // Clear previous images

    uploadedImages.forEach((image) => {
        const imageElement = document.createElement('img');
        imageElement.src = image.src;
        imageElement.alt = image.name;
        imageElement.style.width = '100px';
        imageElement.style.height = '100px';
        imageElement.style.objectFit = 'cover';
        imageElement.style.margin = '5px';
        imageElement.style.cursor = 'pointer';

        // Create a container for image and cancel button
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        imageContainer.style.position = 'relative';
        imageContainer.style.width = '100px';
        imageContainer.style.height = '100px';
        imageContainer.style.overflow = 'hidden';

        // Add click event listener to image container
        imageContainer.addEventListener('click', () => {
            showImageInFramePreview(image.src); // Function to show the image in framePreview
        });

        // Add a cancel button to remove the image
        const cancelButton = document.createElement('div');
        cancelButton.className = 'popup-cancel-button';
        cancelButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cancel-icon">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
        cancelButton.style.position = 'absolute';
        cancelButton.style.top = '0px';
        cancelButton.style.right = '0px';
        cancelButton.style.cursor = 'pointer';

        cancelButton.onclick = (e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up
            // Remove the image from the array
            const updatedImages = uploadedImages.filter((img) => img.name !== image.name);
            localStorage.setItem(sessionId, JSON.stringify(updatedImages));
            displayUploadedImages(); // Update displayed images
        };

        // Append image and cancel button to the container
        imageContainer.appendChild(imageElement);
        imageContainer.appendChild(cancelButton);

        // Append the container to the uploaded images container
        uploadedImagesContainer.appendChild(imageContainer);
    });
}

// Function to show the selected image in framePreview
function showImageInFramePreview(imageSrc) {
    const framePreview = document.getElementById('framePreview');
    const frameContainer = document.getElementById('frameContainer');
    const contentArea1 = document.getElementById('contentArea1');
    const contentAreaWidth = Math.min(contentArea1.offsetWidth, 700); 
    const contentAreaHeight = Math.min(contentArea1.offsetHeight, 500);
    const editButtonContainer = document.querySelector('.button-for-edit');
    
    

    // Load the image to get its original dimensions
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
        let width = img.width;
        let height = img.height;
        // Scale the image to fit within the constraints of contentArea1 and the max dimensions without cropping
        if (width > contentAreaWidth || height > contentAreaHeight) {
            const widthRatio = contentAreaWidth / width;
            const heightRatio = contentAreaHeight / height;
            const scaleRatio = Math.min(widthRatio, heightRatio);
            width *= scaleRatio;
            height *= scaleRatio;
        }
        // Ensure the width and height do not exceed the maximum allowed dimensions
        width = Math.min(width, 700);
        height = Math.min(height, 400);
        // Set the framePreview and frameContainer dimensions to the scaled size or original if no scaling was needed
        framePreview.style.width = `${width}px`;
        framePreview.style.height = `${height}px`;
        framePreview.src = imageSrc;
        frameContainer.style.width = `${width}px`;
        frameContainer.style.height = `${height}px`;
        // Display the image and hide the select image prompt
        framePreview.style.display = 'block';
        document.getElementById('selectImage').style.display = 'none';
        document.getElementById('imagePopup').style.display = 'none';

         // Show the "Edit Or Replace Image" button after image upload
         editButtonContainer.classList.remove('hidden');
         editButtonContainer.style.display = 'block';
    };
}



// Function to close the image popup
function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
    document.getElementById('megpixelcheck').textContent = "";
}

// Function to generate a random session ID
function generateSessionId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Generate a session ID if not already set in local storage
let sessionId = localStorage.getItem('sessionId');
if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('sessionId', sessionId);
}

// Get the input element and initialize
const fileInput = document.getElementById('myFileInput');
fileInput.addEventListener('change', (e) => {
    handleImageUploads(e.target.files);
});

// Function to show the image popup
function showImagePopup() {
    document.getElementById('imagePopup').style.display = 'block';
}

// Check if there are any uploaded images for the current session in local storage and display them
document.addEventListener('DOMContentLoaded', () => {
    displayUploadedImages();
});



document.addEventListener('DOMContentLoaded', function () {
    var editButton = document.querySelector('.button-for-edit button');
    var sidebar = document.querySelector('.sidebar');
    var containerMain = document.querySelector('.container-main');
    var editButtons = document.querySelector('.edit-buttons');
    var applyBtnMain = document.querySelector('.apply-btn-main');

    // Hide/show elements based on button click
    editButton.addEventListener('click', function () {
        // Hide sidebar and container-main
        sidebar.classList.add('hidden');
        containerMain.classList.add('hidden');

        // Hide the button-for-edit itself
        editButton.closest('.button-for-edit').style.display = 'none';

        // Show edit-buttons and apply-btn-main
        editButtons.classList.remove('hidden');
        editButtons.style.display = 'block'; // Ensure visibility is updated

        applyBtnMain.classList.remove('hidden');
        applyBtnMain.style.display = 'block'; // Ensure visibility is updated
    });

    applyBtnMain.addEventListener('click', function () {
        // Show sidebar and container-main
        sidebar.classList.remove('hidden');
        containerMain.classList.remove('hidden');

        // Hide edit-buttons and apply-btn-main
        editButtons.classList.add('hidden');
        editButtons.style.display = 'none'; // Ensure visibility is updated

        applyBtnMain.classList.add('hidden');
        applyBtnMain.style.display = 'none'; // Ensure visibility is updated

        // Show the button-for-edit again
        editButton.closest('.button-for-edit').style.display = 'block';
    });
});



// Track the current rotation angle
let currentRotation = 0;

// Function to rotate the image inside framePreview
function rotateImage() {
    const framePreview = document.getElementById('framePreview');

    // Increment the rotation angle by 90 degrees
    currentRotation = (currentRotation + 90); // Ensures rotation angle stays within 0-360 degrees

    // Apply the rotation to the image
    framePreview.style.transform = `rotate(${currentRotation}deg)`;
    framePreview.style.transition = 'transform 0.5s ease'; // Optional: smooth transition effect
}

// Attach the rotateImage function to the Rotate Image button
document.querySelector('.Rotate-Image button').addEventListener('click', rotateImage);



// Function to flip the orientation of the image inside framePreview
function flipOrientation() {
    const framePreview = document.getElementById('framePreview');
    const frameContainer = document.getElementById('frameContainer');

    // Get the current dimensions
    const currentWidth = framePreview.clientWidth;
    const currentHeight = framePreview.clientHeight;

    // Swap the width and height to flip orientation
    framePreview.style.width = `${currentHeight}px`;
    framePreview.style.height = `${currentWidth}px`;

    frameContainer.style.width = `${currentHeight}px`;
    frameContainer.style.height = `${currentWidth}px`;

    // Optionally, center the image in its new container
    framePreview.style.objectFit = 'cover';
    framePreview.style.position = 'relative';
}

// Attach the flipOrientation function to the Flip Orientation button
document.querySelector('.flip-btn button').addEventListener('click', flipOrientation);


