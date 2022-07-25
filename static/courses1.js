async function get_pandf(){
    let response = await fetch('/courses')
    if (response.ok) {
      let json = await response.json();
      let data = json['data'];   
      const len = data.length;
      for(let i=0;i<len;i++){
        const main = document.getElementById('lgnbox')
        const lbl = document.createElement('label');
        lbl.className = 'lbl'
        lbl.innerText = `Course Name:${data[i].name}`
        main.appendChild(lbl)
        const info = document.createElement('div')
        info.className = 'infoall'
        const imgg = document.createElement('img')
        imgg.className = 'imgg'
        imgg.src = `${data[i].image}`
        const cont = document.createElement('p')
        cont.innerText = `Description: ${data[i].description}`
        cont.className = 'para'
        info.appendChild(imgg)
        info.appendChild(cont)
        main.appendChild(info)
        const btn1 = document.createElement('a');
        btn1.className = 'enroll';
        btn1.innerText = 'Details';
        btn1.id = `sh${data[i].id}`;
        const aid = btn1.id
        const aidd = aid.slice(2)
        btn1.href = '/course/'+aidd+'/'
        main.appendChild(btn1)
  }
}
      
  }



  get_pandf()