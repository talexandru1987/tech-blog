const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");
const addPost = $("#add-post-form");
const changePost = $("#post-container");

const handleSignup = async (event) => {
  event.preventDefault();

  const username = $("#userName").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();
  console.log(username);
  console.log(password);
  console.log(confirmPassword);

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
  console.log("logout");
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
        console.error("Delete Success");
      }
    }
  }
};

// add the event listeners
signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
logoutBtn.click(handleLogout);
addPost.submit(handleAddPost);
changePost.click(handlePostChange);
