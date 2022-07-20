const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");
const addPost = $("#add-post-form");

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
  console.log(username);
  console.log(password);

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

  const id = parseInt($("#add-post-btn").attr("data-id"));
  const title = $("#title-input").val().trim();
  const postText = $("#text-input").val().trim();

  const postContent = { title, postText, id };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(postContent),
  };
};

// add the event listeners
signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
logoutBtn.click(handleLogout);
addPost.click(handleAddPost);
