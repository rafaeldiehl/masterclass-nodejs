const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');


async function load() {
  const res = await fetch("http://localhost:3000/")
    .then(data => data.json())
  
  res.urls.map(({ name, url }) => addElement({ name, url }));
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
  if (confirm('Tem certeza que deseja remover?')) {
    button.parentNode.remove();
  } else {
    return;
  }
  

  await fetch(`http://localhost:3000?name=${link.innerHTML}&url=${link.href}&del=1`)
    .then(data => data.json());

  // caso a url esteja na forma 'http://url.xxx/', a '/' do final deve ser removida.
  await fetch(`http://localhost:3000?name=${link.innerHTML}&url=${link.href.substring(0, link.href.length - 1)}&del=1`)
    .then(data => data.json());
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) 
    return alert('Preencha o campo!');

  const [newName, newUrl] = value.split(", ");

  if (!newUrl) 
    return alert('Formate o texto da maneira correta, separando o nome da URL e a URL por uma vírgula e um espaço.\n\nEx: Google, https://google.com');

  if (!/^http/.test(newUrl)) 
    return alert("Digite a url da maneira correta!");

  const res = await fetch("http://localhost:3000/")
    .then(data => data.json())
  
  // verifica se já existe uma url assim
  let exists = false;
    
  res.urls.map(({ url }) => {
    if(newUrl == url) exists = true;
  });

  if(exists) {
    alert("Ei, você já informou essa URL");
  } else {
    const name = newName;
    const url = newUrl;
    addElement({ name, url });

    await fetch(`http://localhost:3000?name=${name}&url=${url}`)
      .then(data => data.json());
  }

  input.value = "";
})