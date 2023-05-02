const head = require("./head")

class pageController {
  constructor(title, list, hostname, url) {
    this.title = title
    this.list = list
    this.hostname = hostname
    this.url = url
  }

  buildingPart =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.6 483.2 483.9 512 448.5 512H326.4L288 448L368.8 380.7C376.6 374.1 376.5 362.1 368.5 355.8L250.6 263.2C235.1 251.7 216.8 270.1 227.8 285.2L288 368L202.5 439.2C196.5 444.3 194.1 452.1 199.1 459.8L230.4 512H128.1C92.75 512 64.09 483.3 64.09 448V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L416 100.7V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z" fill="currentColor" /></svg>'
  mastTransformer =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M381.2 172.8C377.1 164.9 368.9 160 360 160h-156.6l50.84-127.1c2.969-7.375 2.062-15.78-2.406-22.38S239.1 0 232 0h-176C43.97 0 33.81 8.906 32.22 20.84l-32 240C-.7179 267.7 1.376 274.6 5.938 279.8C10.5 285 17.09 288 24 288h146.3l-41.78 194.1c-2.406 11.22 3.469 22.56 14 27.09C145.6 511.4 148.8 512 152 512c7.719 0 15.22-3.75 19.81-10.44l208-304C384.8 190.2 385.4 180.7 381.2 172.8z" fill="currentColor" /></svg>'
  measurements =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z" fill="currentColor"/></svg>'

  getIcon(type) {
    if (type == "mastTransformer") return this.mastTransformer
    if (type == "buildingPart") return this.buildingPart
    if (type == "measurements") return this.measurements
    return "not"
  }

  getScript() {
    return `
      <script>

function debounce(f, ms) {
  let isCooldown = false;
  return function() {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments); // (1)
    isThrottled = true;
    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}

      let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        const myFetch = async (url, data = [], method = "POST") => {
          try {
            let response = await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify(data),
            })
            if (response != undefined) {
              let result = await response.json()
              return result
            } else {
              return alert("Ошибка подключения к _серверу!")
            }
          } catch (error) {
            console.log("error", error)
            alert("Ошибка подключения к серверу!")
          }
        }

        const func = async (event) => {
          if(event.target.id == 'btn' || event.target.className == 'input_text'){

            let data = {
              id: id.value,
              date: date.value,
              fio: fio.value,
              address: address.value,
              tprp: tprp.value
            }
              let res = await myFetch("/filterInspects", data)
              if (res?.status == 1) {
                while (table.rows.length > 2) {
                  table.deleteRow(2);
                }
                table.rows[1].insertAdjacentHTML("afterEnd", res.body.html)
              } else {
                alert("ошибка подключения к серверу!")
              }

          }
        }

        let f700 = throttle(func, 700);
        let f1000 = throttle(func, 1000);

        function events(){
          btn.addEventListener('click', f1000, false)
          document.addEventListener('input', f700, false)
        }
        events()

        // ******************delete osmotr******************
        const funcDel = async (event) => {
          
          if (event.target.dataset.del != undefined ) { 
            event.preventDefault();

            let btn = event.target
            let data =  {
              id: btn.id
            }
            console.log(data)
            let msg = "Вы точно хотите удалить осмотр №" + data.id + " " + btn.dataset.address + "?"
            let modalRes = confirm(msg)
            if (modalRes) {
              console.log('ok')
              let res = await myFetch("/deleteInspect", data)
              console.log('res', res)
              if (res?.status == 1) {
                  document.location.reload();
                } else {
                  alert(res.msg)
                }
            }
            }

          }

      document.addEventListener('click', funcDel, false)


      </script>
    `
  }

  formFilter() {
    return `<tr>
          <th>№</th>
          <th>Дата</th>
          <th>ФИО</th>
          <th>Адрес</th>
          <th>ТП(РП)</th>
          <th>Тип</th>
          <th>Файл</th>
          <th></th>
        </tr>
        <tr>
          <td><input id="id" class="input_text" type="text" value=""></td>
          <td><input id="date" class="input_text" type="text" value=""></td>
          <td><input id="fio" class="input_text" type="text" value=""></td>
          <td><input id="address" class="input_text" type="text" value=""></td>
          <td><input id="tprp" class="input_text" type="text" value=""></td>
          <td colspan="3"><button id='btn' class="btn" >применить</button></td>
        </tr>`
  }

