const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');


async function load() {
  const res = await fetch("http://localhost:3000/")
    .then(data => data.json())
  
  res.urls.map(({name, url}) => addElement({name, url}));
  console.log(res.urls);
}

load();

async function addElement({ name, url }) {
  const li = document.createElement('li');
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () => removeElement(trash, a);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

async function removeElement(button, link) {
  if (confirm('Tem certeza que deseja remover?'))
    console.log(link.innerHTML, link.href);
    button.parentNode.remove();

  await fetch(`http://localhost:3000?name=${link.innerHTML}&url=${link.href}&del=1`).then((data) => data.json());

  // caso a url esteja na forma 'http://url.xxx/', a '/' do final deve ser removida.
  await fetch(`http://localhost:3000?name=${link.innerHTML}&url=${link.href.substring(0, link.href.length - 1)}&del=1`).then((data) => data.json());
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) 
    return alert('Preencha o campo!');

  const [name, url] = value.split(",");

  if (!url) 
    return alert('Formate o texto da maneira correta!');

  if (!/^http/.test(url)) 
    return alert("Digite a url da maneira correta!");

  addElement({ name, url });

  input.value = "";
})