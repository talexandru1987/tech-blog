const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const exploreForm = $("#explore-form");
const logoutBtn = $("#logout-btn");
const createPlaylistForm = $("#create-playlist-form");
const songsContainer = $("#songs-container");
const addToPlaylistForm = $("#add-to-playlist-form");

let addToPlayListModal;

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="mb-3 text-center text-danger error-text">
    ${message}
  </div>`);
};

const renderSongs = (songs) => {
  const songsContainer = $("#songs-container");

  songsContainer.empty();

  const songCards = songs
    .map((song) => {
      return `<div class="card song-card">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="${song.coverImageUrl}"
              class="img-fluid rounded-start"
              alt="${song.songAlbum}"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                ${song.songTitle}
              </h5>
              <h6>${song.songAlbum}</h6>
              <p class="card-text">${song.songArtists}</p>
              <p class="card-text"><small>${song.songDuration}</small></p>
              <div class="card-text d-flex flex-row justify-content-between flex-wrap align-items-center">
                <small class="text-muted"><a
                    href="${song.albumShareLink}"
                    target="_blank"
                    class="share-link"
                  ><i class="fa-brands fa-spotify me-2"></i>Open on Spotify</a></small>
                <button class="btn btn-success" name="add-to-playlist-btn" id="${song.songId}"><i class="fa-solid fa-plus me-2"></i>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join("");

  songsContainer.append(songCards);
};

const handleSignup = async (event) => {
  event.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const profileImageUrl = $("#profileImageUrl").val();

  if (email && password && confirmPassword && firstName && lastName && profileImageUrl) {
    if (password === confirmPassword) {
      try {
        const payload = {
          email,
          password,
          firstName,
          lastName,
          profileImageUrl,
        };

        const response = await fetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          window.location.assign("/login");
        } else {
          renderError("signup-error", "Failed to create account. Try again.");
        }
      } catch (error) {
        renderError("signup-error", "Failed to create account. Try again.");
      }
    } else {
      renderError("signup-error", "Passwords do not match. Try again.");
    }
  } else {
    renderError("signup-error", "Please complete all required fields.");
  }
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();

  if (email && password) {
    try {
      const payload = {
        email,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        renderError("login-error", "Failed to login. Try again.");
      }
    } catch (error) {
      renderError("login-error", "Failed to login. Try again.");
    }
  } else {
    renderError("login-error", "Please complete all required fields.");
  }
};

const handleLogout = async () => {
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.assign("/");
    }
  } catch (error) {
    console.log("Failed to logout");
  }
};

const handleExplore = async (event) => {
  event.preventDefault();

  const query = $("#query").val();

  if (query) {
    try {
      const payload = {
        query,
      };

      const response = await fetch("/api/explore", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        // store in LS
        localStorage.setItem("searchResults", JSON.stringify(data.data));
        $("#explore-error").empty();
        // render song cards
        renderSongs(data.data);
      } else {
        renderError("explore-error", "Failed to retrieve results. Try again.");
      }
    } catch (error) {
      renderError("explore-error", "Failed to retrieve results. Try again.");
    }
  } else {
    renderError("explore-error", "Please enter a query.");
  }
};

const handleCreatePlaylist = async (event) => {
  event.preventDefault();

  const title = $("#title").val();
  const imageUrl = $("#imageUrl").val();

  if (title && imageUrl) {
    try {
      const payload = {
        title,
        imageUrl,
      };

      const response = await fetch("/api/playlists", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        renderError("create-playlist-error", "Failed to create a new playlist. Please try again.");
      }
    } catch (error) {
      renderError("create-playlist-error", "Failed to create a new playlist. Please try again.");
    }
  } else {
    renderError("create-playlist-error", "Please complete all required fields.");
  }
};

const handleAddToPlaylist = (event) => {
  const target = $(event.target);

  if (target.is('button[name="add-to-playlist-btn"]')) {
    const songId = target.attr("id");

    const songsFromLS = JSON.parse(localStorage.getItem("searchResults")) || [];

    const song = songsFromLS.find((song) => {
      return song.songId === songId;
    });

    localStorage.setItem("currentSong", JSON.stringify(song));

    addToPlayListModal = new bootstrap.Modal(document.getElementById("add-to-playlist-modal"));

    addToPlayListModal.show();
  }
};

const handleAddSongToPlaylist = async (event) => {
  try {
    event.preventDefault();

    const playlistId = $("#playlist-select").val();
    const {
      albumShareLink,
      coverImageUrl,
      songAlbum,
      songArtists,
      songDuration,
      songId,
      songTitle,
    } = JSON.parse(localStorage.getItem("currentSong")) || {};

    const payload = {
      albumShareLink,
      coverImageUrl,
      songAlbum,
      songArtists,
      songDuration,
      songId,
      songTitle,
    };

    const response = await fetch(`/api/playlists/${playlistId}/songs`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      addToPlayListModal.hide();
    } else {
      renderError("add-to-playlist-error", "Failed to add song to playlist. Try again.");
    }
  } catch {
    renderError("add-to-playlist-error", "Failed to add song to playlist. Try again.");
  }
};

signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
exploreForm.submit(handleExplore);
logoutBtn.click(handleLogout);
createPlaylistForm.submit(handleCreatePlaylist);
songsContainer.click(handleAddToPlaylist);
addToPlaylistForm.submit(handleAddSongToPlaylist);
