const searchAlbumForm = document.querySelector("#searchAlbumForm");
const albumContainer = document.querySelector(".album-container");

const BASE_URL = "https://jsonplaceholder.typicode.com";

searchAlbumForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchInput = event.target.elements["albumId"];

  const albumData = await getAlbumDataById(searchInput.value);

  if (!albumData) {
    return;
  }

  renderAlbumData(albumData);
});

async function getAlbumDataById(albumId) {
  try {
    const response = await fetch(`${BASE_URL}/albums/${albumId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch album data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

// Очищаем предыдущий результат перед отображением нового
function renderAlbumData(album) {
  albumContainer.innerHTML = "";

  const albumTitle = document.createElement("h3");
  const albumUserId = document.createElement("h4");
  const albumId = document.createElement("p");

  albumTitle.textContent = "Title: " + album.title;
  albumUserId.textContent = "User ID: " + album.userId;
  albumId.textContent = "ID: " + album.id;

  albumContainer.append(albumTitle, albumUserId, albumId);
}
