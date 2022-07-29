const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");
const addPost = $("#add-post-form");
const changePost = $("#post-container");
const updatePost = $("#update-post-form");
const updateComment = $("#update-comment-btn");

const handleSignup = async (event) => {
  event.preventDefault();

  const username = $("#userName").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  if (username && password && confirmPassword) {
    if (password === confirmPassword) {
      try {
        const payload = {
          username,
          password,
          confirmPassword,
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

  const username = $("#username").val();
  const password = $("#password").val();

  if (username && password) {
    try {
      const payload = {
        username,
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

const handleAddPost = async (event) => {
  event.preventDefault();

  const userId = parseInt($("#add-post-btn").attr("data-id"));
  const title = $("#title-input").val().trim();
  const description = $("#text-input").val().trim();

  const postContent = { title, description, userId };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(postContent),
  };

  const response = await fetch("/api/posts", options);

  if (response.status !== 200) {
    console.error("Post creation failed");
    $("#post-container").remove();
    $("#add-post-container")
      .append(`<div class="alert alert-danger d-flex flex-column align-items-center" id = "post-container">
    <h4 class="alert-heading text-center"><i class="fa-solid fa-close"></i> Sorry, your new post could not be created!</h4></div>`);
  } else {
    $("#post-container").remove();
    $("#add-post-container")
      .append(`<div class="alert alert-secondary d-flex flex-column align-items-center" id = "post-container">
    <h4 class="alert-heading text-center"><i class="fa-solid fa-check"></i> Your new post has been created successfully!</h4></div>`);
  }
};

const handlePostChange = async (event) => {
  event.preventDefault();
  let response;

  if (event.target.id === "edit-btn") {
    const id = event.target.getAttribute("data-postId");
    window.location.replace(`/update/${id}`);
  } else if (event.target.id === "delete-btn") {
    const confirmed = confirm(
      "Are you sur you want to delete this comment? This cannot be undone."
    );

    if (confirmed) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      };
      const id = event.target.getAttribute("data-postId");
      response = await fetch(`/api/posts/${id}`, options);

      if (response.status !== 200) {
        console.error("Delete failed");
      } else {
        location.reload();
        console.error("Delete Success");
      }
    }
  } else if (event.target.id === "add-comment-btn") {
    const postId = parseInt(event.target.getAttribute("data-id"));
    const commentText = $(`#add-comment-input-${postId}`).val().trim();
    const postContent = { commentText, postId };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(postContent),
    };

    const response = await fetch("/api/comments", options);

    if (response.status !== 200) {
      console.error("Post creation failed");
    } else {
      location.reload();
    }
  } else if (event.target.id === "edit-comment-btn") {
    const id = event.target.getAttribute("data-commentId");
    window.location.replace(`/comment/${id}`);
  }
};

const handlePostUpdate = async (event) => {
  event.preventDefault();

  const postId = parseInt($("#update-post-btn").attr("data-id"));
  const title = $("#title-input").val().trim();
  const description = $("#text-input").val().trim();

  const postContent = { title, description, postId };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(postContent),
  };

  const response = await fetch("/api/posts", options);

  if (response.status !== 200) {
    location.reload();
    console.error("Post creation failed");
    $("#post-container").remove();
    $("#add-post-container")
      .append(`<div class="alert alert-danger d-flex flex-column align-items-center" id = "post-container">
    <h4 class="alert-heading text-center"><i class="fa-solid fa-close"></i> Sorry, your post could not be updated!</h4></div>`);
  } else {
    $("#post-container").remove();
    $("#add-post-container")
      .append(`<div class="alert alert-secondary d-flex flex-column align-items-center" id = "post-container">
    <h4 class="alert-heading text-center"><i class="fa-solid fa-check"></i> Your post has been updated successfully!</h4></div>`);
  }
};

const handleCommentUpdate = async (event) => {
  event.preventDefault();
  const commentText = $("#update-comment-input").val().trim();
  const commentId = parseInt(event.target.getAttribute("data-id"));

  const postContent = { commentText, commentId };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(postContent),
  };

  const response = await fetch("/api/comments", options);

  if (response.status !== 200) {
    console.error("Comment update failed");
  } else {
    window.location.assign("/");
  }
};

// add the event listeners
signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
logoutBtn.click(handleLogout);
addPost.submit(handleAddPost);
changePost.click(handlePostChange);
updatePost.click(handlePostUpdate);
updateComment.click(handleCommentUpdate);
