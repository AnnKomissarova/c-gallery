const publishBtn = document.querySelector("#post-publish");
const formData = new FormData();

publishBtn.addEventListener('click', () => {
    fetch(`https://c-gallery.polinashneider.space/api/v1/posts/`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1OTUzMDQ0LCJpYXQiOjE2NzExMTQ2NDQsImp0aSI6IjVjYThjMzJjNjUwYTRmZDI4OWQyMjFkMGNjZDA5NDEyIiwidXNlcl9pZCI6Mjh9.OTx5qCTfJZP-Y-gTO222zbMA_BejrdIjPP9XH48nozM",
        },
    });
})

