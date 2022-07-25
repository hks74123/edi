async function get_pandf(){
    let response = await fetch('/courses')
    if (response.ok) {
      let json = await response.json();
      let data1 = json['ndata']
      let l1 = data1.length
      for(let i=0;i<l1;i++){
        const main = document.getElementById('lgnbox')
        const lbl = document.createElement('label');
        lbl.className = 'lbl'
        lbl.innerText = `Course Name:${data1[i].name}`
        main.appendChild(lbl)
        const info = document.createElement('div')
        info.className = 'infoall'
        const imgg = document.createElement('img')
        imgg.className = 'imgg'
        imgg.src = `${data1[i].image}`
        const cont = document.createElement('p')
        cont.innerText = `Description: ${data1[i].description}`
        cont.className = 'para'
        info.appendChild(imgg)
        info.appendChild(cont)
        main.appendChild(info)
        const btn = document.createElement('button');
        btn.className = 'enroll';
        btn.innerText = 'Enrolled';
        btn.id = `enroll${data1[i].id}`;
        const pid = btn.id
        const btn1 = document.createElement('a');
        btn1.className = 'enroll';
        btn1.innerText = 'Details';
        btn1.id = `sh${data1[i].id}`;
        const aid = btn1.id
        const aidd = aid.slice(2)
        btn1.href = '/course/'+aidd+'/'
        main.appendChild(btn)
        main.appendChild(btn1)
  }


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
        const btn = document.createElement('button');
        btn.className = 'enroll';
        btn.innerText = 'Enroll';
        btn.id = `enroll${data[i].id}`;
        const pid = btn.id
        btn.setAttribute('onclick',`enrolle(${pid})`)
        const btn1 = document.createElement('a');
        btn1.className = 'enroll';
        btn1.innerText = 'Details';
        btn1.id = `sh${data[i].id}`;
        const aid = btn1.id
        const aidd = aid.slice(2)
        btn1.href = '/course/'+aidd+'/'
        main.appendChild(btn)
        main.appendChild(btn1)
  }
}
      
  }

async function enrolle(id){
    const pid = id.id.slice(6)
    let response = await fetch('/enrolle/'+pid+'/')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if(message=='success'){
        document.getElementById('enroll'+id).disabled = true;
        document.getElementById('enroll'+id).innerText = 'Enrolled';
      }
}
}




  get_pandf()