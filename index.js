const blogsContainer = document.getElementById("blogsContainer");

let blogs = [];
let start = 0,
  end = 8;

function createBlogCard(title, content) {
  const ele = `<div class="card m-3" style="width: 18rem">
    <img
      src="https://miro.medium.com/max/1838/1*jfdwtvU6V6g99q3G7gq7dQ.png"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">
        ${content}
      </p>
    </div>
  </div>`;

  return ele;
}

function fetchBlogs() {
  const xhr = new XMLHttpRequest();

  const api = `https://jsonplaceholder.typicode.com/posts?utm_source=Mailerlite&utm_medium=E-mail&utm_campaign=Test%20Series&utm_term=2022-08-09`;

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const res = JSON.parse(xhr.responseText);
      blogs = res;

      console.log(blogs);

      blogsContainer.innerHTML = null;

      for (let i = 0; i < 8; i++) {
        blogsContainer.innerHTML += createBlogCard(
          blogs[i].title,
          blogs[i].body
        );
      }

      createPagination();
    }
  };

  xhr.open("GET", api);
  xhr.send();
}

fetchBlogs();

function createPagination() {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = null;
  let pageNo = 1;
  for (let i = 0; i < blogs.length; i += 8) {
    paginationContainer.innerHTML += `<li class="page-item">
        <a class="page-link" style="cursor: pointer" onClick="changePage(${pageNo})">${pageNo}</a>
      </li>`;
    pageNo++;
  }
}

function changePage(pageNo) {
  blogsContainer.innerHTML = null;

  for (let i = 8 * (pageNo - 1); i < Math.min(8 * pageNo, blogs.length); i++) {
    blogsContainer.innerHTML += createBlogCard(blogs[i].title, blogs[i].body);
  }
}

function makePost() {
  
  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;

  if (title == "" || body == "") return;

  blogs = [
    {
      title: title,
      body: body,
    },
    ...blogs,
  ];

  changePage(1);
  document.getElementById("postTitle").value = "";
  document.getElementById("postBody").value = "";

  blogsContainer.scrollIntoView({ behavior: "smooth" });
}