  trList() {
    return `${
      this.list.length > 0
        ? this.list
            .map(
              (item) => `<tr>
            <td>${item.id}</td>
            <td>${item.date}</td>
            <td>${item.fio}</td>
            <td>${item.address}</td>
            <td>${item.tprp}</td>
            <td>
              <div class="flex jcc">
                <span style="width: 30%;">${
                  item.type == "measurements" ? "БЗ " : "ЛО "
                } </span>
                <div class="wr_ico flex jcc" style="width: 70%; color: #4e5f68">
                  ${this.getIcon(item.type)}
                  ${item.measur ? " + " + this.measurements : ""}
                </div>
              </div>
            </td>
            <td><a href="http://${this.hostname}/list/${
                item.id
              }" target="_blank">file</a> <span style="font-size: 12px;">v:${
                item.v
              }</span></td>
            <td><button id="${
              item.id
            }" class="btn btn_del" data-del data-address="${
                item.address
              }" title="удалить">х</button></td>
        </tr>`
            )
            .join("")
        : '<tr><td colspan="7" style="padding: 5px;">ничего не найдено</td></tr>'
    }`
  }

  get listInspects() {
    let html = head(this.title)

    html += '<table id="table" class="table">'
    html += this.formFilter()
    html += this.trList()
    html += "</table>"

    html += this.getScript()
    html += "</div></body></html>"
    return html
  }

  get filterInspects() {
    return this.trList()
  }

  // ///////////////////////////////////////
  trUser() {
    return `${
      this.list.length > 0
        ? this.list
            .map(
              (item) => `
              <form id="form_${item.id}" class="user flex jscb aic">
                <div class="xl_10">${item.id}</div>
                <div class="xl_20"><input name="fio" type="text" class="input_text" value="${
                  item.fio
                }"></div>
                <div class="xl_20">
                  <select class="select" name="post">
                    <option value="1" ${
                      item.post == 1 && "selected"
                    }>мастер</option>
                    <option value="2" ${
                      item.post == 2 && "selected"
                    }>электромонтер</option>
                    <option value="3" ${
                      item.post == 3 && "selected"
                    }>инженер ПТО</option>
                    <option value="4" ${
                      item.post == 4 && "selected"
                    }>начальник ПТО</option>
                    <option value="5" ${
                      item.post == 5 && "selected"
                    }>ОБиУЭЭ</option>
                    <option value="6" ${
                      item.post == 6 && "selected"
                    }>ОТП</option>
                  </select>
                </div>
                <div class="xl_20"><input  name="groupDop" type="text" class="input_text gd" value="${
                  item.groupDop
                }"></div>
                <div class="xl_15">
                  <select class="select" name="status">
                    <option value="0" ${
                      item.status == 0 && "selected"
                    }>0</option>
                    <option value="1" ${
                      item.status == 1 && "selected"
                    }>1</option>
                  </select>
                </div>
                <div class="xl_15">
                  <button id="${
                    item.id
                  }" class="btn btn_save" data-save>Сохранить</button>
                </div>
              </form>`
            )
            .join("")
        : "<div class='xl_100 tac'>пользователей нет</div>"
    }`
  }

  userScript() {
    return `
      <script>
        const myFetch = async (url, data = [], method = "POST") => {
          try {
            let response = await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify(data),
            })
            if (response != undefined) {
              let result = await response.json()
              return result
            } else {
              return alert("Ошибка подключения к _серверу!")
            }
          } catch (error) {
            console.log("error", error)
            alert("Ошибка подключения к серверу!")
          }
        }

      const func = async (event) => {
        event.preventDefault();

          if (event.target.dataset.save != undefined || event.target.dataset.add != undefined) { 

            let btn = event.target
            let data =  {
              id: btn.id,
              fio: document.querySelector('#form_'+btn.id+' [name="fio"]').value,
              post: document.querySelector('#form_'+btn.id+' [name="post"]').value,
              groupDop: document.querySelector('#form_'+btn.id+' [name="groupDop"]').value,
              status: document.querySelector('#form_'+btn.id+' [name="status"]').value
            }
            let msg = btn.id == 0 
              ? "Добавить пользователя: " + data.fio + " ?"
              : "Вы точно хотите сохранить изменения у " + data.fio
            let modalRes = confirm(msg)
            if (modalRes) {
              let url = btn.id == 0 ? "/addUser" : "/updateUser"
              let res = await myFetch(url, data)
              console.log('res', res)
              if (res?.status == 1) {
                  document.location.reload();
                } else {
                  alert(res.msg)
                }
            }

          }
      }

      document.addEventListener('click', func, false)

      </script>
    `
  }

  get users() {
    let html = head(this.title)

    html += `<div class="" style="color: red;font-size: 12px;">
      <p>* Нельзя менять ФИО одного пользователя на другого! Иначе будет путаница в участниках прошлых осмотров</p>
      <p>* Если нужен новый - добавляем его</p>
      <p>* Если нужно убрать(удалить) из списка в приложении - меняем статус на 0</p>
    </div>`

    html += `<div id="wr_users">
              <div class="user flex jscb aic">
                <div class="xl_10">id</div>
                <div class="xl_20">ФИО</div>
                <div class="xl_20">Должность</div>
                <div class="xl_20">Гр. доп.</div>
                <div class="xl_15">Статус</div>
                <div class="xl_15"></div>
              </div>`
    html += this.trUser()
    html += `
              <form id="form_0" class="user flex jscb aic">
                <div class="xl_10"></div>
                <div class="xl_20"><input name="fio" type="text" class="input_text" value=""></div>
                <div class="xl_20">
                  <select class="select" name="post">
                    <option value="1">мастер</option>
                    <option value="2">электромонтер</option>
                    <option value="3">инженер ПТО</option>
                    <option value="4">начальник ПТО</option>
                    <option value="5">ОБиУЭЭ</option>
                    <option value="6">ОТП</option>
                  </select>
                </div>
                <div class="xl_20"><input  name="groupDop" type="text" class="input_text gd" value=""></div>
                <div class="xl_15">
                  <select class="select" name="status">
                    <option value="0" >0</option>
                    <option value="1" >1</option>
                  </select>
                </div>
                <div class="xl_15">
                  <button id="0" class="btn btn_add" data-add>Добавить</button>
                </div>
              </form>`
    html += "</div>"

    html += this.userScript()
    html += "</div></body></html>"

    // html += this.getScript()
    return html
  }
  // //////////////////////////////////////

  header(dd, type) {
    let html = `
    <header class="flex jcsb aifs">
      <div>
        <p>
        ${
          type == "measurements"
            ? dd.headers[0] + "<span>" + dd.date + "</span>"
            : "Лист осмотра № <span class='bb'>" +
              this.list.id +
              "</span> от <span>" +
              dd.date +
              "</span>"
        }
        </p>
        <p>${dd.fields[0].label} <span class="bb">${
      dd.fields[0].input
    }</span></p>
        <p>${dd.fields[1].label} <span class="bb">${
      dd.fields[1].input
    }</span></p>
        <p>Напряжение: 
          ${dd.fields[2].label} <span class="bb">${dd.fields[2].input}</span>
          <br>
          ${dd.fields[3].label} <span class="bb">${dd.fields[3].input}</span>
        </p>
        <p>${dd.fields[4].label} <span class="bb">${
      dd.fields[4].input
    }</span></p>
      </div>

      <div class="tar">
        <p>Согласовано: </p>
        <p>Директор "Terra Nova"</p>
        <p style="margin-top: 18px; white-space: nowrap;"><span class="dib bb bbe mw_100">1</span> Иванов И.И.</p>
      </div>

    </header>
    `
    return html
  }

  getPost(number) {
    if (number == 1) return "мастер"
    if (number == 2) return "электромонтер"
    if (number == 3) return "инженер ПТО"
    if (number == 4) return "начальник ПТО"
    if (number == 5) return "ОБиУЭЭ"
    if (number == 6) return "ОТП"
    return ""
  }

  delegation(users) {
    let html = `
      <section class="delegation">
        <p>${users.text}</p>
        ${users.other
          .map(
            (item) => `
            <div class="flex jcsb aifs mt_10">
              <span class="xl_20 bb_text" data-text="Ф.И.О.">${item.fio}</span>
              <span class="xl_20 bb_text bbe" data-text="подпись">.</span>
              <span class="xl_20 bb_text" data-text="должность">${this.getPost(
                item.post
              )}</span>
              <span class="xl_20 bb_text" data-text="группа допуска">
                ${item.groupDop}
              </span>
            </div>
        `
          )
          .join("")}
        <p>Ответственный: </p>
        <div class="flex jcsb aifs">
          <span class="xl_20 bb_text" data-text="Ф.И.О.">
            ${users.master.fio}
          </span>
          <span class="xl_20 bb_text bbe" data-text="подпись">.</span>
          <span class="xl_20 bb_text" data-text="должность">
            ${this.getPost(users.master.post)}
          </span>
          <span class="xl_20 bb_text" data-text="группа допуска">
            ${users.master.groupDop}
          </span>
        </div>
      </section>
    `
    return html
  }

  blankMeasur(bm) {
    let html = `
            <table class="table_measur">
            <tr>
                <th style="padding: 5px 7px;">№</th>
                <th>Описание точки в которой производились замеры</th>
                <th class="xl_35" style="padding: 5px 0 0 0;">
                    <div>Показания измерений по напряжени, V</div>
                    <table class="xl_100" style="margin-top: 10px;">
                        <tr style="border-top: 1px solid currentColor;">
                            <td class="xl_50" style="padding: 1px;">U<span style="font-size: 12px;">линейное</span></td>
                            <td class="xl_50" style="padding: 1px;">U<span style="font-size: 12px;">фазное</span></td>
                        </tr>
                    </table>
                </th>
                <th>Показания измерений по силе тока, A</th>
            </tr>
            ${bm.inputs
              .map(
                (input, index) => `
              <tr class="tac">
                <td style="padding: 0 7px;">${index + 1}</td>
                <td style="padding: 0 5px;">${input[0]}</td>
                <td style="padding: 0;">
                    <table class="table_measur_tbl">
                        <tr>
                            <td class="xl_15 wsnw">A-B</td>
                            <td class="xl_35">${input[1]}</td>
                            <td class="xl_15 wsnw">A-N</td>
                            <td class="xl_35">${input[4]}</td>
                        </tr>
                        <tr>
                            <td class="xl_15 wsnw">B-C</td>
                            <td class="xl_35">${input[2]}</td>
                            <td class="xl_15 wsnw">B-N</td>
                            <td class="xl_35">${input[5]}</td>
                        </tr>
                        <tr>
                            <td class="xl_15 wsnw">C-A</td>
                            <td class="xl_35">${input[3]}</td>
                            <td class="xl_15 wsnw">C-N</td>
                            <td class="xl_35">${input[6]}</td>
                        </tr>
                    </table>
                </td>
                <td style="padding: 0;">
                    <table class="table_measur_tbl">
                        <tr>
                            <td class="xl_30 wsnw">Фаза A</td>
                            <td class="xl_70">${input[7]}</td>
                        </tr>
                        <tr>
                            <td class="xl_30 wsnw">Фаза B</td>
                            <td class="xl_70">${input[8]}</td>
                        </tr>
                        <tr>
                            <td class="xl_30 wsnw">Фаза C</td>
                            <td class="xl_70">${input[9]}</td>
                        </tr>
                    </table>
                </td>
            </tr>
              `
              )
              .join("")}
            <tr>
                <td class="tac">${bm.inputs.length + 1}</td>
                <td>
                    <div>Положение анцапфы (переключателя) силового трансформатора.</div>
                    <div>При визуальной доступности!</div>
                </td>
                <td colspan="2" class="tac">${bm.lastInput}</td>
            </tr>
        </table>
    `
    return html
  }

  listCheckboxText(answer) {
    let result = answer.text
    answer.checkbox.forEach((item) => {
      if (item.check == true) {
        result = result.replace(
          new RegExp(item.text, "g"),
          `<span class="span_check">${item.text}</span>`
        )
      }
    })
    return result
  }

  typeAnswer(answer) {
    if (answer.type == "text") {
      return `<div>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label>${answer.text}</label>
      </div>`
    }

    if (answer.type == "input") {
      return `<div>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label><span class="bb mw_100">${answer.input}</span></label>
      </div>`
    }

    if (answer.type == "textInput") {
      return `<div>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label>${answer.text} <span class="bb">${answer.input}</span></label>
      </div>`
    }

    if (answer.type == "radio") {
      return `<div>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label>${
          answer.check == true
            ? answer.text.replace(
                new RegExp(answer.radio.list[answer.radio.value], "g"),
                `<span class="span_check">${
                  answer.radio.list[answer.radio.value]
                }</span>`
              )
            : answer.text
        }</label>
      </div>`
    }

    if (answer.type == "radioInput") {
      return `<div>
            <input type="checkbox" disabled class="checkbox" ${
              answer.check == true ? "checked" : ""
            }>
            <label>${
              answer.check == true
                ? answer.text.replace(
                    new RegExp(answer.radio.list[answer.radio.value], "g"),
                    `<span class="span_check">${
                      answer.radio.list[answer.radio.value]
                    }</span>`
                  )
                : answer.text
            } <span class="bb">${answer.input}</span></label>
                  </div>`
    }

    if (answer.type == "checkbox") {
      return `<div>
      <input type="checkbox" disabled class="checkbox" ${
        answer.check == true ? "checked" : ""
      }>
        <label>${
          answer.check == true ? this.listCheckboxText(answer) : answer.text
        }</label>
      </div>`
    }

    if (answer.type == "listTextInput") {
      return `
      <div style='margin-bottom: 12px;'>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label>${answer.text}</label>
      </div>
      ${answer.list
        .map(
          (item) =>
            `<label class="label_input">${item.text} <span class="bb mw_100">${item.input}</span></label>`
        )
        .join("")}
      `
    }

    return ""
  }

  getHeadTbl(headers, id) {
    let head = headers.filter((item) => item.index[0] == id)
    let html = ""
    if (head.length != 0) {
      html = `
        <tr>
          <th class="xl_10"></th>
          <th class="xl_50">${head[0].title}</th>
          <th class="xl_40"></th>
        </tr>
      `
    }
    return html
  }

  quests(quests) {
    // console.log("dl", quests)
    let html = `
    <table class="table_quests">
      <tr>
          <th class="tac xl_10">№</th>
          <th class="xl_50">${quests.name}</th>
          <th class="xl_40 tac">Результат осмотра</th>
      </tr>
      ${quests.questions
        .map(
          (quest) => `
          ${this.getHeadTbl(quests.headers, quest.id)}
        <tr>
          <td class="tac xl_10">${quest.id}</td>
          <td class="xl_50">${quest.quest}</td>
          <td class="xl_40">
              ${quest.opt.map((item) => this.typeAnswer(item)).join("")}
            </td>
        </tr>
      `
        )
        .join("")}

    </table>
    `
    return html
  }

  get inspection() {
    console.log("host", this.hostname)
    // console.log("master", this.list)
    let DL = JSON.parse(this.list.DL)
    let title = `${this.list.type == "measurements" ? "БЗ № " : "ЛО № "} ${
      this.list.id
    } от ${this.list.date} ${this.list.address}`
    let html = head(title)
    html += this.header(DL.delegation, this.list.type)

    if (this.list.type == "measurements") {
      html += this.blankMeasur(DL.measurements)
    } else {
      html += this.quests(DL.quests)
      if (this.list.measur === 1) {
        html += '<div id="blank_zamerov">'
        html += this.blankMeasur(DL.measurements)
        html += "</div>"
      }
    }

    html += this.delegation(DL.delegation.users)
    html += "</div></body></html>"
    return html
  }
}

module.exports = pageController
