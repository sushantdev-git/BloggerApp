const blogsContainer = document.getElementById("blogsContainer");

function fetchBlogs() {
  const xhr = new XMLHttpRequest();

  const api = `https://jsonplaceholder.typicode.com/posts?utm_source=Mailerlite&utm_medium=E-mail&utm_campaign=Test%20Series&utm_term=2022-08-09`;

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const res = JSON.parse(xhr.responseText);
      console.log(res);
    }
  };

  xhr.open("GET", api);
  xhr.send();
}

fetchBlogs();
    